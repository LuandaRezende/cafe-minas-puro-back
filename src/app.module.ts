import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { AdminsModule } from './admins/admins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsEntity } from './admins/admins.entity';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/product.entity';
import { SellerModule } from './seller/seller.module';
import { SellerEntity } from './seller/seller.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [
          AdminsEntity,
          ProductEntity,
          SellerEntity
        ],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),

    AdminsModule,

    ProductModule,

    SellerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
