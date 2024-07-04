import {Injectable, NotFoundException} from '@nestjs/common';
import {process} from "../database/workflow/process";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {step} from "../database/workflow/step";
import {step_roles} from "../database/workflow/step-roles";
import {process_roles} from "../database/workflow/process_roles";
import {AddRoleDto} from "../role/dto/add-role-dto";
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
        @InjectRepository(process)
        private processRepository: Repository<process>,
        @InjectRepository(step)
        private stepRepository: Repository<step>,
        @InjectRepository(step_roles)
        private stepRolesRepository: Repository<step_roles>,
        @InjectRepository(roles)
        private roleRepo: Repository<roles>,
        @InjectRepository(process_roles)
        private processRoleRepo: Repository<process_roles>,

    ) {}

    async createWorkflow(title: string, description: string, platform_id: number, isOpen: boolean): Promise<process> {
        const newWorkflow = new process();
        newWorkflow.title = title;
        newWorkflow.description = description;
        newWorkflow.platform_id = platform_id;
        newWorkflow.isOpen = isOpen;
        return await this.processRepository.save(newWorkflow);
    }

    async getAllWorkflows():Promise<process[]> {
        return await this.processRepository.find();
    }
    async getAllOpenWorkflows(){
        return await this.processRepository.find({where:{isOpen:true}});
    }
    async getAllClosedWorkflows(){
        return await this.processRepository.find({where:{isOpen:false}});
    }

    async deleteWorkflow(id: number){

        const stepDeleteResult = await this.stepRepository.delete({process_id: id});
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
        return await this.stepRepository.find({ where: { process_id } });
    }

    async addStep(process_id: number, title: string, document: string, step_number: number) {
        const newStep = new step();
        newStep.process_id = process_id;
        newStep.title = title;
        newStep.data = document;
        newStep.stepNumber = step_number;

        const savedStep = await this.stepRepository.save(newStep);

        return savedStep;
    }

    async addRole(addProcessRoleDto: AddProcessRoleDto){
        const role = new process_roles();
        // if role exists
        if(await this.roleRepo.find({where:{id: addProcessRoleDto.roleID}})){
            role.roleID = addProcessRoleDto.roleID;
        }
        else{
            throw new Error("Role with ID:"+addProcessRoleDto.roleID+" doesnt exist")
        }
        //if process exists
        if(await this.processRepository.find({where:{id: addProcessRoleDto.roleID}})){
            role.processID = addProcessRoleDto.processID;
        }
        else{
            throw new Error("Process with ID: " + addProcessRoleDto.roleID + " doesnt exist!")
        }
        role.selectable = addProcessRoleDto.selectable;
        role.process_role_name = addProcessRoleDto.process_role_name;
        role.isApplicant= addProcessRoleDto.isApplicant;
        console.log(role.selectable)
        return await this.processRoleRepo.save(role);
    }

    async deleteStep(id: number){
        await this.stepRolesRepository.delete({step_id: id})
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
        stepToUpdate.stepNumber = updateStepDto.stepNumber;
        stepToUpdate.stepNumber = updateStepDto.stepNumber;
        return await this.stepRepository.save(stepToUpdate);
    }

    async getSteps(process_id: number) {
        return await this.stepRepository.find({ where: { process_id } });
    }


    async getAllRoles(id: number) {
        return await this.processRoleRepo.find({where:{processID:id}});
    }

    async getAllSteps(processID: number) {
        return await this.stepRepository.find({where:{process_id: processID}});
    }

    async updateRole(updateRoleDto: UpdateProcessRoleDto) {
        const updatedRole = await this.processRoleRepo.findOne({where:{id: updateRoleDto.roleID}});
        updatedRole.selectable = updateRoleDto.selectable;
        updatedRole.process_role_name = updateRoleDto.process_role_name;
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
        const newStepRole = new step_roles();
        newStepRole.process_role_id = assignRoleDto.process_role_id;
        newStepRole.step_id = assignRoleDto.step_id;
        return await this.stepRolesRepository.save(newStepRole);
    }

    async deleteRole(roleID) {
        return await this.processRoleRepo.delete(roleID);
    }
}
