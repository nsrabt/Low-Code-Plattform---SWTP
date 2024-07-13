import { Injectable } from '@nestjs/common';
import {StartProcessDto} from "./dto/StartProcessDto";
import {InjectRepository} from "@nestjs/typeorm";
import {process} from "../database/workflow/process";
import {Repository} from "typeorm";
import {step} from "../database/workflow/step";
import {PDFDocument} from 'pdf-lib';
import {user_fillingdata} from "../database/user & execution/user-fillingdata";
import {fields} from "../database/workflow/fields";
import {user_step} from "../database/user & execution/user_step";
import {filling_data} from "../database/user & execution/filling_data";
import {async} from "rxjs";
import {user_process} from "../database/user & execution/user_process";
import {step_roles} from "../database/workflow/step-roles";
import {process_roles} from "../database/workflow/process_roles";
import {user_process_roles} from "../database/user & execution/user_process_roles";
import {filledDataDto} from "./dto/putFilledDataDto";
import {SendProcessRoleDto} from "./dto/SendProcessRoleDto";
import {field_roles} from "../database/workflow/field_roles";


@Injectable()
export class ProcessService {

    constructor(
            @InjectRepository(process)
            private processRepository: Repository<process>,
            @InjectRepository(step)
            private stepRepository: Repository<step>,
            @InjectRepository(step_roles)
            private stepRolesRepository: Repository<step_roles>,
            @InjectRepository(process_roles)
            private processRolesRepository: Repository<process_roles>,
            @InjectRepository(user_process_roles)
            private userProcessRolesRepository: Repository<user_process_roles>,
            @InjectRepository(field_roles)
            private fieldRolesRepository: Repository<field_roles>,
            @InjectRepository(user_fillingdata)
            private userFillingRepo: Repository<user_fillingdata>,
            @InjectRepository(fields)
            private stepFieldRepo: Repository<fields>,
            @InjectRepository(user_step)
            private userProStepRepo: Repository<user_step>,
            @InjectRepository(filling_data)
            private fillingRepo: Repository<filling_data>,
            @InjectRepository(user_process)
            private userProRepo: Repository<user_process>
    ) {}


    userID:number;
    processID:number
    steps: step[];
    stepRoles: step_roles[];
    userRole: user_process_roles;

    async getMissingData(startProcessDto: StartProcessDto) {

        // Initialisieren der Liste für fehlende Felder
        const notDefined: fields[] = [];




        this.stepRoles = await this.stepRolesRepository.find({where:{process_role_id: this.userRole.process_role_id}});
       //finde alle felder die zur userRolle gehören
        const steps :step[]= []
        for(const stepRole of this.stepRoles){
            steps.push(await this.stepRepository.findOne({where: {id: stepRole.step_id}}));
        }
        this.steps=steps;


        // Durchlaufen der Schritte und Felder
        for (const step of steps) {
            const curFields = await this.stepFieldRepo.find({ where: { stepID: step.id } });
            for (const field of curFields) {
                const userField = await this.userFillingRepo.findOne({ where: { pi_id: field.dataID, userID: this.userID } });
                if (!userField) {
                    notDefined.push(field);
                }
            }
        }

        // Rückgabe der Liste der fehlenden Felder
        return notDefined;
    }



