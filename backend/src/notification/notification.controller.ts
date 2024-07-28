import {Controller, UseGuards} from '@nestjs/common';
import {IsLoggedInGuard} from "../is-logged-in/is-logged-in.guard";

@Controller('notification')
@UseGuards(IsLoggedInGuard)
export class NotificationController {}
