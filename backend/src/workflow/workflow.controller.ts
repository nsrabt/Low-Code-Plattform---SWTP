import {Body, Controller, Post} from '@nestjs/common';
import {WorkflowService} from "./workflow.service";
import {WorkflowDto} from "./dto/workflow-dto";
import {StepDto} from "./dto/step-dto";

@Controller('workflow')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) {}
    @Post('createWorkflow')
    async createWorkflow(@Body() workflowDto: WorkflowDto) {
        return this.workflowService.createWorkflow(workflowDto.title, workflowDto.description,
            workflowDto.platform_id, workflowDto.isOPen);
    }

    @Post('addStep')
    async addStep(@Body() stepDto: StepDto) {
        return this.workflowService.addStep(stepDto.process_id, stepDto.title,
            stepDto.document, stepDto.step_number, stepDto.role_ids);
    }
}
