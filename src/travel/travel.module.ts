import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelEntity } from './travel.entity';
import { SellerRepository } from 'src/seller/seller.repository';
import { SaleRepository } from 'src/sale/sale.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TravelEntity, SellerRepository, SaleRepository])],
  providers: [TravelService],
  controllers: [TravelController]
})
export class TravelModule {}
