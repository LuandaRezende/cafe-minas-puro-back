import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleRepository } from 'src/sale/sale.repository';
import { SellerRepository } from 'src/seller/seller.repository';
import { ClientsController } from './clients.controller';
import { ClientsEntity } from './clients.entity';
import { ClientsService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientsEntity, SaleRepository])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
