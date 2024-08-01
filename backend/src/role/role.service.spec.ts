import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import {AddRoleDto} from "./dto/add-role-dto";
import {async} from "rxjs";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
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
import {Repository} from "typeorm";

describe('RoleService', () => {
  let service: RoleService;
  let repository: Repository<roles>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(roles),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get<Repository<roles>>(getRepositoryToken(roles));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRole', () => {
    it('should return a role by ID', async () => {
      const roleID = 1;
      const role = { id: roleID, roleName: 'Test Role', platformID: 1, isDefault: true, permissions: [true, false, true] };
      jest.spyOn(repository, 'findOne').mockResolvedValue(role as roles);

      const result = await service.getRole(roleID);

      expect(result).toEqual(role);
    });
  });

  describe('addRole', () => {
    it('should add a new role', async () => {
      const addRoleDto: AddRoleDto = {
        roleName: 'New Role',
        platformID: 1,
        isDefault: false,
        permissions: [true, true, false],
      };
      const savedRole = { ...addRoleDto, id: 1 };
      jest.spyOn(repository, 'save').mockResolvedValue(savedRole as roles);

      const result = await service.addRole(addRoleDto);

      expect(result).toEqual(savedRole);
    });
  });

  describe('updateRole', () => {
    it('should update an existing role', async () => {
      const updateRoleDto: UpdateRoleDto = {
        roleName: 'Updated Role',
        platformID: 1,
        isDefault: true,
        permissions: [true, false, true],
      };
      const roleID = 1;
      const updatedRole = { ...updateRoleDto, id: roleID };
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);

      const result = await service.updateRole(roleID, updateRoleDto);

      expect(result.affected).toEqual(1);
    });
  });

  describe('deleteRole', () => {
    it('should delete a role by ID', async () => {
      const roleID = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      const result = await service.deleteRole(roleID);

      expect(result.affected).toEqual(1);
    });
  });

  describe('getAllRolesOfPlatform', () => {
    it('should return all roles of a platform by platform ID', async () => {
      const platformID = 1;
      const rolesArray = [
        { id: 1, roleName: 'Role 1', platformID, isDefault: true, permissions: [true, false, true] },
        { id: 2, roleName: 'Role 2', platformID, isDefault: false, permissions: [true, true, false] },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(rolesArray as roles[]);

      const result = await service.getAllRolesOfPlatform(platformID);

      expect(result).toEqual(rolesArray);
    });
  });
});