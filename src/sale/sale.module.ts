import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleProductRepository } from 'src/sale_product/sale_product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, SaleProductRepository])],
  providers: [SaleService],
  controllers: [SaleController]
})
export class SaleModule {}
