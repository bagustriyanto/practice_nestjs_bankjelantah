import { Test, TestingModule } from '@nestjs/testing';
import { PriceTierService } from './price_tier.service';

describe('PriceTierService', () => {
  let service: PriceTierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceTierService],
    }).compile();

    service = module.get<PriceTierService>(PriceTierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
