import { PriceTier } from "./entities/price_tier.entity";

export const pricerTierProvider = [
  {
    provide: "PRICE_TIER_REPOSITORY",
    useValue: PriceTier,
  },
];
