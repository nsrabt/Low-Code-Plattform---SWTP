import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {users} from '../database/user & execution/users'

import {Repository} from "typeorm";
import { promises as fs } from 'fs';
import * as path from "node:path";
import {user_platform} from "../database/user & execution/user-platform";
import {user_platform_roles} from "../database/user & execution/user-roles";
import {timestamp} from "rxjs";
import {roles} from "../database/workflow/roles";
import {AddUserDto} from "./dto/add-user-dto";
import {UpdateUserDto} from "./dto/update-user-dto";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {ChangeRoleDto} from "./dto/change-role-dto";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(users)
        private userRepository: Repository<users>,
        @InjectRepository(user_platform)
        private userPlatformRepository: Repository<user_platform>,
        @InjectRepository(user_platform_roles)
        private userPlatformRolesRepository: Repository<user_platform_roles>,
        @InjectRepository(roles)
        private rolesRepository: Repository<roles>,
    ) {}

    /*
        1 stands for the THM Platform
        If time allows we'll add more Platforms and change the code that you can
        add users to different platforms to.
        But for now platFormID will be 1
     */

    platformID = 1;





    async getAll(): Promise<users[]> {
        return await this.userRepository.find();
    }


    async getUserById(id: number){
        const searchedUser =  this.userRepository.findOne({where: {id: id}});
        if(searchedUser==null){
            throw new NotFoundException();
        }
        return searchedUser;
    }

/*
    this function checks if the username and email are free.
    If so it adds the user to the database. if not, the function returns null!
 */
    async addUser(addUserDto: AddUserDto): Promise<users> {
        const username = addUserDto.username;
        const email = addUserDto.eMail;

            //check if user or email is already defined!
            const definedUser = await this.userRepository.findOne({where:{eMail:email, username: username}});
            console.log("definedUser", definedUser);
            if(definedUser){
                return definedUser;
            }

            //if not add the user to our database
            try {
                const newUser = new users();
                newUser.username = username;
                newUser.eMail = email;

                //no profile-picture selected => default profile-picture
                const imagePath = path.join(__dirname, '..', '..', 'src', 'media', 'pictures', 'testavatar.jpg');
                const imageBuffer = await fs.readFile(imagePath);
                newUser.profilePicture = imageBuffer.toString("base64");

                //finally save user in database

                const savedUser = await this.userRepository.save(newUser) //Save user in user-table
                console.log("savedUser",savedUser);
                const savedUserID = await this.userRepository.getId(savedUser);
                await this.assignDefaultRole(savedUserID, this.platformID);
                await this.addUserToPlatform(savedUserID, this.platformID);
            } catch (error) {
                console.error("failed to add User to database");
                throw error;
            }
        return null;
    }


    async addUserToPlatform(userID:number, platformID:number ) {
        try{
            const userPlatform = new user_platform();
            userPlatform.userID = userID;
            userPlatform.platformID = platformID;
            await this.userPlatformRepository.save(userPlatform);
        }catch(error){
            console.error("failed to add User "+userID+" to platform "+platformID);
        }
    }

    async assignDefaultRole(userID:number, platformID:number){
        try{

            const defaultRole = await this.rolesRepository.findOne({
                where: {
                    isDefault: true,
                    platformID: platformID,
                },
            });

            defaultRole.id = await this.rolesRepository.getId(defaultRole);
            const userPlatformRole = new user_platform_roles();
            userPlatformRole.roleID = defaultRole.id;
            userPlatformRole.userID = userID;
            const savedUserPlatformRole = await this.userPlatformRolesRepository.save(userPlatformRole);

        }catch(error){
            console.error("failed to assigned the default role of platform "+platformID+" to user"+userID);
        }
    }

    /*
        Updates all the user attributes
    */
    async updateUser(id:number, updateUserDto: UpdateUserDto) {
        const username = updateUserDto.username;
        const email = updateUserDto.eMail;
        const profilePicture = updateUserDto.profilePicture;

        const updatedUser = await this.userRepository.update(id, {
            username: username,
            eMail: email,
            profilePicture: profilePicture,
        })
        return updatedUser;
    }



    /*
        deletes user from database
    */
    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }

    async updateProfilePic(id:number, pic: string){
        return await this.userRepository.update(id,{
            profilePicture:pic,
        })
    }

    async changeRole(changeRoleDto: ChangeRoleDto) {
        const curRole = await this.userPlatformRolesRepository.findOne({where:{userID:changeRoleDto.userID}});
        return await this.userPlatformRolesRepository.update(curRole,{
            roleID: changeRoleDto.roleID
        });
    }


    //getRole
    async getRoleOfUser(id: number){
        return await this.userPlatformRolesRepository.findOne({where:{userID: id}});
    }

    async getUserOfRole(roleID: number) {
        console.log("roleID: "+roleID)
        const userRoles =  await this.userPlatformRolesRepository.find({where:{roleID:roleID, platformID:1}});
        let users:users[] = [];
        for(const ur of userRoles){
            users.push(await this.getUserById(ur.userID))
            console.log(ur.userID)
        }
        return users;
    }
}
