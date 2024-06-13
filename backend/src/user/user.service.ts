import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {user} from '../database/user'

import {Repository} from "typeorm";
import { promises as fs } from 'fs';
import * as path from "node:path";
import {user_platform} from "../database/user-platform";
import {user_platform_roles} from "../database/user-platform-roles";
import {timestamp} from "rxjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectRepository(user_platform)
        private userPlatformRepository: Repository<user_platform>,
        @InjectRepository(user_platform_roles)
        private userPlatformRolesRepository: Repository<user_platform_roles>,
    ) {}

    async findAll(): Promise<user[]> {
        return this.userRepository.find();
    }

    async addUser(username: string, EMail: string, profilePic: string, platform: number):Promise<boolean> {
        const newUser = new user();
        newUser.username = username;
        newUser.eMail=EMail;
        if(profilePic==""){
            //no profile-picture selected => default profile-picture
            const imagePath = path.join(__dirname, '..', 'media', 'pictures', 'testavatar.jpg');
            const imageBuffer = await fs.readFile(imagePath);
            newUser.profilePicture=imageBuffer.toString("base64");
        }
        else{
            //profile-picture selected => set as profile-picture
            newUser.profilePicture= profilePic;
        }

        let savedUser
        //Save user in user-table
        try{
            savedUser = await this.userRepository.save(newUser);
            savedUser.userID=this.userRepository.getId(savedUser);
        }catch(error){
            console.error("Fehler beim hinzufügen eines Users!\n",error.toString());
            return false;
        }

        const userPlatform = new user_platform();
        userPlatform.userID= savedUser.userID;
        userPlatform.platformID= platform;
        await this.userPlatformRepository.save(userPlatform);


        return true;
    }


}
