import { Injectable } from '@nestjs/common';
import {user_notifications} from "../database/user & execution/user_notificatíons";
import {InjectRepository} from "@nestjs/typeorm";
import {workflow} from "../database/workflow/Workflow";
import {Repository} from "typeorm";
import {not} from "rxjs/internal/util/not";

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(user_notifications)
        private notificationRepo: Repository<user_notifications>,
    ){}

    async sendNotification(userID:number, message: string, link:string){
        const newNotification = new user_notifications();
        newNotification.link=link;
        newNotification.message=message;
        newNotification.userID = userID;
        return await this.notificationRepo.save(newNotification);
    }


    async getNotifications(userID:number){
        return await this.notificationRepo.find({where:{userID:userID}});
    }

    async deleteNotification(notificationID: number) {
        return await this.notificationRepo.delete(notificationID);
    }
}
