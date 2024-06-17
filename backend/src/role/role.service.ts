import { Injectable } from '@nestjs/common';
import {roles} from "../database/roles";
import {InjectRepository} from "@nestjs/typeorm";
import {user} from "../database/user";
import {Repository} from "typeorm";
import {user_platform} from "../database/user-platform";
import {user_platform_roles} from "../database/user-platform-roles";
import {AddRoleDto} from "./dto/add-role-dto";
import {UpdateRoleDto} from "./dto/update-role-dto";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(roles)
        private rolesRepository: Repository<roles>,
    ) {}

    async getRole(id: number) {
        return await this.rolesRepository.findOne({where:{roleID:id}});
    }

    async addRole(addRoleDto: AddRoleDto) {
        const newRole = new roles();
        newRole.roleName = addRoleDto.roleName;
        newRole.isDefault = addRoleDto.isDefault;
        newRole.permissions = addRoleDto.permissions;
        newRole.platformID = addRoleDto.platformID;
        return await this.rolesRepository.save(newRole);


    }

    async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
        const newRole = new roles();
        newRole.roleName = updateRoleDto.roleName;
        newRole.isDefault = updateRoleDto.isDefault;
        newRole.permissions = updateRoleDto.permissions;
        newRole.platformID = updateRoleDto.platformID;
        return await this.rolesRepository.update(id, {
            roleName: updateRoleDto.roleName,
            platformID: updateRoleDto.platformID,
            permissions: updateRoleDto.permissions,
            isDefault: updateRoleDto.isDefault,
        })
    }
}
