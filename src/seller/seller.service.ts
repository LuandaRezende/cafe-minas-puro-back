import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerDto } from './dto/seller.dto';
import { SellerEntity } from './seller.entity';
import { SellerRepository } from './seller.repository';

@Injectable()
export class SellerService {
    constructor(
        @InjectRepository(SellerEntity)
        private sellerRepository: SellerRepository
    ) { }

    async create(dto: SellerDto): Promise<any> {
        const seller = this.sellerRepository.create(dto);

        await this.sellerRepository.save(seller);

        console.log(' Vendedor ' + seller.name + ' criado! ');

        return seller;
    }

    async getAllSellers(): Promise<SellerEntity[]> {
        const listSellers = await this.sellerRepository.find();

        if (listSellers.length === 0) {
            throw new NotFoundException({ message: 'Não tem vendedores cadastrados!' })
        }

        console.log('Encontrou: ' + listSellers.length + ' vendedores ');

        return listSellers;
    }

    async findById(id: number): Promise<SellerEntity> {
        const product = await this.sellerRepository.findOne(id);
        if (!product) {
            throw new NotFoundException('Vendedor não existe!');
        }
        return product;
    }

    async delete(id: number): Promise<any> {
        const seller = await this.findById(id);
        await this.sellerRepository.delete(seller);
        console.log(' Vendedor: ' + seller.name + ' deletado com sucesso! ')
        return seller;
    }
}
