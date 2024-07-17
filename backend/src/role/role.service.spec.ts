import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import {AddRoleDto} from "./dto/add-role-dto";
import {async} from "rxjs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {users} from "../database/user & execution/users";
import {user_platform} from "../database/user & execution/user-platform";
import {user_platform_roles} from "../database/user & execution/user-roles";
import {roles} from "../database/workflow/roles";
import {filling_data} from "../database/user & execution/filling_data";
import {platform} from "../database/platform_management/platform";
import {workflow} from "../database/workflow/Workflow";
import {workflowElement} from "../database/workflow/WorkflowElement";
import {fields} from "../database/workflow/fields";
import {user_fillingdata} from "../database/user & execution/user-fillingdata";
import {user_process} from "../database/user & execution/user_process";
import {user_process_element} from "../database/user & execution/user_process_element";
import {UserService} from "../user/user.service";
import {UpdateRoleDto} from "./dto/update-role-dto";

describe('RoleService', () => {
  let service: RoleService;

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
        TypeOrmModule.forFeature([users,user_platform,user_platform_roles,roles]),
      ],
      providers: [RoleService],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });


  it('should be defined', async() => {
    /*
    let addRoleDto = new AddRoleDto();
    addRoleDto.roleName = 'Moderator';
    addRoleDto.platformID=1;
    addRoleDto.isDefault=false;
    addRoleDto.permissions= [true,true,true,true,false,false];
    const addedRole = await service.addRole(addRoleDto);
    expect(addedRole.roleName == 'Moderator').toBe(true);
  */
    let updateRoleDto = new UpdateRoleDto()
    updateRoleDto.permissions=[false,false,false,false,false,false]
    await service.updateRole(1,updateRoleDto);

  });
});
