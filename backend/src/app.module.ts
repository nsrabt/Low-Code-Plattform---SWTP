import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkflowController } from './workflow/workflow.controller';
import { WorkflowService } from './workflow/workflow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {filling_data} from'./database/filling_data';
import {platform} from'./database/platform';
import {process} from'./database/process';
import {roles} from'./database/roles';
import {step} from'./database/step';
import {step_fields} from'./database/step_fields';
import {users} from './database/users';
import {user_fillingdata} from './database/user-fillingdata';
import {user_platform} from './database/user-platform';
import {user_platform_roles} from'./database/user-platform-roles';
import {user_process} from'./database/user_process';
import {user_process_step} from'./database/user_process_step';
import {UserController} from "./user/user.controller";
import {UserService} from "./user/user.service";
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import {AuthModule} from "./auth/auth.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path'; // New
import { FillingDataController } from './filling_data/filling_data.controller';
import { FillingDataService } from './filling_data/filling_data.service';







@Module({
  imports: [
      AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'passwort',
      database: 'LowCode',
      entities: [filling_data,platform,process,roles,step,step_fields,users,user_fillingdata,user_platform,user_platform_roles, user_process,user_process_step, process],
      synchronize: false,
    }),
    ServeStaticModule.forRoot({ // New
      rootPath: join(__dirname, '..', 'frontend/dist'), // New
    }), // New
    TypeOrmModule.forFeature([users,user_platform,user_platform_roles,roles,filling_data, process]),
  ],
  controllers: [AppController, WorkflowController, UserController, RoleController, FillingDataController, WorkflowController],
  providers: [AppService, WorkflowService, UserService, RoleService, FillingDataService, WorkflowService],
})
export class AppModule {}
