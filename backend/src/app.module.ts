import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkflowController } from './workflow/workflow.controller';
import { WorkflowService } from './workflow/workflow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {filling_data} from './database/user & execution/filling_data';
import {platform} from './database/platform_management/platform';
import {workflow} from './database/workflow/Workflow';
import {roles} from './database/workflow/roles';
import {workflowElement} from './database/workflow/WorkflowElement';
import {fields} from './database/workflow/fields';
import {users} from './database/user & execution/users';
import {user_fillingdata} from './database/user & execution/user-fillingdata';
import {user_platform} from './database/user & execution/user-platform';

import {user_process_roles} from './database/user & execution/user_process_roles';




import {user_platform_roles} from './database/user & execution/user-roles';
import {user_process} from './database/user & execution/user_process';
import {user_process_element} from './database/user & execution/user_process_element';
import {UserController} from "./user/user.controller";
import {UserService} from "./user/user.service";
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import {AuthModule} from "./auth/auth.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path'; // New
import { process } from './database/user & execution/process'
import { FillingDataController } from './filling_data/filling_data.controller';
import { FillingDataService } from './filling_data/filling_data.service';
import { UserFillingDataController } from './user_filling_data/user_filling_data.controller';
import { UserFillingDataService } from './user_filling_data/user_filling_data.service';
import { ProcessService } from './process/process.service';
import { ProcessController } from './process/process.controller';
import {workflowElement_roles} from "./database/workflow/WorkflowElement_roles";
import {field_roles} from "./database/workflow/field_roles";
import {workflow_roles} from "./database/workflow/Workflow_roles";
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import {process_element} from "./database/user & execution/process_element";
import {user_notifications} from "./database/user & execution/user_notificatíons";







@Module({
  imports: [
      AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'passwort',
      database: 'postgres',
      entities: [filling_data,platform,workflow,roles,workflowElement,fields,users,user_fillingdata,user_platform,user_platform_roles, user_process,user_process_element, workflow, user_process_roles, field_roles, workflow_roles, workflowElement_roles,process, process_element, user_process_element, user_notifications],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({ // New
      rootPath: join(__dirname, '../../frontend/dist'), // New
    }), // New
    TypeOrmModule.forFeature([users,user_platform,user_platform_roles,roles,filling_data, workflow,workflowElement,workflow,platform,workflowElement_roles,fields, user_fillingdata, user_process, user_process_element, user_process_roles, field_roles, workflow_roles,process,process_element, user_notifications]),
  ],
  controllers: [AppController, WorkflowController, UserController, RoleController, FillingDataController, WorkflowController, UserFillingDataController, ProcessController, NotificationController],
  providers: [AppService, WorkflowService, UserService, RoleService, FillingDataService, WorkflowService, UserFillingDataService, ProcessService, NotificationService],
})
export class AppModule {}
