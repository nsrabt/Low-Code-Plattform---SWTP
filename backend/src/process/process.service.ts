import {Injectable} from '@nestjs/common';
import {StartProcessDto} from "./dto/StartProcessDto";
import {InjectRepository} from "@nestjs/typeorm";
import {workflow} from "../database/workflow/Workflow";
import {Repository} from "typeorm";
import {workflowElement} from "../database/workflow/WorkflowElement";
import {PDFDocument} from 'pdf-lib';
import {user_fillingdata} from "../database/user & execution/user-fillingdata";
import {fields} from "../database/workflow/fields";
import {user_process_element} from "../database/user & execution/user_process_element";
import {filling_data} from "../database/user & execution/filling_data";
import {user_process} from "../database/user & execution/user_process";
import {workflowElement_roles} from "../database/workflow/WorkflowElement_roles";
import {workflow_roles} from "../database/workflow/Workflow_roles";
import {user_process_roles} from "../database/user & execution/user_process_roles";
import {filledDataDto} from "./dto/putFilledDataDto";
import {SendProcessRoleDto} from "./dto/SendProcessRoleDto";
import {field_roles} from "../database/workflow/field_roles";
import {roles} from "../database/workflow/roles";
import {process} from "../database/user & execution/process"
import {process_element} from "../database/user & execution/process_element";


@Injectable()
export class ProcessService {

    constructor(
            @InjectRepository(workflow)
            private workflowRepository: Repository<workflow>,
            @InjectRepository(workflowElement)
            private workflowElementRepository: Repository<workflowElement>,
            @InjectRepository(workflowElement_roles)
            private workflowElementRolesRepository: Repository<workflowElement_roles>,
            @InjectRepository(workflow_roles)
            private workflowRolesRepository: Repository<workflow_roles>,
            @InjectRepository(user_process_roles)
            private userProcessRolesRepository: Repository<user_process_roles>,
            @InjectRepository(field_roles)
            private fieldRolesRepository: Repository<field_roles>,
            @InjectRepository(user_fillingdata)
            private userFillingRepo: Repository<user_fillingdata>,
            @InjectRepository(fields)
            private stepFieldRepo: Repository<fields>,
            @InjectRepository(user_process_element)
            private userProElemRepo: Repository<user_process_element>,
            @InjectRepository(filling_data)
            private fillingRepo: Repository<filling_data>,
            @InjectRepository(user_process)
            private userProRepo: Repository<user_process>,
            @InjectRepository(roles)
            private roleRepo: Repository<roles>,
            @InjectRepository(process)
            private processRepo: Repository<process>,
            @InjectRepository(process_element)
            private proElemRepo: Repository<process_element>

) {}


    userID:number;
    workflowID:number
    workflowElements: workflowElement[];
    workflowElementRoles: workflowElement_roles[];
    userRole: user_process_roles;
    processRoles: workflow_roles[];
    curStep:number;
    curProcess:process;


    async continueProcess(){

    }


    async startProcess(startProcessDto: StartProcessDto) {

        this.workflowID = startProcessDto.workflowID;
        this.userID = startProcessDto.userID;
        this.curStep=1;

        // Abrufen des aktuellen Workflows
        const currentWorkflow = await this.workflowRepository.findOne({ where: { id: this.workflowID } });

        if (!currentWorkflow) {
            throw new Error("Workflow not found");
        }



        //Speichern des Prozesses
        const newProcess = new process();
        newProcess.curStep=1;
        newProcess.workflowID = this.workflowID;
        this.curProcess = await this.processRepo.save(newProcess);

        const workflowElements = await this.workflowElementRepository.find({where:{workflowID:this.workflowID}});


        //create all processElements
        for(const workflowelem of workflowElements){
            const proElem = new process_element();
            proElem.data = workflowelem.data;
            proElem.workflowElementID = workflowelem.id;
            proElem.phase=1;
            await this.proElemRepo.save(proElem);
        }


        // Erstellen eines neuen Benutzerprozesses
        const userPro = new user_process();
        userPro.processID = this.workflowID;
        userPro.state = 'missing data';
        userPro.userID = this.userID;
        await this.userProRepo.save(userPro);


        for(const workflowelem of workflowElements) {
            const userProElem = new user_process_element();
            userProElem.workflow_element_id = userPro.id;
            userProElem.done=false;
            userProElem.workflow_element_id = workflowelem.id;
        }


            //Save Applicant in his role
        const applicantRole =await this.workflowRolesRepository.findOne({where:{isApplicant:true}});
        this.userRole.workflowRoleID = applicantRole.id;
        this.userRole.userID = this.userID;
        await this.userProcessRolesRepository.save(this.userRole);



        //return all selectable Roles in Process
        return await this.workflowRolesRepository.find({where: {processID: this.workflowID, selectable: true}});
    }








