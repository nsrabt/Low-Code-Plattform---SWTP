import { Injectable } from '@nestjs/common';
import {user_notifications} from "../database/user & execution/user_notificatíons";
import {InjectRepository} from "@nestjs/typeorm";
import {workflow} from "../database/workflow/Workflow";
import {Repository} from "typeorm";

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(user_notifications)
        private notificationRepo: Repository<user_notifications>,
    ){}

        async sendNotification(userID:number ){

    }

    async getNotifications(userID:number){

    }

}
