import {Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards} from '@nestjs/common';
import {UserFillingDataService} from "./user_filling_data.service";
import {SetDataDto} from "./dto/SetDataDto";
import {UpdateDataDto} from "../filling_data/dto/UpdateDataDto";
import {UpdateUserDataDto} from "./dto/UpdateUserDataDto";
import {GetSpecificDataDto} from "./dto/GetSpecificDataDto";
import {GetAllFromUserDto} from "./dto/getAllFromUserDto";
import {IsLoggedInGuard} from "../is-logged-in/is-logged-in.guard";

@Controller('user-filling-data')
@UseGuards(IsLoggedInGuard)
export class UserFillingDataController {
    constructor(private service: UserFillingDataService) {
    }

    @Put()
    async setData(@Body() setDataDto: SetDataDto){
        return await this.service.setData(setDataDto);
    }

    @Put('update')
    async updateData(@Body() updateUserDataDto: UpdateUserDataDto){
        return await this.service.updateData(updateUserDataDto);
    }
    @Get('getAll/:id')
    async getAllData(@Param('id',ParseIntPipe) id:number){
        return await this.service.getAllFromUser(id);
    }

    @Get('getSpecificData')
    async getSpecificData(@Body()getSpecificDataDto: GetSpecificDataDto){
        return await this.service.getSpecificData(getSpecificDataDto);
    }
}
