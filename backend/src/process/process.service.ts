import {Injectable} from '@nestjs/common';
import {StartProcessDto} from "./dto/StartProcessDto";
import {InjectRepository} from "@nestjs/typeorm";
import {  Not } from 'typeorm';

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
import {user_notifications} from "../database/user & execution/user_notificatíons";
import {NotificationService} from "../notification/notification.service"
import {users} from "../database/user & execution/users";
import {join} from "path";
import {not} from "rxjs/internal/util/not";
import {FillingDataController} from "../filling_data/filling_data.controller"
import {FillingDataService} from "../filling_data/filling_data.service";
import {ContinueProcessDto} from "./dto/ContinueProcessDto";
import {constraintToString} from "class-validator/types/validation/ValidationUtils";

@Injectable()
export class ProcessService {

    constructor(

            private readonly fillingDataService: FillingDataService,
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
            private proElemRepo: Repository<process_element>,
            @InjectRepository(users)
            private userRepo: Repository<users>,

            private notificationService: NotificationService
) {}


    private userID:number;
    private workflowID:number
    private workflowElements: workflowElement[] = [];
    private workflowElementRoles: workflowElement_roles[] = [];
    private userRole: user_process_roles = new user_process_roles();
    private curStep:number;
    private curProcess:process;
    private notificationList: user_notifications[] = [];
    private todoList: user_process[] = [];
    private doneList: user_process[] = [];
    private waitList: user_process[] = [];


    //This method will be called, if someone runs, but not creates a process
    async continueProcess(continueProcessDto: ContinueProcessDto){


    }

    //This method will be called when the process runs for the first time
    async startProcess(startProcessDto: StartProcessDto) {
        console.log("startProcess")
        this.workflowID = startProcessDto.workflowID;
        this.userID = startProcessDto.userID;
        this.curStep=1;
        // Abrufen des aktuellen Workflows
        const currentWorkflow = await this.workflowRepository.findOne({ where: { id: this.workflowID } });

        if (!currentWorkflow) {
            throw new Error("Workflow not found");
        }
            if(!currentWorkflow.isOpen){
                const newProcess = new process();
                newProcess.curStep=1;
                newProcess.workflowID = this.workflowID;
                newProcess.isAccepted=false
                this.curProcess = await this.processRepo.save(newProcess);
                return;
            }
            else{
                //Speichern des Prozesses
                const newProcess = new process();
                newProcess.curStep=1;
                newProcess.workflowID = this.workflowID;
                newProcess.isAccepted=true;
                newProcess.workflowVersion =currentWorkflow.version;
                this.curProcess = await this.processRepo.save(newProcess);
            }



        const workflowElements = await this.createWorkflowElements(this.workflowID);

        const userProcess = await this.createUserProcess(currentWorkflow, this.userID, workflowElements)





        //Save Applicant in his role
        const applicantRole =await this.workflowRolesRepository.findOne({where:{processID:this.workflowID,isApplicant:true}});
        const userRole = new user_process_roles();
        userRole.workflowRoleID = applicantRole.id;
        userRole.userID = startProcessDto.userID;
        userRole.processID = this.curProcess.id;
        console.log("saving userProcessRole  " + userRole.processID)
        await this.userProcessRolesRepository.save(userRole);
        this.userRole = userRole;





        //return all selectable Roles in Process
        return await this.workflowRolesRepository.find({where: {processID: this.workflowID, selectable: true}});
    }

async createWorkflowElements(workflowID: number){
    const workflowElements = await this.workflowElementRepository.find({where:{workflowID:workflowID}});

    //create all processElements
    for(const workflowelem of workflowElements){
        const proElem = new process_element();
        proElem.data = workflowelem.data;
        proElem.workflowElementID = workflowelem.id;
        proElem.phase=1;
        proElem.processID = this.curProcess.id;
        await this.proElemRepo.save(proElem);
    }
    return workflowElements;
}

async createUserProcess(currentWorkflow: workflow, userID: number, workflowElements: workflowElement[]){
    // Erstellen eines neuen Benutzerprozesses + BenutzerProzessElemente
    const userPro = new user_process();
    userPro.processID = this.curProcess.id;
    if(!currentWorkflow.isOpen) userPro.state = 'waiting';
    else userPro.state= ''
    userPro.userID = userID;
    const userProcessSaved = await this.userProRepo.save(userPro);
    this.curStep =1;
    for(const workflowelem of workflowElements) {
        const userProElem = new user_process_element();
        userProElem.workflow_element_id = userPro.id;
        userProElem.done=false;
        userProElem.workflow_element_id = workflowelem.id;
        userProElem.processID = userProcessSaved.processID;
        userProElem.userID = userID;
        await this.userProElemRepo.save(userProElem);
    }
    return userPro;

}





