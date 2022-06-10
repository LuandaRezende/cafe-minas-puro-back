import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminsEntity } from './admins.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsEntity])],
  providers: [AdminsService],
  controllers: [AdminsController]
})
export class AdminsModule { }
