import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleRepository } from 'src/sale/sale.repository';
import { PaymentController } from './payment.controller';
import { PaymentEntity } from './payment.entity';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, SaleRepository])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
