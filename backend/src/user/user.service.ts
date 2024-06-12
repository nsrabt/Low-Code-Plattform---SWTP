import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {user} from '../database/user'
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
    ) {}

    async findAll(): Promise<user[]> {
        return this.userRepository.find();
    }
    async addUser(firstName: string, lastName: string, EMail: string):Promise<boolean> {
        const newUser = new user();
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.eMail=EMail;
        newUser.profilePicture="";
        try{
            const savedUser = await this.userRepository.save(newUser);
            console.log("added user to database")
        }catch(error){
            console.error("Fehler beim hinzufügen eines Users!\n",error.toString());
            return false;
        }
        return true;
    }


}
