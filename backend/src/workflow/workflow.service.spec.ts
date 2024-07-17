import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { users } from '../database/user & execution/users';
import {filling_data} from "../database/user & execution/filling_data";
import {platform} from "../database/platform_management/platform";
import {workflow} from "../database/workflow/Workflow";
import {roles} from "../database/workflow/roles";
import {workflowElement} from "../database/workflow/WorkflowElement";
import {fields} from "../database/workflow/fields";
import {user_fillingdata} from "../database/user & execution/user-fillingdata";
import {user_platform} from "../database/user & execution/user-platform";
import {user_platform_roles} from "../database/user & execution/user-roles";
import {user_process} from "../database/user & execution/user_process";
import {user_process_element} from "../database/user & execution/user_process_element";
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
                    entities: [filling_data,platform,workflow,roles,workflowElement,fields,users,user_fillingdata,user_platform,user_platform_roles, user_process,user_process_element],
                    synchronize: true,
                }),
                TypeOrmModule.forFeature([workflow,roles]),
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