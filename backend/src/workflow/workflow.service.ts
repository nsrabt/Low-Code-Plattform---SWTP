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

    async createWorkflow(title: string, description: string, platform_id: number, isOPen: boolean): Promise<process> {
        const newWorkflow = new process();
        newWorkflow.title = title;
        newWorkflow.description = description;
        newWorkflow.platform_id = platform_id;
        newWorkflow.isOpen = isOPen;
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
        if(stepDeleteResult){
            const processDeleteResult =await this.processRepository.delete(id);
            if(processDeleteResult){
                return true;
            }
            else throw new Error("Couldn't delete the workflow");
        }else{
            throw new Error("Couldn't delete the workflow steps");
        }
    }

    async getWorkflowById(id: number){
        const searchedWorkflow = await this.processRepository.findOne({where: {id: id}});
        if(searchedWorkflow == null) {
            throw new NotFoundException();
        }
        return searchedWorkflow;
    }

    async updateWorkflow(id: number, updateData: Partial<process>){
        await this.processRepository.update(id, updateData);
        return this.processRepository.findOneBy({ id: id });
    }


    async getStepsByProcessId(process_id: number) {
        return await this.stepRepository.find({ where: { process_id } });
    }

    async addStep(process_id: number, title: string, document: string, step_number: number, role_ids: number[]) {
        const newStep = new step();
        newStep.process_id = process_id;
        newStep.title = title;
        newStep.data = document;
        newStep.stepNumber = step_number;

        const savedStep = await this.stepRepository.save(newStep);

        for (const role_id of role_ids) {
            const stepRole = new step_roles();
            stepRole.step_id = savedStep.id;
            stepRole.id = role_id;
            await this.stepRolesRepository.save(stepRole);
        }
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

        return await this.processRoleRepo.save(role);
    }

    async deleteStep(id: number){
        await this.stepRepository.delete({ id: id});
    }

    async getStepById(id: number){
        const searchedStep = await this.stepRepository.findOne({where: {id: id}});
        if(searchedStep == null) {
            throw new NotFoundException();
        }
        return searchedStep;
    }

    async updateStep(step_id: number, title: string, document: string){
        const stepToUpdate = await this.stepRepository.findOneBy({ id: step_id });
        if (!stepToUpdate) {
            throw new Error(`Step with id ${step_id} not found`);
        }
        stepToUpdate.title = title;
        stepToUpdate.data = document;
        return await this.stepRepository.save(stepToUpdate);
    }

    async getSteps(process_id: number) {
        return await this.stepRepository.find({ where: { process_id } });
    }


    async getAllRoles(id: number) {
        return await this.processRoleRepo.find({where:{processID:id}});
    }
}
