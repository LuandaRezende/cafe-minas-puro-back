import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerEntity } from 'src/seller/seller.entity';
import { SellerRepository } from 'src/seller/seller.repository';
import { createQueryBuilder } from 'typeorm';
import { TravelDto } from './dto/travel.dto';
import { TravelEntity } from './travel.entity';
import { TravelRepository } from './travel.repository';

@Injectable()
export class TravelService {
    constructor(
        @InjectRepository(TravelEntity)
        private travelRepository: TravelRepository,
        private sellerRepository: SellerRepository
    ) { }

    async createTravelExpense(dto: TravelDto): Promise<any> {
        const expense = this.travelRepository.create(dto);

        await this.travelRepository.save(expense);

        console.log(expense)

        console.log(' Gasto adicionado com sucesso! ');

        return expense;
    }

    async findSellerById(id: number): Promise<SellerEntity> {
        const seller = await this.sellerRepository.findOne(id);
        if (!seller) {
            throw new NotFoundException('Vendedor não existe!');
        }
        return seller;
    }

    async findSaleSellerById(id): Promise<TravelEntity[]> {
        const expense = await this.travelRepository.find({id_seller: id});

        if (!expense) {
            throw new NotFoundException('Nenhum gasto deste vendedor!');
        }

        const sellerExpense = await this.sellerRepository.createQueryBuilder('Seller')
        .innerJoinAndSelect('Travel', 'travel','travel.id_seller = Seller.id_seller').where(`Seller.id_seller = ${id}`)
        .select('Seller.name as name, gasoline, lunch, Travel.created_at, other, Seller.id_seller' )
        .getRawMany();

        return sellerExpense;
    }

    async getSellerById(id: number): Promise<any> {
        const seller = await this.findSellerById(id);
        

        console.log('service seller', seller);

        if(seller){
          console.log(' Vendedor encontrado!! ');

          const expenseSeller = await this.findSaleSellerById(seller.id_seller);

          return expenseSeller;
        }
    }

    async getAllSellerExpense(): Promise<TravelEntity[]> {
        const allSellerExpense = await this.sellerRepository.createQueryBuilder('Seller')
        .innerJoinAndSelect('Travel', 'travel','travel.id_seller = Seller.id_seller')
        .select('Seller.name as name, gasoline, lunch, Travel.created_at, other, Seller.id_seller' )
        .getRawMany();

      return allSellerExpense;   
    }
}
