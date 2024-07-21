import {Injectable, NotFoundException} from '@nestjs/common';
import {workflow} from "../database/workflow/Workflow";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {workflowElement} from "../database/workflow/WorkflowElement";
import {workflowElement_roles} from "../database/workflow/WorkflowElement_roles";
import {workflow_roles} from "../database/workflow/Workflow_roles";
import {AddProcessRoleDto} from "./dto/addProcessRoleDto";
import {roles} from "../database/workflow/roles";
import {UpdateWorkflowDto} from "./dto/update-workflow-dto";
import {UpdateStepDto} from "./dto/update-step-dto";
import {UpdateProcessRoleDto} from "./dto/update-process-role-dto";
import {ChangeOrderDto} from "./dto/change-order-dto";
import {AssignRoleDto} from './dto/assign-role-dto'


@Injectable()
export class WorkflowService {



    constructor(
        @InjectRepository(workflow)
        private processRepository: Repository<workflow>,
        @InjectRepository(workflowElement)
        private stepRepository: Repository<workflowElement>,
        @InjectRepository(workflowElement_roles)
        private stepRolesRepository: Repository<workflowElement_roles>,
        @InjectRepository(roles)
        private roleRepo: Repository<roles>,
        @InjectRepository(workflow_roles)
        private processRoleRepo: Repository<workflow_roles>,

    ) {}

    async createWorkflow(title: string, description: string, platform_id: number, isOpen: boolean): Promise<workflow> {
        const newWorkflow = new workflow();
        newWorkflow.title = title;
        newWorkflow.description = description;
        newWorkflow.platform_id = platform_id;
        newWorkflow.isOpen = isOpen;
        return await this.processRepository.save(newWorkflow);
    }

    async getAllWorkflows():Promise<workflow[]> {
        return await this.processRepository.find();
    }
    async getAllOpenWorkflows(){
        return await this.processRepository.find({where:{isOpen:true}});
    }
    async getAllClosedWorkflows(){
        return await this.processRepository.find({where:{isOpen:false}});
    }

    async deleteWorkflow(id: number){

        const stepDeleteResult = await this.stepRepository.delete({workflowID: id});
        const processRolesDeleteResult = await this.processRoleRepo.delete({processID: id})
        const processDeleteResult =await this.processRepository.delete(id);


    }

    async getWorkflowById(id: number){
        const searchedWorkflow = await this.processRepository.findOne({where: {id: id}});
        if(searchedWorkflow == null) {
            throw new NotFoundException();
        }
        return searchedWorkflow;
    }

    async updateWorkflow(updateWorkflowDto: UpdateWorkflowDto){
        const updatedProcess = await this.processRepository.findOne({where:{id: updateWorkflowDto.processID}});
            updatedProcess.isOpen= updateWorkflowDto.isOpen;
            updatedProcess.id= updateWorkflowDto.processID;
            updatedProcess.description= updateWorkflowDto.description;
            updatedProcess.title= updateWorkflowDto.title;

        return await this.processRepository.update(updateWorkflowDto.processID, updatedProcess);
    }


    async getStepsByProcessId(process_id: number) {
        return await this.stepRepository.find({ where: { workflowID: process_id } });
    }

    async addStep(process_id: number, title: string, document: string, step_number: number) {
        console.log(process_id +" "+title+" "+document+ " "+step_number)
        const newStep = new workflowElement();
        newStep.workflowID = process_id;
        newStep.title = title;
        newStep.data = document;
        newStep.stepNumber = step_number;

        return await this.stepRepository.save(newStep);
    }

    async addRole(addProcessRoleDto: AddProcessRoleDto){
        const role = new workflow_roles();
        // if role exists
        if(await this.roleRepo.find({where:{id: addProcessRoleDto.roleID}})){
            role.roleID = addProcessRoleDto.roleID;
        }
        else{
            throw new Error("Role with ID:"+addProcessRoleDto.roleID+" doesnt exist")
        }
        //if workflow exists
        if(await this.processRepository.find({where:{id: addProcessRoleDto.roleID}})){
            role.processID = addProcessRoleDto.workflowID;
        }
        else{
            throw new Error("Process with ID: " + addProcessRoleDto.roleID + " doesnt exist!")
        }
        role.selectable = addProcessRoleDto.selectable;
        role.workflowRoleName = addProcessRoleDto.process_role_name;
        role.isApplicant= addProcessRoleDto.isApplicant;
        console.log(role.selectable)
        return await this.processRoleRepo.save(role);
    }

    async deleteStep(id: number){
        await this.stepRolesRepository.delete({workflowElementID: id})
        return await this.stepRepository.delete({ id: id});
    }

    async getStepById(id: number){
        const searchedStep = await this.stepRepository.findOne({where: {id: id}});
        if(searchedStep == null) {
            throw new NotFoundException();
        }
        return searchedStep;
    }

    async updateStep(updateStepDto: UpdateStepDto){
        const stepToUpdate = await this.stepRepository.findOneBy({ id: updateStepDto.id });
        if (!stepToUpdate) {
            throw new Error(`Step with id ${updateStepDto.id} not found`);
        }
        stepToUpdate.title = updateStepDto.title;
        stepToUpdate.data = updateStepDto.data;
        return await this.stepRepository.save(stepToUpdate);
    }

    async getSteps(process_id: number) {
        return await this.stepRepository.find({ where: { workflowID: process_id } });
    }


    async getAllRoles(id: number) {
        return await this.processRoleRepo.find({where:{processID:id}});
    }

    async getAllSteps(processID: number) {
        return await this.stepRepository.find({where:{workflowID: processID}});
    }

    async updateRole(updateRoleDto: UpdateProcessRoleDto) {
        const updatedRole = await this.processRoleRepo.findOne({where:{id: updateRoleDto.roleID}});
        updatedRole.selectable = updateRoleDto.selectable;
        updatedRole.workflowRoleName = updateRoleDto.process_role_name;
        return await this.processRoleRepo.update(updateRoleDto.roleID,updateRoleDto)
    }

    async changeOrder(changeOrderDto: ChangeOrderDto) {
        const existingStep = await this.stepRepository.findOne({where:{id:changeOrderDto.stepID}});

        if (!existingStep) {
            throw new Error(`Step with ID ${changeOrderDto.stepID} not found`);
        }
        existingStep.stepNumber = changeOrderDto.stepNumber;

        return await this.stepRepository.save(existingStep);
    }


    async assignRole(assignRoleDto: AssignRoleDto) {
        const newStepRole = new workflowElement_roles();
        newStepRole.workflowRoleID = assignRoleDto.workflowRoleID;
        newStepRole.workflowElementID = assignRoleDto.step_id;
        newStepRole.position = assignRoleDto.position;
        return await this.stepRolesRepository.save(newStepRole);
    }

    async deleteRole(roleID) {
        return await this.processRoleRepo.delete(roleID);
    }

    async sendNotification(){

    }


}
