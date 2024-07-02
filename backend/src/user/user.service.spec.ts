import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { users } from '../database/user & execution/users';
import {filling_data} from "../database/user & execution/filling_data";
import {platform} from "../database/platform_management/platform";
import {process} from "../database/workflow/process";
import {roles} from "../database/workflow/roles";
import {step} from "../database/workflow/step";
import {fields} from "../database/workflow/fields";
import {user_fillingdata} from "../database/user & execution/user-fillingdata";
import {user_platform} from "../database/user & execution/user-platform";
import {user_platform_roles} from "../database/user & execution/user-roles";
import {user_process} from "../database/user & execution/user_process";
import {user_step} from "../database/user & execution/user_step";
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
          entities: [filling_data,platform,process,roles,step,fields,users,user_fillingdata,user_platform,user_platform_roles, user_process,user_step],
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