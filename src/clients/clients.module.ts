import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from 'src/payment/payment.repository';
import { SaleRepository } from 'src/sale/sale.repository';
import { SellerRepository } from 'src/seller/seller.repository';
import { ClientsController } from './clients.controller';
import { ClientsEntity } from './clients.entity';
import { ClientsService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientsEntity, SaleRepository, PaymentRepository])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
