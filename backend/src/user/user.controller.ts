import {
    Body,
    Controller,
    Get, Logger,
    Param,
    ParseIntPipe,
    Put,
    Session,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {UpdateUserDto} from "./dto/update-user-dto";
import {UserService} from "./user.service";
import {AddUserDto} from "./dto/add-user-dto";
import {ChangeRoleDto} from "./dto/change-role-dto";
import {IsLoggedInGuard} from "../is-logged-in/is-logged-in.guard";
import {SessionData} from "express-session";

@Controller('user')
@UseGuards(IsLoggedInGuard)
export class UserController {
    private readonly logger = new Logger(UserController.name);


    constructor(private userService: UserService) {
    }
    @Get('getUserBySession')
    async getUserBySession(@Session() session: SessionData) {
        console.log('Session data:', session);
        if (!session.isLoggedIn || !session.user) {
            console.log('User is not logged in or user data is missing');
            throw new UnauthorizedException('User is not logged in');
        }
        console.log('Returning user:', session.user);
        return session.user;
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
    @Put('add')
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



    @Put('delete/:id')
    async deleteUser(@Param('id',ParseIntPipe) id:number){
        return await this.userService.deleteUser(id);
    }

    @Get()
    async getAllUsers(){
        return await this.userService.getAll();
    }

    @Put('changeRole')
    async changeRole(@Body()changeRoleDto: ChangeRoleDto){
        return await this.userService.changeRole(changeRoleDto)
    }

    @Get('role/:id')
    async getRole(@Param('id',ParseIntPipe) id:number){
        return await this.userService.getRoleOfUser(id);
    }

    @Get('allUsersOfRole/:id')
    async getUsersOfRole(@Param('id',ParseIntPipe) roleID:number){
        return await this.userService.getUserOfRole(roleID);
    }

    @Get('roleOfUser/:id')
    async getRoleOfUser(@Param('id',ParseIntPipe) userID:number){
        return await this.userService.getRoleOfUser(userID);
    }


}
