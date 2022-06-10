import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { SellerEntity } from './seller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity])],
  providers: [SellerService],
  controllers: [SellerController]
})
export class SellerModule { }
