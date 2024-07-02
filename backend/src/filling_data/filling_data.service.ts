import {Injectable, NotFoundException} from '@nestjs/common';
import {AddFillingDataDto} from "./dto/addFillingDataDto";
import {filling_data} from "../database/user & execution/filling_data";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UpdateDataDto} from "./dto/UpdateDataDto";

@Injectable()
export class FillingDataService {

    constructor(
        @InjectRepository(filling_data)
        private fillingDataRepo: Repository<filling_data>,
    ){}


    //Filling Data Configuration
    async addFillingData(addFillingDataDto: AddFillingDataDto) {

        let fillingData = new filling_data();
        fillingData.name = addFillingDataDto.name;
        fillingData.platformid = addFillingDataDto.platformID;
        fillingData.datatype= addFillingDataDto.datatype;
        fillingData.isPlatforminfo = addFillingDataDto.isPlatformInfo;

        return await this.fillingDataRepo.save(fillingData);
    }

    async getAllFillingData(platformID:number) {
        const allData =await this.fillingDataRepo.find({where:{platformid:platformID}});
        if(allData == null){
            throw new NotFoundException();
        }
        else return allData;
    }

    async getDataById(id: number) {
         const foundData = await this.fillingDataRepo.findOne({where:{id :id}})
        if(foundData==null){
            throw new NotFoundException();
        }
        else return foundData;
    }


    async deleteData(id: number) {
        return await this.fillingDataRepo.delete(id);
    }


    async updateData(id: number, updateDataDto: UpdateDataDto) {
    return await this.fillingDataRepo.update(id, {
            name: updateDataDto.name,
            datatype: updateDataDto.datatype,
        });
    }





    //User-Filling-Data Configuration







}
