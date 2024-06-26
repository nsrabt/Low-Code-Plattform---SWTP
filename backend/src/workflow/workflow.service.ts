import {Injectable, NotFoundException} from '@nestjs/common';
import {process} from "../database/process";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

import {step} from "../database/step";
import {step_roles} from "../database/step-roles";



@Injectable()
export class WorkflowService {



    constructor(
        @InjectRepository(process)
        private processRepository: Repository<process>,
        @InjectRepository(step)
        private stepRepository: Repository<step>,
        @InjectRepository(step_roles)
        private stepRolesRepository: Repository<step_roles>,
    ) {}

    async createWorkflow(title: string, description: string, platform_id: number, isOPen: boolean): Promise<process> {
        const newWorkflow = new process();
        newWorkflow.title = title;
        newWorkflow.description = description;
        newWorkflow.platform_id = platform_id;
        newWorkflow.isOpen = isOPen;
        return await this.processRepository.save(newWorkflow);
    }

    async getWorkflows():Promise<process[]> {
        return await this.processRepository.find();
    }

    async deleteWorkflow(id: number): Promise<void> {
        await this.stepRepository.delete({ process_id: id });
        await this.processRepository.delete(id);
    }

    async getWorkflowById(id: number): Promise<process | null>  {
        const searchedWorkflow = await this.processRepository.findOne({where: {process_id: id}});
        if(searchedWorkflow == null) {
            throw new NotFoundException();
        }
        return searchedWorkflow;
    }

    async updateWorkflow(id: number, updateData: Partial<process>): Promise<process> {
        await this.processRepository.update(id, updateData);
        return this.processRepository.findOneBy({ process_id: id });
    }


    async getStepsByProcessId(process_id: number): Promise<step[]> {
        return await this.stepRepository.find({ where: { process_id } });
    }

    async addStep(process_id: number, title: string, document: string, step_number: number, role_ids: number[]): Promise<step> {
        //auch hier reicht string
        //const pdfBytes = await document.save();
        const newStep = new step();
        newStep.process_id = process_id;
        newStep.title = title;
        newStep.data = document;
        newStep.stepNumber = step_number;

        const savedStep = await this.stepRepository.save(newStep);

        for (const role_id of role_ids) {
            const stepRole = new step_roles();
            stepRole.step_id = savedStep.step_id;
            stepRole.role_id = role_id;
            await this.stepRolesRepository.save(stepRole);
        }
        return savedStep;
    }

    async deleteStep(id: number): Promise<void> {
        await this.stepRepository.delete({ step_id: id});
    }

    async getStepById(id: number): Promise<step | null> {
        const searchedStep = await this.stepRepository.findOne({where: {step_id: id}});
        if(searchedStep == null) {
            throw new NotFoundException();
        }
        return searchedStep;
    }

    async updateSteps(step_id: number, title: string, document: string): Promise<step> {
        const stepToUpdate = await this.stepRepository.findOneBy({ step_id });
        if (!stepToUpdate) {
            throw new Error(`Step with id ${step_id} not found`);
        }
        //es ist hier nicht notwendig das document als pdf zu behandeln. es wird dann umgewandelt wenn gebraucht
        //const pdfBytes = await document.save();
        stepToUpdate.title = title;
        stepToUpdate.data = document;
        return await this.stepRepository.save(stepToUpdate);
    }

    async getSteps(process_id: number): Promise<step[]> {
        return await this.stepRepository.find({ where: { process_id } });
    }


}
