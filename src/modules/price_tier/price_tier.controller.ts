import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceTierService } from './price_tier.service';
import { CreatePriceTierDto } from './dto/create-price_tier.dto';
import { UpdatePriceTierDto } from './dto/update-price_tier.dto';

@Controller('price-tier')
export class PriceTierController {
  constructor(private readonly priceTierService: PriceTierService) {}

  @Post()
  create(@Body() createPriceTierDto: CreatePriceTierDto) {
    return this.priceTierService.create(createPriceTierDto);
  }

  @Get()
  findAll() {
    return this.priceTierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceTierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceTierDto: UpdatePriceTierDto) {
    return this.priceTierService.update(+id, updatePriceTierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceTierService.remove(+id);
  }
}
