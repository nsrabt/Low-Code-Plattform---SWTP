import { Injectable } from '@nestjs/common';
import {roles} from "../database/workflow/roles";
import {InjectRepository} from "@nestjs/typeorm";
import {users} from "../database/user & execution/users";
import {Repository} from "typeorm";
import {user_platform} from "../database/user & execution/user-platform";
import {user_platform_roles} from "../database/user & execution/user-roles";
import {AddRoleDto} from "./dto/add-role-dto";
import {UpdateRoleDto} from "./dto/update-role-dto";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(roles)
        private rolesRepository: Repository<roles>,
    ) {}

    async getRole(id: number) {
        return await this.rolesRepository.findOne({where:{id:id}});
    }

    async addRole(addRoleDto: AddRoleDto) {
        const newRole = new roles();
        newRole.roleName = addRoleDto.roleName;
        newRole.isDefault = addRoleDto.isDefault;
        newRole.platformID = addRoleDto.platformID;
        newRole.permissions = addRoleDto.permissions;
        return await this.rolesRepository.save(newRole);
    }

    async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
        const newRole = new roles();
        newRole.roleName = updateRoleDto.roleName;
        newRole.isDefault = updateRoleDto.isDefault;
        newRole.platformID = updateRoleDto.platformID;
        return await this.rolesRepository.update(id, {
            roleName: updateRoleDto.roleName,
            platformID: updateRoleDto.platformID,
            isDefault: updateRoleDto.isDefault,
            permissions: updateRoleDto.permissions
        })
    }

    async deleteRole(id: number) {
        return await this.rolesRepository.delete(id);
    }

    async getAllRolesOfPlatform(id: number) {
        return await this.rolesRepository.find({where:{platformID:id}});
    }
}
