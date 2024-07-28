import {Injectable, NotFoundException} from '@nestjs/common';
import {AddFillingDataDto} from "./dto/addFillingDataDto";
import {filling_data} from "../database/user & execution/filling_data";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {UpdateDataDto} from "./dto/UpdateDataDto";
import {SearchDto} from "./dto/SearchDto";
import {user_fillingdata} from "../database/user & execution/user-fillingdata";

@Injectable()
export class FillingDataService {

    constructor(
        @InjectRepository(filling_data)
        private fillingDataRepo: Repository<filling_data>,
        @InjectRepository(user_fillingdata)
        private userFillingRepo: Repository<user_fillingdata>
    ){}


    //Filling Data Configuration
    async addFillingData(addFillingDataDto: AddFillingDataDto) {
    if(!await this.fillingDataRepo.exists({where: {name: addFillingDataDto.name}})){
        let fillingData = new filling_data();
        fillingData.name = addFillingDataDto.name;
        fillingData.platformid = addFillingDataDto.platformID;
        fillingData.datatype= addFillingDataDto.datatype;
        fillingData.isPlatforminfo = addFillingDataDto.isPlatformInfo;

        return await this.fillingDataRepo.save(fillingData);
    }
    else{
        console.error("Name does already exist!")
        return null;
    }
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


    async search(query : string) {
        if(query==='')console.log("leer")
        const rtn = await this.fillingDataRepo.find({where:{name: Like(`%${query}%`)}})
        console.log("rtn "+rtn.length)
        return rtn;
    }

    async getPlatformData(id: number) {
        let isDefined = true;
        const undefined :filling_data[] = [];
        const platformInfo = await this.fillingDataRepo.find({where:{isPlatforminfo:true}});
        for(const pInfo of platformInfo){
            const userInfo =await this.userFillingRepo.findOne({where:{pi_id: pInfo.id, userID:id}});
            if(!userInfo){
                console.log(pInfo.name +" = undefined")
                undefined.push(pInfo);
            }
        }
        return undefined;
    }
}
