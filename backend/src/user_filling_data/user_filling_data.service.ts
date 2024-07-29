import { Injectable } from '@nestjs/common';
import {SetDataDto} from "./dto/SetDataDto";
import {InjectRepository} from "@nestjs/typeorm";
import {filling_data} from "../database/user & execution/filling_data";
import {Repository} from "typeorm";
import {user_fillingdata} from "../database/user & execution/user-fillingdata";
import {UpdateUserDataDto} from "./dto/UpdateUserDataDto";
import {GetSpecificDataDto} from "./dto/GetSpecificDataDto";

@Injectable()
export class UserFillingDataService {

    constructor(
        @InjectRepository(user_fillingdata)
        private userFillingDataRepo: Repository<user_fillingdata>,
        @InjectRepository(filling_data)
        private fillingDataRepo: Repository<filling_data>,
    ) {
    }

    async setData(setDataDto: SetDataDto) {
        const { dataID, userID, value } = setDataDto;

        let newData = new user_fillingdata();
        newData.userID = userID;
        newData.pi_id = dataID;
        newData.value = value;

        return await this.userFillingDataRepo.save(newData);
        }

    async updateData(updateUserDataDto: UpdateUserDataDto) {
        const { dataID, userID, value } = updateUserDataDto;

        // Find the existing entry
        const existingEntry = await this.userFillingDataRepo.findOne({
            where: {
                pi_id: dataID,
                userID: userID
            }
        });

        if (!existingEntry) {
            throw new Error('Entry not found');
        }

        existingEntry.value = value;

        return await this.userFillingDataRepo.save(existingEntry);
    }

    async getAllFromUser(userID: number) {
        console.log("returning all userfilling of user" + userID)
        return await this.userFillingDataRepo.find({where:{userID:userID}});
    }

    async getSpecificData(getSpecificDataDto: GetSpecificDataDto) {
        return await this.userFillingDataRepo.find({
            where:{
                userID: getSpecificDataDto.userID,
                pi_id: getSpecificDataDto.dataId
            }
        });

    }
}
