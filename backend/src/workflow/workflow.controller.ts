import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {WorkflowService} from "./workflow.service";
import {CreateWorkflowDto} from "./dto/create-workflow-dto";
import {StepDto} from "./dto/step-dto";
import {AddProcessRoleDto} from "./dto/addProcessRoleDto";
import {UpdateWorkflowDto} from "./dto/update-workflow-dto";
import {UpdateStepDto} from "./dto/update-step-dto";
import {UpdateProcessRoleDto} from "./dto/update-process-role-dto";
import {ChangeOrderDto} from "./dto/change-order-dto";
import {AssignRoleDto} from './dto/assign-role-dto'

@Controller('workflow')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) {}

    @Post('createWorkflow')
    async createWorkflow(@Body() workflowDto: CreateWorkflowDto) {
        return this.workflowService.createWorkflow(workflowDto.title, workflowDto.description, workflowDto.platform_id, workflowDto.isOpen);
    }

    @Post('addStep')
    async addStep(@Body() stepDto: StepDto) {
        return this.workflowService.addStep(stepDto.id, stepDto.title, stepDto.document, stepDto.step_number);
    }

    @Post('addRole')
    async addRole(@Body() addProcessRoleDto: AddProcessRoleDto) {
        return await this.workflowService.addRole(addProcessRoleDto);
    }

    //get all roles
    @Get('allRoles/:id')
    async getAllRoles(@Param('id', ParseIntPipe) processID:number){
        return await this.workflowService.getAllRoles(processID);
    }
    //get all steps
    @Get('allSteps/:id')
    async getAllSteps(@Param('id', ParseIntPipe) processID:number){
        return await this.workflowService.getAllSteps(processID);
    }
    //get step by id
    @Get('step/:id')
    async getStepById(@Param('id',ParseIntPipe)stepID:number){
        return await this.workflowService.getStepById(stepID);
    }
    //getworkflow
    @Get('workflow/:id')
    async getWorkflow(@Param('id',ParseIntPipe)workflowID:number){
        return await this.workflowService.getWorkflowById(workflowID);
    }
    //update workflow
    @Post('updateWorkflow')
    async updateWorkflow(@Body() updateWorkflowDto: UpdateWorkflowDto){
        return await this.workflowService.updateWorkflow(updateWorkflowDto)
    }
    //updateStep
    @Post('updateStep')
    async updateStep(@Body()updateStepDto: UpdateStepDto){
        return await this.workflowService.updateStep(updateStepDto)
    }

    //updaterole
    @Post('updateRole')
    async updateRole(@Body() updateRoleDto: UpdateProcessRoleDto){
        return await this.workflowService.updateRole(updateRoleDto);
    }
    //deleteStep
    @Post('deleteStep/:id')
    async deleteStep(@Param('id', ParseIntPipe)stepID: number){
        return await this.workflowService.deleteStep(stepID);
    }

    //deleteWorkflow
    @Post('deleteStep/:id')
    async deleteWorkflow(@Param('id', ParseIntPipe)workflowID: number){
        return await this.workflowService.deleteWorkflow(workflowID);
    }

    //changeOrderOf
    @Post('changeOrder')
    async changeOrder(@Body()changeOrderDto: ChangeOrderDto){
        return await this.workflowService.changeOrder(changeOrderDto);
    }

    @Post('assignRole')
    async assignRole(@Body()assignRoleDto: AssignRoleDto){
        return await this.workflowService.assignRole(assignRoleDto)
    }

    @Post('deleteRole/:id')
    async deleteRole(@Param('id',ParseIntPipe)roleID){
        return await this.workflowService.deleteRole(roleID);
    }
}


