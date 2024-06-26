import {Body, Controller, Post} from '@nestjs/common';
import {WorkflowService} from "./workflow.service";
import {WorkflowDto} from "./dto/workflow-dto";
import {StepDto} from "./dto/step-dto";

@Controller('workflow')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) {}
    @Post('createWorkflow')
    async createWorkflow(@Body() workflowDto: WorkflowDto) {
        //return this.workflowService.createWorkflow(workflowDto.title);
    }

    @Post('createStep')
    async createStep(@Body() stepDto: StepDto) {
        //return this.workflowService.addStep(stepDto);
    }
}
