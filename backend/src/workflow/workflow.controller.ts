import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {WorkflowService} from "./workflow.service";
import {CreateWorkflowDto} from "./dto/create-workflow-dto";
import {StepDto} from "./dto/step-dto";
import {AddProcessRoleDto} from "./dto/addProcessRoleDto";

@Controller('workflow')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) {}

    @Post('createWorkflow')
    async createWorkflow(@Body() workflowDto: CreateWorkflowDto) {
        return this.workflowService.createWorkflow(workflowDto.title, workflowDto.description, workflowDto.platform_id, workflowDto.isOpen);
    }

    @Post('addStep')
    async addStep(@Body() stepDto: StepDto) {
        return this.workflowService.addStep(stepDto.id, stepDto.title,
            stepDto.document, stepDto.step_number, stepDto.role_ids);
    }

    @Post('addRole')
    async addRole(@Body() addProcessRoleDto: AddProcessRoleDto) {
        return await this.workflowService.addRole(addProcessRoleDto);
    }

    //get all roles
    @Get('allRoles/:id')
    async getAllRoles(@Param('id', ParseIntPipe) id:number){
        return await this.workflowService.getAllRoles(id);
    }
    //get all steps

    //get step by id

    //getworkflow

    //update workflow

    //updateStep

    //updateSteps

    //updaterole

    //deleteStep

    //deleteWorkflow

    //changeOrderOf

    //addUserTo process_role


}
