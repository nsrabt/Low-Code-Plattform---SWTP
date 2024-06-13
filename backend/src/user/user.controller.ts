import {Body, Controller, Put} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user-dto";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {


    constructor(private userService: UserService) {
    }

    @Put()
    addUser(@Body() createUserDto: CreateUserDto) {
        const username = createUserDto.username;
        const email = createUserDto.eMail;
        const profilePicture = createUserDto.profilePicture;
        const platformID = createUserDto.platformID;
        this.userService.addUser(username,email, profilePicture,platformID);
        return "user was created: \n"+JSON.stringify(createUserDto);
    }
}
