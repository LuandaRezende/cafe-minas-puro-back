import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProductController } from './sale_product.controller';
import { SaleProductEntity } from './sale_product.entity';
import { SaleProductService } from './sale_product.service';

@Module({
  imports: [TypeOrmModule.forFeature([SaleProductEntity])],
  controllers: [SaleProductController],
  providers: [SaleProductService]
})
export class SaleProductModule {}
