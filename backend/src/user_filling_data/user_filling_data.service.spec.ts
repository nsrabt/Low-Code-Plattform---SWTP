import { Test, TestingModule } from '@nestjs/testing';
import { UserFillingDataService } from './user_filling_data.service';

describe('UserFillingDataService', () => {
  let service: UserFillingDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFillingDataService],
    }).compile();

    service = module.get<UserFillingDataService>(UserFillingDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
