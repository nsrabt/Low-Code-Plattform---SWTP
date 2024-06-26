import {Body, Controller, Get, Param, ParseIntPipe, Put} from '@nestjs/common';
import {UserFillingDataService} from "./user_filling_data.service";
import {SetDataDto} from "./dto/SetDataDto";
import {UpdateDataDto} from "../filling_data/dto/UpdateDataDto";
import {UpdateUserDataDto} from "./dto/UpdateUserDataDto";
import {GetSpecificDataDto} from "./dto/GetSpecificDataDto";
import {GetAllFromUserDto} from "./dto/getAllFromUserDto";

@Controller('user-filling-data')
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
    @Get('getAll')
    async getAllData(@Body() getAll: GetAllFromUserDto){
        return await this.service.getAllFromUser(getAll.userID, getAll.platformID);
    }

    @Get('getSpecificData')
    async getSpecificData(@Body()getSpecificDataDto: GetSpecificDataDto){
        return await this.service.getSpecificData(getSpecificDataDto);
    }
}
