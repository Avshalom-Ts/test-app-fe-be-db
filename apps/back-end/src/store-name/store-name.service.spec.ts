import { Test, TestingModule } from '@nestjs/testing';
import { StoreNameService } from './store-name.service';

describe('StoreNameService', () => {
  let service: StoreNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreNameService],
    }).compile();

    service = module.get<StoreNameService>(StoreNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
