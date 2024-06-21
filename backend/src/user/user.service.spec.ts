import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { users } from '../database/users';
import {filling_data} from "../database/filling_data";
import {platform} from "../database/platform";
import {process} from "../database/process";
import {roles} from "../database/roles";
import {step} from "../database/step";
import {step_fields} from "../database/step_fields";
import {user_fillingdata} from "../database/user-fillingdata";
import {user_platform} from "../database/user-platform";
import {user_platform_roles} from "../database/user-platform-roles";
import {user_process} from "../database/user_process";
import {user_process_step} from "../database/user_process_step";
import {AddUserDto} from "./dto/add-user-dto";


describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'passwort',
          database: 'LowCode',
          entities: [filling_data,platform,process,roles,step,step_fields,users,user_fillingdata,user_platform,user_platform_roles, user_process,user_process_step],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([users,user_platform,user_platform_roles,roles]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should insert a new user into the database', async () => {

    let addUserDto = new AddUserDto();
    addUserDto.eMail= 'usernew4@example.com';
    addUserDto.username = 'usernew4';
    const isInserted = await service.addUser(addUserDto);


    //expect(users).toHaveLength(1);
    expect(users[0].username).toBe('hans alda');

    expect(users[0].eMail).toBe('hans@example.com');


  });
})