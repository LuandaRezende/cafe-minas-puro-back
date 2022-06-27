import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleProductRepository } from 'src/sale_product/sale_product.repository';
import { ClientsRepository } from 'src/clients/clients.repository';
import { ProductRepository } from 'src/product/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, SaleProductRepository, ClientsRepository, ProductRepository])],
  providers: [SaleService],
  controllers: [SaleController]
})
export class SaleModule {}
