import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { users } from '../database/users';
import {filling_data} from "../database/filling_data";
import {platform} from "../database/platform";
import {process} from "../database/process";
import {roles} from "../database/roles";
import {step} from "../database/step";
import {step_fields} from "../database/step_fields";
import {user_fillingdata} from "../database/user-fillingdata";
import {user_platform} from "../database/user-platform";
import {user_platform_roles} from "../database/user-platform-roles";
import {user_process} from "../database/user_process";
import {user_process_step} from "../database/user_process_step";
import {WorkflowService} from "./workflow.service";



describe('WorkflowService', () => {
    let service: WorkflowService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: 'passwort',
                    database: 'LowCode',
                    entities: [filling_data,platform,process,roles,step,step_fields,users,user_fillingdata,user_platform,user_platform_roles, user_process,user_process_step],
                    synchronize: true,
                }),
                TypeOrmModule.forFeature([process,roles]),
            ],
            providers: [WorkflowService],
        }).compile();

        service = module.get<WorkflowService>(WorkflowService);
    });

    it('should insert a new workflow into the database', async () => {
        const title = 'Test Workflow';
        const roles = [1, 2];
        const description = 'This is a test workflow';
        const platform_id = 1;
        const isOpen = true;
        const newWorkflow = await service.createWorkflow(title, roles, description, platform_id, isOpen);

        expect(newWorkflow).toBeDefined();
        expect(newWorkflow.process_id).toBeGreaterThan(0);
        expect(newWorkflow.title).toBe(title);
        expect(newWorkflow.description).toBe(description);
        expect(newWorkflow.platform_id).toBe(platform_id);
        expect(newWorkflow.isOpen).toBe(isOpen);

    });
})