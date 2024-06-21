import { Test, TestingModule } from '@nestjs/testing';
import { FillingDataController } from './filling_data.controller';

describe('FillingDataController', () => {
  let controller: FillingDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FillingDataController],
    }).compile();

    controller = module.get<FillingDataController>(FillingDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
