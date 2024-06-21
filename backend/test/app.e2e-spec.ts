import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {AppService} from "../src/app.service";
import {Repository} from "typeorm";
import {user} from "../src/database/users";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let service: AppService;
  let repository: Repository<user>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
