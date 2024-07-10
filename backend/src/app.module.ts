import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkflowController } from './workflow/workflow.controller';
import { WorkflowService } from './workflow/workflow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {filling_data} from './database/user & execution/filling_data';
import {platform} from './database/platform_management/platform';
import {process} from './database/workflow/process';
import {roles} from './database/workflow/roles';
import {step} from './database/workflow/step';
import {fields} from './database/workflow/fields';
import {users} from './database/user & execution/users';
import {user_fillingdata} from './database/user & execution/user-fillingdata';
import {user_platform} from './database/user & execution/user-platform';

import {UserProcessRoles} from './database/user & execution/user_process_roles';




import {user_platform_roles} from './database/user & execution/user-roles';
import {user_process} from './database/user & execution/user_process';
import {user_step} from './database/user & execution/user_step';
import {UserController} from "./user/user.controller";
import {UserService} from "./user/user.service";
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import {AuthModule} from "./auth/auth.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path'; // New
import { FillingDataController } from './filling_data/filling_data.controller';
import { FillingDataService } from './filling_data/filling_data.service';
import { UserFillingDataController } from './user_filling_data/user_filling_data.controller';
import { UserFillingDataService } from './user_filling_data/user_filling_data.service';
import { ProcessService } from './process/process.service';
import { ProcessController } from './process/process.controller';
import {step_roles} from "./database/workflow/step-roles";
import {field_roles} from "./database/workflow/field_roles";
import {process_roles} from "./database/workflow/process_roles";







@Module({
  imports: [
      AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234.Qwer',
      database: 'postgres',
      entities: [filling_data,platform,process,roles,step,fields,users,user_fillingdata,user_platform,user_platform_roles, user_process,user_step, process, UserProcessRoles, field_roles, process_roles, step_roles],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({ // New
      rootPath: join(__dirname, '../../frontend/dist'), // New
    }), // New
    TypeOrmModule.forFeature([users,user_platform,user_platform_roles,roles,filling_data, process,step,process,platform,step_roles,fields, user_fillingdata, user_process, user_step, UserProcessRoles, field_roles, process_roles]),
  ],
  controllers: [AppController, WorkflowController, UserController, RoleController, FillingDataController, WorkflowController, UserFillingDataController, ProcessController],
  providers: [AppService, WorkflowService, UserService, RoleService, FillingDataService, WorkflowService, UserFillingDataService, ProcessService],
})
export class AppModule {}
