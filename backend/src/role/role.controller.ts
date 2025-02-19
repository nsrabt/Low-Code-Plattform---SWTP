import {Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards} from '@nestjs/common';
import {RoleService} from "./role.service";
import {AddRoleDto} from "./dto/add-role-dto";
import {UpdateUserDto} from "../user/dto/update-user-dto";
import {UpdateRoleDto} from "./dto/update-role-dto";
import {IsLoggedInGuard} from "../is-logged-in/is-logged-in.guard";

@Controller('role')
@UseGuards(IsLoggedInGuard)
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
    @Get('allRoles/:id')
    async getALlRolesOfPlatform(@Param('id',ParseIntPipe) id:number){
        return await this.roleService.getAllRolesOfPlatform(id);
    }


    /*
    Permissions:
    0 => apply for processes
    1 => check workflow overview
    2 => use monitoring dashboard
    3 => edit workflows
    4 => create workflows
    5 => edit platform-info
     */
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
