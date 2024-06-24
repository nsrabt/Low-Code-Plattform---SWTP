import { Test, TestingModule } from '@nestjs/testing';
import { UserFillingDataController } from './user_filling_data.controller';

describe('UserFillingDataController', () => {
  let controller: UserFillingDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFillingDataController],
    }).compile();

    controller = module.get<UserFillingDataController>(UserFillingDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
