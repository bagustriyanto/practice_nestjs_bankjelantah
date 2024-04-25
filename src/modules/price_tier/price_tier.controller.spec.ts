import { Test, TestingModule } from '@nestjs/testing';
import { PriceTierController } from './price_tier.controller';
import { PriceTierService } from './price_tier.service';

describe('PriceTierController', () => {
  let controller: PriceTierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceTierController],
      providers: [PriceTierService],
    }).compile();

    controller = module.get<PriceTierController>(PriceTierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
