import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { user } from '../database/user';
import {filling_data} from "../database/filling_data";
import {platform} from "../database/platform";
import {process} from "../database/process";
import {roles} from "../database/roles";
import {step} from "../database/step";
import {step_fields} from "../database/step_fields";
import {user_filling_data} from "../database/user-filling-data";
import {user_platform} from "../database/user-platform";
import {user_platform_roles} from "../database/user-platform-roles";
import {user_process} from "../database/user_process";
import {user_process_step} from "../database/user_process_step";

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
          entities: [filling_data,platform,process,roles,step,step_fields,user,user_filling_data,user_platform,user_platform_roles, user_process,user_process_step],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([user,user_platform,user_platform_roles]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should insert a new user into the database', async () => {
    const username = 'chrastlet';
    const eMail = 'luca@example.com';

    const isInserted = await service.addUser(username, eMail, "", 1);
    expect(isInserted).toBe(true);

    const users = await service.findAll();
    //expect(users).toHaveLength(1);
    expect(users[0].username).toBe(username);

    expect(users[0].eMail).toBe(eMail);
  });
})