    async walkThroughSteps(processID: number, userID: number, up_id: number) {
        try {
            // Retrieve and sort steps
            let steps = this.steps;
            steps = steps.sort((a, b) => a.stepNumber - b.stepNumber);
            let userProSteps: user_step[];
            for (const step of steps) {
                // Load document and form
                const document = await PDFDocument.load(step.data);
                const form = document.getForm();
                //get fields for the user:

                const userFields = await this.fieldRolesRepository.find({where:{process_role_id:this.userRole.process_role_id}});

                let fields:fields[];
                for(const userField of userFields){
                    fields.push(await this.stepFieldRepo.findOne({where:{id:userField.fieldID}}));
                }

                for (const field of fields) {
                    // Retrieve field data and user-filled data
                    const fData = await this.fillingRepo.findOne({ where: { id: field.dataID } });
                    const ufData = await this.userFillingRepo.findOne({ where: { pi_id: field.dataID, userID: userID } });

                    if (ufData) {
                        if (fData.datatype === 'text') {
                            const curTextField = form.getTextField(fData.name);
                            curTextField.setText(ufData.value);
                        } else if (fData.datatype === 'check') {
                            const curCheckbox = form.getCheckBox(fData.name);
                            if (ufData.value === 'true') curCheckbox.check();
                        }else if(fData.datatype=='picture'){
                            const nums = ufData.value.split(',').map(Number);
                            //wir verwenden value als string welches ein array enthält
                            const pic = await document.embedPng(ufData.value);
                            const width =nums[0];
                            const height=nums[1];
                            const xPos =nums[2];
                            const yPos=nums[3];
                            const pageNumber =nums[4];
                            pic.scaleToFit(width,height); //width and height in database
                            const page = document.getPage(pageNumber);
                            page.drawImage(pic,{
                                x: xPos,
                                y: yPos,
                                width: width,
                                height: height
                            });
                        }
                        console.log(ufData.value);
                    } else {
                        console.log(`No user data found for field ${fData.name}`);
                    }
                }

                // Save the modified document
                const userProStep = new user_step();
                userProStep.data = await document.saveAsBase64();
                userProStep.stepID = step.id;
                userProStep.done = true;
                userProStep.up_id = up_id;

                // Save user process step
                userProSteps.push(await this.userProStepRepo.save(userProStep));
            }
            //return an array of all steps. will be used to display the pdf check
            return userProSteps;

        } catch (error) {
            console.error(`Error processing steps: ${error.message}`);
        }
    }

    async saveMissingData(filledDataDto: filledDataDto) {
        const fillingData = new user_fillingdata();
        fillingData.pi_id = filledDataDto.dataID;
        fillingData.value = filledDataDto.value;
        fillingData.userID = filledDataDto.userID;

        return await this.userFillingRepo.save(fillingData)
    }


    async startProcess(startProcessDto: StartProcessDto) {
        this.processID = startProcessDto.processID;
        this.userID = startProcessDto.userID;

        // Abrufen des aktuellen Workflows
        const currentWorkflow = await this.processRepository.findOne({ where: { id: this.processID } });

        if (!currentWorkflow) {
            throw new Error("Workflow not found");
        }

        // Überprüfen, ob der Workflow offen ist
        if (!currentWorkflow.isOpen) {
            throw new Error("The Workflow is not open. You'll have to apply for it.");
        }


        // Erstellen eines neuen Benutzerprozesses
        const userPro = new user_process();
        userPro.processID = this.processID;
        userPro.state = 'missing data';
        userPro.userID = this.userID;
        userPro.done = false;
        await this.userProRepo.save(userPro);

        //get the all Roles in Process
        const processRoles = await this.processRolesRepository.find({where:{processID:this.processID}});
        //check for each process-role if user has it
        for(const processRole of processRoles){
            const isUserRole= await this.userProcessRolesRepository.exists({where:{userID: this.userID, process_role_id: processRole.id}});
            if(isUserRole){
                this.userRole = await this.userProcessRolesRepository.findOne({
                    where: {
                        userID: this.userID,
                        process_role_id: processRole.id
                    }
                });
            }
        }
        if(this.userRole == null){
            throw new Error("User is not part of the process");
        }


        this.stepRoles = await this.stepRolesRepository.find({where:{process_role_id: this.userRole.process_role_id}});
        return this.stepRoles;

    }

    async saveProcessRole(sendProcessRoleDto: SendProcessRoleDto) {
        if(await this.userProcessRolesRepository.exists({where:{process_role_id: sendProcessRoleDto.processRoleID}})){
            console.error("A User for the given processRole already exists");
            return null;
        }
        const processRole = new user_process_roles();
        processRole.process_role_id= sendProcessRoleDto.processRoleID;
        processRole.userID = sendProcessRoleDto.userID;
        return await this.userProcessRolesRepository.save(processRole);
    }

    async getAllCurByUser(id:number) {
        return await this.userProRepo.find({where:{userID:id, done:false}});
    }

    async getAllDoneByUser(userID: number) {
        return await this.userProRepo.find({where:{userID:userID,done:true}});
    }
}
