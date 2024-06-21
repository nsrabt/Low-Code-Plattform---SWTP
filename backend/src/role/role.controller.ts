import {Body, Controller, Get, Param, ParseIntPipe, Put} from '@nestjs/common';
import {RoleService} from "./role.service";
import {AddRoleDto} from "./dto/add-role-dto";
import {UpdateUserDto} from "../user/dto/update-user-dto";
import {UpdateRoleDto} from "./dto/update-role-dto";

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) {
    }

    @Get(':id')
    async getRoleByID(@Param("id",ParseIntPipe)id:number){
        return await this.roleService.getRole(id);
    }

    @Put()
    async addRole(@Body() addRoleDto: AddRoleDto){
        return await this.roleService.addRole(addRoleDto);
    }
    @Put("update/:id")
    async updateRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoleDto: UpdateRoleDto) {

        return await this.roleService.updateRole(id, updateRoleDto)
    }

    @Put('delete/:id')
    async deleteRole(@Param('id', ParseIntPipe) id: number){
        return await this.roleService.deleteRole(id)
    }


}
