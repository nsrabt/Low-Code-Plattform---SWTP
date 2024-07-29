import {Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards} from '@nestjs/common';
import {AddFillingDataDto} from "./dto/addFillingDataDto";
import { UpdateDataDto } from "./dto/UpdateDataDto";

import {FillingDataService} from "./filling_data.service";
import {IsLoggedInGuard} from "../is-logged-in/is-logged-in.guard";
import {SearchDto} from "./dto/SearchDto";

@Controller('filling-data')
@UseGuards(IsLoggedInGuard)
export class FillingDataController {

    constructor(private fillingDataService: FillingDataService) {
    }

    @Put()
    async addFillingData(@Body() addFillingDataDto:AddFillingDataDto){
        return await this.fillingDataService.addFillingData(addFillingDataDto);
    }
    @Get('all/:id')
    async getAllFillingData(@Param('id',ParseIntPipe) id:number){
        return await this.fillingDataService.getAllFillingData(id);
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

    @Get('search/:query')
    async search(@Param('query') query:string){
        console.log(query)
        return await this.fillingDataService.search(query);
    }

    @Get('platformData/:id')
    async getPlatformData(@Param('id',ParseIntPipe) id:number){
        return await this.fillingDataService.getPlatformData(id);
    }

    @Get('undefindedData/:id')
    async getUndefinedData(@Param('id',ParseIntPipe) id:number){
        return await this.fillingDataService.getUndefinedData(id);
    }
}
