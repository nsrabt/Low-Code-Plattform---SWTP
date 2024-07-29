import {Controller, Get, Param, ParseIntPipe, Put, UseGuards} from '@nestjs/common';
import {IsLoggedInGuard} from "../is-logged-in/is-logged-in.guard";
import {NotificationService} from "./notification.service";

@Controller('notification')
@UseGuards(IsLoggedInGuard)
export class NotificationController {

    constructor(private notificationService: NotificationService){}

    @Get(':id')
    async getNotificationOfUser(@Param('id',ParseIntPipe) userID:number){
        return await this.notificationService.getNotifications(userID);
    }


    @Put('delete/:id')
    async DeleteNotification(@Param('id',ParseIntPipe) notificationID:number){
        return await this.notificationService.deleteNotification(notificationID);
    }
}
