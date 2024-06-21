import { Test, TestingModule } from '@nestjs/testing';
import { FillingDataService } from './filling_data.service';

describe('FillingDataService', () => {
  let service: FillingDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FillingDataService],
    }).compile();

    service = module.get<FillingDataService>(FillingDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
