import { Injectable } from '@nestjs/common';
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

        await this.sellerRepository.save(seller)

        return seller;
    }
}
