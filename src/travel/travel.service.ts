import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleRepository } from 'src/sale/sale.repository';
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
        private sellerRepository: SellerRepository,
        private saleRepository: SaleRepository
    ) { }

    async createTravelExpense(dto: TravelDto): Promise<any> {
        const idClient = dto.id_client;
        const totalSale = dto.totalSale;

        const idSale = await this.saleRepository.query(`select s.id_sale as id from sale s where id_client = ${idClient} and total = ${totalSale}`)

        const data = {
            gasoline: dto.gasoline,
            lunch: dto.lunch,
            other: dto.other,
            created_at: dto.created_at,
            id_seller: dto.id_seller,
            totalSale: dto.totalSale,
            id_client: dto.id_client,
            id_sale: idSale[0].id ? idSale[0].id : 's/ atribuicao de venda',
            total_spent: dto.total_spent,
        }

        const expense = this.travelRepository.create(data);

        await this.travelRepository.save(expense);

        return expense;
    }

    async findSellerById(id: number): Promise<SellerEntity> {
        const seller = await this.sellerRepository.findOne(id);
        if (!seller) {
            throw new NotFoundException('Vendedor não existe!');
        }
        return seller;
    }

    async findSaleSellerById(id, value): Promise<TravelEntity[]> {
        const expense = await this.travelRepository.find({id_seller: id});

        if (!expense) {
            throw new NotFoundException('Nenhum gasto deste vendedor!');
        }

        const sellerExpense = await this.sellerRepository.createQueryBuilder('Seller')
        .innerJoinAndSelect('Travel', 'travel','travel.id_seller = Seller.id_seller')
        .where(`Seller.id_seller = ${id}`)
        .andWhere(`travel.created_at BETWEEN '${value.start}' AND '${value.end}'`)
        .select('Seller.name as name, gasoline, lunch, Travel.created_at, other, Seller.id_seller' )
        .getRawMany();

        return sellerExpense;
    }

    async getSellerById(id: number, value) {
        const seller = await this.findSellerById(id);
        
        if(seller){
        //   console.log(' Vendedor encontrado!! ');

          const expenseSeller = await this.findSaleSellerById(seller.id_seller, value);

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
