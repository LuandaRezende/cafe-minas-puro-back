import { Module } from '@nestjs/common';
import { MonthClosureService } from './month_closure.service';
import { MonthClosureController } from './month_closure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthClosureEntity } from './month_closure.entity';
import { SaleRepository } from 'src/sale/sale.repository';
import { PaymentRepository } from 'src/payment/payment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MonthClosureEntity, SaleRepository, PaymentRepository])],
  providers: [MonthClosureService],
  controllers: [MonthClosureController]
})
export class MonthClosureModule {}