    /*
        All Filling Data of the first phase will be collected. even if other users have to fill out a form before you do
     */
    async getMissingData(startProcessDto: StartProcessDto) {

        // Initialisieren der Liste für fehlende Felder
        const notDefined: fields[] = [];

        this.workflowElementRoles = await this.workflowElementRolesRepository.find({where:{workflowRoleID: this.userRole.workflowRoleID}});

        //finde alle felder die zur userRolle gehören
        const steps :workflowElement[]= []
        for(const workflowElementRole of this.workflowElementRoles){
            steps.push(await this.workflowElementRepository.findOne({where: {id : workflowElementRole.workflowElementID, stepNumber : this.curStep}}));
        }
        this.workflowElements=steps;


        // Durchlaufen der Schritte und Felder
        for (const step of steps) {

            const curFields = await this.stepFieldRepo.find({ where: { workflowElementID: step.id }});

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
            const toFill:user_process_element[] = [];


            // Welche Rolle hat user in dem prozess
            const workflowElementRole = await this.workflowElementRolesRepository.find({where:{workflowRoleID: this.userRole.workflowRoleID}});
            for(const role of workflowElementRole){
                const workflowElement = await this.proElemRepo.findOne({where:{workflowElementID:role.workflowElementID}});
                if(role.position == workflowElement.phase){
                    toFill.push(await this.userProElemRepo.findOne({where:{workflow_element_id: workflowElement.id}}));
                }
            }

            //get all steps wo User an der Reihe ist



            let workflowElements = this.workflowElements;
            workflowElements = workflowElements.sort((a, b) => a.stepNumber - b.stepNumber);
            let userProSteps: user_process_element[];



            for (const workflowElement of workflowElements) {
                // Load document and form
                const document = await PDFDocument.load(workflowElement.data);
                const form = document.getForm();
                //get fields for the user:

                const userFields = await this.fieldRolesRepository.find({where:{process_role_id:this.userRole.workflowRoleID}});

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


                //check if workflowElement has another 'phase'

                //increment phase and save data changes
                const processElem = await this.proElemRepo.findOne({where:{workflowElementID: workflowElement.id, processID: this.curProcess.id }})
                processElem.data = await document.saveAsBase64();
                processElem.phase +=1;

                await this.proElemRepo.save(processElem);
                /*
                 are there other persons who need to fill out something?

                     - send notification
                     - state => waiting

                     no: done = true
                 */
                const workflowRole = await this.workflowElementRolesRepository.findOne({where:{workflowElementID:workflowElement.id,position: processElem.phase}});
                const processRole = await this.userProcessRolesRepository.findOne({where:{processID: this.curProcess.id,workflowRoleID:workflowRole.workflowRoleID}});
                if(processRole){
                    //there is another step

                }


            }






            /*
            who's turn is it?
                - send notification
                - set state => todo
             */

            /*
            is over?
                - set state => done
                - send notification to all Roles
             */



            //return an array of all user_process_steps(including PDFS). will be used to display the pdf check
            return userProSteps;

        } catch (error) {
            console.error(`Error processing steps: ${error.message}`);
        }
    }


    async changeState(userProID: number, state: string){
        const userProcess = await this.userProRepo.findOne({where:{id:userProID}})
        userProcess.state = state;
        return await this.userProRepo.update(userProID,userProcess);
    }

    async saveMissingData(filledDataDto: filledDataDto) {
        const fillingData = new user_fillingdata();
        fillingData.pi_id = filledDataDto.dataID;
        fillingData.value = filledDataDto.value;
        fillingData.userID = filledDataDto.userID;

        return await this.userFillingRepo.save(fillingData)
    }


    async nextStep(){

    }




    async saveProcessRole(sendProcessRoleDto: SendProcessRoleDto) {
        if(await this.userProcessRolesRepository.exists({where:{workflowRoleID: sendProcessRoleDto.processRoleID}})){
            console.error("A User for the given processRole already exists");
            return null;
        }
        const processRole = new user_process_roles();
        processRole.workflowRoleID= sendProcessRoleDto.processRoleID;
        processRole.userID = sendProcessRoleDto.userID;
        return await this.userProcessRolesRepository.save(processRole);
    }

    async getAllCurByUser(id:number) {
        return await this.userProRepo.find({where:{userID:id, state:'todo'}});
    }

    async getAllDoneByUser(userID: number) {
        return await this.userProRepo.find({where:{userID:userID,state: 'done'}});
    }

    async getAllPublic(){
        return await this.workflowRepository.find();
    }

    async getUserProcessRole(userProcessID: number) {
        return await this.workflowRolesRepository.findOne({where:{id:userProcessID}});
    }

    async getRole(process_role_id: number) {
        const proRole= await this.workflowRolesRepository.findOne({where:{id:process_role_id}});
        return await this.roleRepo.findOne({where: {id: proRole.roleID}});
    }


}
