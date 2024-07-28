    import {Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards} from '@nestjs/common';
    import {ProcessService} from "./process.service";
    import {StartProcessDto} from "./dto/StartProcessDto";
    import {filledDataDto} from "./dto/putFilledDataDto";
    import {SendProcessRoleDto} from "./dto/SendProcessRoleDto";
    import {IsNumber} from "class-validator";
    import {workflow_roles} from "../database/workflow/Workflow_roles";
    import {IsLoggedInGuard} from "../is-logged-in/is-logged-in.guard";

    @Controller('process')
    @UseGuards(IsLoggedInGuard)
    export class ProcessController {
        constructor(private processService: ProcessService){}






    /*
    This method returns all fields that are not yet defined.
    This allows displaying the form for the missing input data.
*/
    @Put('check')
    async getMissingData(){
        return await this.processService.getMissingData();
    }


    //Starts the automatic pdf filling
    @Put('startFill/:id')
    async startFill(@Param('id')userID:number){
       return await this.processService.walkThroughSteps(userID);
    }

    //Returns a userProcess by its ID
    @Get('userProcess/:id')
    async getUserProcessRole(@Param('id',ParseIntPipe) userProcessID:number){
        return await this.processService.getUserProcessRole(userProcessID);
    }
    //saves one single Filling Data in Database
    @Put('filledData')
    async putFilledData(@Body()filledDataDto: filledDataDto){
        return await this.processService.saveMissingData(filledDataDto);
    }

    @Put('acceptProcess/:id')
    async acceptProcess(@Param('id',ParseIntPipe) processID:number){
        return await this.processService.acceptProcess(processID);
    }

    //creates the workflow in the database and returns the selectable workflow roles
    @Put('startProcess')
    async startProcess(@Body()startProcessDto: StartProcessDto){
        return await this.processService.startProcess(startProcessDto);
    }
    //if null => workflow role already has a user assigned to it
    @Put('sendProcessRole')
    async sendProcessRole(@Body()sendProcessRoleDto: SendProcessRoleDto){
        return await this.processService.saveProcessRole(sendProcessRoleDto);
    }

    @Get('allPublic')
    async getAllPublicProcesses(){
        return await this.processService.getAllPublic();
    }
    //Returns the PROCESS ROLE by it's id
    @Get('role/:id')
    async getRole(@Param('id',ParseIntPipe) process_role_id:number) {
        return await this.processService.getRole(process_role_id);
    }

    @Put('deleteProcess/:id')
    async deleteProcess(@Param('id',ParseIntPipe) process_id:number){
        return await this.processService.deleteProcess(process_id)
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

    @Get('waiting/:id')
    async getAllWaitingByUser(@Param('id',ParseIntPipe)userID:number){
        return await this.processService.getAllWaiting(userID);
    }

    @Get('todo/:id')
    async getAllTodoByUser(@Param('id',ParseIntPipe)userID:number){
        return await this.processService.getAllTodo(userID);
    }

    @Get('allElements/:id')
    async getAllElements(@Param('id',ParseIntPipe) processID:number) {
        return await this.processService.getAllElements(processID);
    }

    //Get process role by ID
    @Get('processRole/:id')
    async getProcessRole(@Param('id',ParseIntPipe) roleID:number) {

    }
        //Accept application

    //Apply

}
