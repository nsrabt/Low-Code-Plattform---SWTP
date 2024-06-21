import {Body, Controller, Get, Param, ParseIntPipe, Put} from '@nestjs/common';
import {AddFillingDataDto} from "./dto/addFillingDataDto";
import { UpdateDataDto } from "./dto/UpdateDataDto";

import {FillingDataService} from "./filling_data.service";

@Controller('filling-data')
export class FillingDataController {

    constructor(private fillingDataService: FillingDataService) {
    }

    @Put()
    async addFillingData(@Body() addFillingDataDto:AddFillingDataDto){
        return await this.fillingDataService.addFillingData(addFillingDataDto);
    }
    @Get()
    async getAllFillingData(){
        return await this.fillingDataService.getAllFillingData()
    }
    @Get(':id')
    async getDataById(@Param('id',ParseIntPipe) id:number){
        return await this.fillingDataService.getDataById(id);
    }
    @Put('delete/:id')
    async deleteData(@Param('id',ParseIntPipe) id:number){
        return await this.fillingDataService.deleteData(id);
    }

    @Put('update/:id')
    async updateData(
        @Body()updateDataDto: UpdateDataDto,
        @Param('id',ParseIntPipe) id:number
    ){
        return await this.fillingDataService.updateData(id,updateDataDto);
    }

}
