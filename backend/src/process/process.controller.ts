import {Body, Controller, Get, Put} from '@nestjs/common';
import {ProcessService} from "./process.service";
import {StartProcessDto} from "./dto/StartProcessDto";
import {filledDataDto} from "./dto/putFilledDataDto";

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



    //Put FilledData
    @Put('filledData')
    async putFilledData(@Body()filledDataDto: filledDataDto){
        return await this.processService.saveMissingData(filledDataDto);
    }

    //GetAllOpenProcesses

    //GetAllClosedProcesses

    //GetAllProcesses

    //Accept application

    //Apply

    //Get all Process Roles
}
