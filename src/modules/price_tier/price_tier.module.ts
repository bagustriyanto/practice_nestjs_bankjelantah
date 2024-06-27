import { Module } from "@nestjs/common";
import { PriceTierService } from "./price_tier.service";
import { PriceTierController } from "./price_tier.controller";
import { pricerTierProvider } from "./price_tier.provider";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [PriceTierController],
  providers: [PriceTierService, ...pricerTierProvider],
  exports: [...pricerTierProvider],
})
export class PriceTierModule {}
