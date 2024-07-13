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

    async getMissingData(startProcessDto: StartProcessDto) {
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

        // Initialisieren der Liste für fehlende Felder
        const notDefined: fields[] = [];



        //get the all Roles in Process
        const processRoles = await this.processRolesRepository.find({where:{processID:this.processID}});
        let userRole = null;
        //check for each process-role if user has it
        for(const processRole of processRoles){
            const isUserRole= await this.userProcessRolesRepository.exists({where:{userID: this.userID, process_role_id: processRole.id}});
            if(isUserRole){
                userRole = this.userProcessRolesRepository.findOne({where:{userID: this.userID, process_role_id: processRole.id}});
            }
        }
        if(userRole == null){
            throw new Error("User is not part of the process");
        }


        const stepsRoles = await this.stepRolesRepository.find({where:{process_role_id: userRole.process_role_id}});
       //finde alle felder die zur userRolle gehören
        const steps :step[]= []
        for(const stepRole of stepsRoles){
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

            for (const step of steps) {
                // Load document and form
                const document = await PDFDocument.load(step.data);
                const form = document.getForm();

                // Retrieve fields for the current step
                const fields = await this.stepFieldRepo.find({ where: { stepID: step.id } });

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
                await this.userProStepRepo.save(userProStep);
            }
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


}
