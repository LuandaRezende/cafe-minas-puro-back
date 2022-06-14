import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRepository } from 'src/seller/seller.repository';
import { LoadsController } from './loads.controller';
import { LoadsEntity } from './loads.entity';
import { LoadsService } from './loads.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoadsEntity, SellerRepository])],
  controllers: [LoadsController],
  providers: [LoadsService]
})
export class LoadsModule {}
