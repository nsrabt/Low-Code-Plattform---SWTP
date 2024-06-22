import { Injectable } from '@nestjs/common';
import {process} from "../database/process";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateRoleDto} from "../role/dto/update-role-dto";

@Injectable()
export class WorkflowService {
    constructor(
        @InjectRepository(process)
        private processRepository: Repository<process>,
    ) {}

    async createWorkflow(title: string, roles: number[], description: string, platform_id: number, isOPen: boolean): Promise<process> {
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
        await this.processRepository.delete(id);
    }

}
