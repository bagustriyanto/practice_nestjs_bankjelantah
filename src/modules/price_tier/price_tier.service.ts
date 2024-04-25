import { Injectable } from '@nestjs/common';
import { CreatePriceTierDto } from './dto/create-price_tier.dto';
import { UpdatePriceTierDto } from './dto/update-price_tier.dto';

@Injectable()
export class PriceTierService {
  create(createPriceTierDto: CreatePriceTierDto) {
    return 'This action adds a new priceTier';
  }

  findAll() {
    return `This action returns all priceTier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} priceTier`;
  }

  update(id: number, updatePriceTierDto: UpdatePriceTierDto) {
    return `This action updates a #${id} priceTier`;
  }

  remove(id: number) {
    return `This action removes a #${id} priceTier`;
  }
}
