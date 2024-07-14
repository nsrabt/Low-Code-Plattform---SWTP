import {Body, Controller, Get, Param, ParseIntPipe, Put} from '@nestjs/common';
import {ProcessService} from "./process.service";
import {StartProcessDto} from "./dto/StartProcessDto";
import {filledDataDto} from "./dto/putFilledDataDto";
import {SendProcessRoleDto} from "./dto/SendProcessRoleDto";
import {IsNumber} from "class-validator";

@Controller('process')
export class ProcessController {
    constructor(private processService: ProcessService){}




    /*
        This method should be called as soon as the user starts the process
        so the user can decide which
     */
    @Get('allSelectableRoles')
    async getAllSelectableRoles(){

}

    /*
    This method returns all fields that are not yet defined.
    This allows displaying the form for the missing input data.
*/
    @Put('check')
    async getMissingData(@Body()startProcessDto: StartProcessDto){
        return await this.processService.getMissingData(startProcessDto);
    }



    @Put('startFill')
    async startFill(@Body()startProcessDto: StartProcessDto){
       // return await this.processService.walkThroughSteps();
    }

    @Get('userProcess/:id')
    async getUserProcess(@Param('id',ParseIntPipe) userProcessID:number){
        return await this.processService.getUserProcess(userProcessID);
    }
    //Put FilledData
    @Put('filledData')
    async putFilledData(@Body()filledDataDto: filledDataDto){
        return await this.processService.saveMissingData(filledDataDto);
    }

    //creates the process in the database and returns the process roles
    @Put('startProcess')
    async startProcess(@Body()startProcessDto: StartProcessDto){
        return await this.processService.startProcess(startProcessDto);
    }
    //if null => process role already has a user assigned to it
    @Put('sendProcessRole')
    async sendProcessRole(@Body()sendProcessRoleDto: SendProcessRoleDto){
        return await this.processService.saveProcessRole(sendProcessRoleDto);
    }



    //Get all the running processes
    @Get(':id')
    async getAllCurByUser(@Param('id',ParseIntPipe) userID:number){
        return await this.processService.getAllCurByUser(userID);
    }
    //Get all the done Processes
    @Get('done/:id')
    async getAllDoneByUser(@Param('id',ParseIntPipe) userID:number){
        return await this.processService.getAllDoneByUser(userID);
    }

        //Accept application

    //Apply

}
