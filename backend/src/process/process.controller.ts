import {Body, Controller, Put} from '@nestjs/common';
import {ProcessService} from "./process.service";
import {StartProcessDto} from "./dto/StartProcessDto";

@Controller('process')
export class ProcessController {
    constructor(private processService: ProcessService){}

    //startProcess
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
    //GetAllOpenProcesses

    //GetAllClosedProcesses

    //GetAllProcesses

    //Accept application

}
