import { Test, TestingModule } from '@nestjs/testing';
import { StoreNameController } from './store-name.controller';
import { StoreNameService } from './store-name.service';

describe('StoreNameController', () => {
  let controller: StoreNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreNameController],
      providers: [StoreNameService],
    }).compile();

    controller = module.get<StoreNameController>(StoreNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