    /*
        All Filling Data of the first phase will be collected. even if other users have to fill out a form before you do
     */
    async getMissingData() {
        console.log("getmissingdata   "+ this.userRole.workflowRoleID)
        // Initialisieren der Liste für fehlende Felder
        const notDefined: fields[] = [];
        this.workflowElementRoles = await this.workflowElementRolesRepository.find({where:{workflowRoleID: this.userRole.workflowRoleID}});

        //finde alle felder die zur userRolle gehören
        const steps: workflowElement[] = [];
        const stepIds = new Set<number>(); // Set to track added step IDs
        console.log("sssss" + this.curStep + " " + this.workflowElementRoles.length);

        for (const workflowElementRole of this.workflowElementRoles) {
            console.log("workflowElementID: "+workflowElementRole.workflowElementID)
            const step = await this.workflowElementRepository.findOne({ where: { id: workflowElementRole.workflowElementID, stepNumber: this.curStep } });
            if (step && !stepIds.has(step.id)) {
                steps.push(step);
                stepIds.add(step.id);

            }
        }
        this.workflowElements=steps;

        console.log("length: "+steps.length)

        // Durchlaufen der Schritte und Felder
        for (const step of steps) {
            const curFields = await this.stepFieldRepo.find({ where: { workflowElementID: this.workflowElementRepository.getId(step) }});
            console.log("getFields of "+this.workflowElementRepository.getId(step))
            for (const field of curFields) {
                console.log("newField")
                const userField = await this.userFillingRepo.findOne({ where: { pi_id: field.dataID, userID: this.userID } });
                console.log(field.dataID)
                if (!userField) {
                    notDefined.push(field);
                }
            }
        }

        const notDefinedData: filling_data[] = [];
        for(const field of notDefined){
            console.log("a")
            const fillingdata = await this.fillingDataService.getDataById(field.dataID);
            console.log(fillingdata.name)
            notDefinedData.push(fillingdata);
        }
        // Rückgabe der Liste der fehlenden Felder
        return notDefinedData;

    }



