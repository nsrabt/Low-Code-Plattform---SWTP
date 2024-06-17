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
import {user} from'./database/user';
import {user_filling_data} from'./database/user-filling-data';
import {user_platform} from './database/user-platform';
import {user_platform_roles} from'./database/user-platform-roles';
import {user_process} from'./database/user_process';
import {user_process_step} from'./database/user_process_step';
import {UserController} from "./user/user.controller";
import {UserService} from "./user/user.service";
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import {AuthModule} from "./auth/auth.module";





@Module({
  imports: [
      AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'malek',
      password: 'Linux',
      database: 'LowCode',
      entities: [filling_data,platform,process,roles,step,step_fields,user,user_filling_data,user_platform,user_platform_roles, user_process,user_process_step],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([user,user_platform,user_platform_roles,roles]),
  ],
  controllers: [AppController, WorkflowController, UserController, RoleController],
  providers: [AppService, WorkflowService, UserService, RoleService],
})
export class AppModule {}
