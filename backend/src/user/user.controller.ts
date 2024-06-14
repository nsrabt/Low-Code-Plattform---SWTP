import {Body, Controller, Get, Param, ParseIntPipe, Put} from '@nestjs/common';
import {UpdateUserDto} from "./dto/update-user-dto";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user-dto";
import {AddUserDto} from "./dto/add-user-dto";

@Controller('user')
export class UserController {


    constructor(private userService: UserService) {
    }
    /*
    The following function returns you the user Object by it's ID
     */
    @Get(':id')
    async getUserByID(@Param("id",ParseIntPipe)id:number){
        return await this.userService.getUserById(id);
    }
    /*
    The following function only adds the user to the user table!
    It will not be in any platform nor have any role
    If returned User is null it failed.
    if returned User is not null it was a success.
     */
    @Put('addUser')
    async addUser(@Body() addUserDto: AddUserDto) {
        return await this.userService.addUser(addUserDto);
    }
    /*
    The following function changes the user information in the user table
     */
    @Put('update/:id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ){
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Put('deleteUser/:id')
    async deleteUser(@Param('id',ParseIntPipe) id:number){
        return await this.userService.deleteUser(id);
    }




}