    async walkThroughSteps(startProcessDto: StartProcessDto) {

      //  try {

            const toFill:user_process_element[] = [];


            // Welche Rolle hat user in dem prozess
            console.log("workflowRoleID "+this.userRole.workflowRoleID)
            console.log("workflowID: "+this.workflowID)
            const workflowElementRole = await this.workflowElementRolesRepository.find({where:{workflowRoleID: startProcessDto.workflowID}});
            let isOver:boolean = true;

            for(const role of workflowElementRole){
                const workflowElement = await this.proElemRepo.findOne({where:{workflowElementID:role.workflowElementID}});

                if(role.position == workflowElement.phase){
                    const userPro = await this.userProElemRepo.findOne({where:{workflow_element_id: workflowElement.id}});
                    if(userPro.userID !== startProcessDto.userID){
                        throw new Error("current user is not ready yet");
                    }
                }

            }

            //get all steps wo User an der Reihe ist



            let workflowElements = this.workflowElements;
            workflowElements = workflowElements.sort((a, b) => a.stepNumber - b.stepNumber);
            let processElements: process_element[] = [];



            for (const workflowElement of workflowElements) {
                // Load document and form
                const document = await PDFDocument.load(workflowElement.data,{ ignoreEncryption: true });
                const form = document.getForm();
                //get fields for the user:
                console.log("workflowElement "+workflowElement.title)
                console.log(this.userRole.workflowRoleID)
                const fields = await this.stepFieldRepo.find({where:{processRoleID:this.userRole.workflowRoleID}});
                console.log("fieldsLength "+fields.length)


                for (const field of fields) {

                    // Retrieve field data and user-filled data
                    const fData = await this.fillingRepo.findOne({ where: { id: field.dataID } });
                    const ufData = await this.userFillingRepo.findOne({ where: { pi_id: field.dataID, userID: startProcessDto.userID } });
                    console.log(fData.datatype)
                    if (ufData) {
                        if (fData.datatype === 'string') {
                            console.log("schreibe rein allda")
                            const curTextField = form.getTextField(field.fieldName);
                            form.getTextField(field.fieldName).setText(ufData.value);

                        } else if (fData.datatype === 'boolean') {
                            const curCheckbox = form.getCheckBox(field.fieldName);
                            if (ufData.value === 'true') curCheckbox.check();
                        }else if(fData.datatype=='photo'){
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
                        }else if(fData.datatype === 'date'){
                            const curTextField = form.getTextField(field.fieldName);
                            form.getTextField(field.fieldName).setText(ufData.value.toString());

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
                processElements.push(processElem);

                //workflow Role of current phase
                const workflowRole = await this.workflowElementRolesRepository.findOne({where:{workflowElementID:workflowElement.id,position: processElem.phase}});
                console.log(workflowRole.workflowRoleID +" is on pos "+workflowRole.position)
                console.log("curProcess: "+this.curProcess.id + "    "+workflowRole.workflowRoleID + "   " + startProcessDto.userID)
                //user_process_role of current phase
                const processRole = await this.userProcessRolesRepository.findOne({where:{processID: this.curProcess.id,workflowRoleID:workflowRole.workflowRoleID}});
                //The user object of the person who's turn is now
                const newPerson = await this.userRepo.findOne({where:{id: processRole.userID}});
                //user Process of new person: needed to change state to: todo

                console.log("processID: "+ processRole.processID + "    userID:  "+ newPerson.id)
                const userProcess = await this.userProRepo.findOne({where:{processID: processRole.processID, userID: newPerson.id}});

                //some data for notification
                const workflow = await this.workflowRepository.findOne({where:{id:startProcessDto.workflowID}})
                const applicant = await this.workflowRolesRepository.findOne({where:{isApplicant:true, processID:workflow.id}});
                console.log("applicant" + applicant.id)

                const applicantuserpro = await this.userProcessRolesRepository.findOne({where:{processID: processElem.processID, workflowRoleID: applicant.id}})
                console.log("applicantUser" + applicantuserpro.userID)

                const applicantUser = await this.userRepo.findOne({where:{id: applicantuserpro.userID}});
                console.log("applicantUser" + applicantUser)

                //if there's another role who has to fill out stuff in the current workflow element
                if(processRole){
                    isOver=false;
                    //there is another phase
                    if(userProcess){
                        this.todoList.push(userProcess);
                    }
                    //todo: select correct link
                    await this.pushNotification(newPerson.id, "Sie sind nun an der Reihe, den Prozess "+workflow.title+" von "+applicantUser.username+" zu bearbeiten!", '')
                }


            }




            /*
               is over?
                   - set state => done
                   - send notification to all Roles
            */

            if(isOver){
                const processID =this.curProcess.id;
                const users =await this.userProRepo.find({where:{processID:processID}});
                for(const user of users){
                    if(user){
                        this.doneList.push(user);

                    }
                }

            }

            await this.endFilling();

            //return an array of all user_process_steps(including PDFS). will be used to display the pdf check
            return processElements;

  //      } catch (error) {
    //        throw new Error(error);
            //  }
    }



    async endFilling(){
        console.log("endfilling")
        //walk through todolist
        for(const todo of this.todoList){
            console.log("todo id alla " + this.userProRepo.getId(todo))
            const todoID = this.userProRepo.getId(todo);
            await this.changeState(todoID,'todo');
        }

        for(const done of this.doneList){
            await this.changeState(done.id, 'done');
        }

        for(const wait of this.waitList){
            await this.changeState(wait.id, 'wait');
        }
    }

    async changeState(userProID: number, state: string){
        const userProcess = await this.userProRepo.findOne({where:{id:userProID}})
        userProcess.state = state;
        console.log(userProID)
        const result = await this.userProRepo.update(userProID,userProcess);
        console.log("saving state went "+result)
        return result;
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

        try {
            await this.userProcessRolesRepository.exists({where: {workflowRoleID: sendProcessRoleDto.workflowRoleID, processID: this.curProcess.id}});
        }catch(err){
            throw new Error("Process-role has already a user assigned\n"+err);
        }

        console.log("HAlloo ich bin in save alla")
        const processRole = new user_process_roles();
        processRole.userID = sendProcessRoleDto.userID;
        processRole.processID = this.curProcess.id;
        processRole.workflowRoleID = sendProcessRoleDto.workflowRoleID;




        const user = await this.userRepo.findOne({where:{id:this.userID}});
        const workflow = await this.workflowRepository.findOne({where:{id:this.workflowID}});
        const workflowRole = await this.workflowRolesRepository.findOne({where:{id:  sendProcessRoleDto.workflowRoleID}});

        //todo select correct link
        await this.pushNotification(processRole.userID,user.username + "selected you in "+workflow.title+" as "+ workflowRole.workflowRoleName, '')

        //push notification to NotificationList. will be sent out at the end of the process

        return await this.userProcessRolesRepository.save(processRole);
    }


    async pushNotification(userID:number, message:string, link:string){
        const joinNotification = new user_notifications();
        joinNotification.userID= userID
        joinNotification.message= message
        // todo: joinNotification.link = link to start Process

        const notificationExists = this.notificationList.some(
            notification => notification.userID === joinNotification.userID && notification.message === joinNotification.message
        );
        //Wenn noch keine notification bekommen, wird gepushed
        if (!notificationExists) {
            this.notificationList.push(joinNotification);
        }

    }

    async getAllCurByUser(id:number) {
        return await this.userProRepo.find({where:{userID:id, state:'todo'}});
    }

    async getAllDoneByUser(userID: number) {
        return await this.userProRepo.find({where:{userID:userID,state: 'done'}});
    }

    async getAllPublic(roleID: number){
        console.log("test");
        try {
            const allPublic = await this.workflowRepository.find();
            const rtnWorkflows: workflow[] = [];
            for(const workflow of allPublic){
                const applicant = await this.workflowRolesRepository.findOne({where:{isApplicant:true, processID: workflow.id}})
                if(applicant){
                    if(applicant.roleID === roleID){
                        rtnWorkflows.push(workflow);
                    }
                }

            }
            if (allPublic.length > 0) {
                console.log(allPublic[0].title);
            } else {
                console.log('Array "allPublic" is empty.');
            }
            return rtnWorkflows;
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // oder anderen angemessenen Rückgabewert für Fehlerbehandlung
        }
    }

    async getUserProcessRole(userProcessID: number) {
        return await this.workflowRolesRepository.findOne({where:{id:userProcessID}});
    }

    async getRole(process_role_id: number) {
        const proRole= await this.workflowRolesRepository.findOne({where:{id:process_role_id}});
        return await this.roleRepo.findOne({where: {id: proRole.roleID}});
    }


    async getAllWaiting(userID: number) {
        const userPros = await this.userProRepo.find({where:{state: 'waiting'}});
        const workflowList: workflow[] = [];
        for(const userPro of userPros){
            const process = await this.processRepo.findOne({where:{id: userPro.processID}});
            const workflow = await this.workflowRepository.findOne({where:{id: process.workflowID}});
            workflowList.push(workflow);
        }
        return workflowList;
    }

    async deleteProcess(process_id: number){
        try {
            await this.processRepo.delete({id: process_id});
            await this.proElemRepo.delete({processID: process_id});
            return true;
        }
        catch(err){
            throw new Error("failed to delete Process\n"+err)
        }

    }



    async getAllTodo(userID: number) {
        const userPros = await this.userProRepo.find({where:{state: 'todo'}});
        const workflowList: workflow[] = [];
        for(const userPro of userPros){
            const process = await this.processRepo.findOne({where:{id: userPro.processID}});
            const workflow = await this.workflowRepository.findOne({where:{id: process.workflowID}});
            workflowList.push(workflow);
        }
        return workflowList;
    }

    async getAllElements(processID: number) {
        return this.proElemRepo.find({where:{processID:processID}})
    }

    async acceptProcess(processID: number) {

        const process = await this.processRepo.findOne({where:{id:processID}});
        process.isAccepted=true;
        await this.processRepo.update(processID,process);
        const userPros = await this.userProRepo.find({where:{processID:processID}});
        for (const userPro of userPros) {
            userPro.state='todo';
            await this.userProRepo.update(userPro.id,userPro);
        }


    }
}
