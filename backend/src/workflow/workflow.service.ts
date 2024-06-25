import {Injectable, NotFoundException} from '@nestjs/common';
import {process} from "../database/process";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateRoleDto} from "../role/dto/update-role-dto";
import { WorkflowElement } from './WorkflowElement';
import {step} from "../database/step";
import {UpdateDataDto} from "../filling_data/dto/UpdateDataDto";
@Injectable()
export class WorkflowService {
    private elements: WorkflowElement[] = [];


    constructor(
        @InjectRepository(process)
        private processRepository: Repository<process>,
        @InjectRepository(step)
        private stepRepository: Repository<step>,
    ) {}

    async createWorkflow(title: string, roles: number[], description: string, platform_id: number, isOPen: boolean, steps: {title: string}[]): Promise<process> {
        const newWorkflow = new process();
        newWorkflow.title = title;
        newWorkflow.description = description;
        newWorkflow.platform_id = platform_id;
        newWorkflow.isOpen = isOPen;
        const savedWorkflow = await this.processRepository.save(newWorkflow);

        // Create and save the steps
        for (const stepData of steps) {
            const newStep = new step();
            newStep.process_id = savedWorkflow.process_id;
            newStep.title = stepData.title;
            await this.stepRepository.save(newStep);
        }
        return savedWorkflow;
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
    async addStep(process_id: number, title: string): Promise<step> {
        const newStep = new step();
        newStep.process_id = process_id;
        newStep.title = title;
        return await this.stepRepository.save(newStep);
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
    async updateSteps(step_id: number, title: string): Promise<step> {
        const stepToUpdate = await this.stepRepository.findOneBy({ step_id });
        stepToUpdate.title = title;
        return await this.stepRepository.save(stepToUpdate);
    }
    async sortSteps(process_id: number, sortBy: keyof step): Promise<step[]> {
        return await this.stepRepository.find({
            where: { process_id },
            order: { [sortBy]: 'ASC' },
        });
    }
    async getSteps(process_id: number): Promise<step[]> {
        return await this.stepRepository.find({ where: { process_id } });
    }
    async getNextStep(process_id: number, currentStepNumber: number): Promise<step> {
        const steps = await this.stepRepository.find({ where: { process_id } });
        const currentIndex = steps.findIndex(step => step.step_id === currentStepNumber);
        return steps[currentIndex + 1];
    }
    async getPreviousStep(process_id: number, currentStepNumber: number): Promise<step> {
        const steps = await this.stepRepository.find({ where: { process_id } });
        const currentIndex = steps.findIndex(step => step.step_id === currentStepNumber);
        return steps[currentIndex - 1];
    }
    async getFirstStep(process_id: number): Promise<step> {
        const steps = await this.stepRepository.find({ where: { process_id } });
        return steps[0];
    }
    async getLastStep(process_id: number): Promise<step> {
        const steps = await this.stepRepository.find({ where: { process_id } });
        return steps[steps.length - 1];
    }






}
