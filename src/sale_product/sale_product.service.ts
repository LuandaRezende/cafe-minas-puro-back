import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleProductEntity } from './sale_product.entity';
import { SaleProductRepository } from './sale_product.repository';

@Injectable()
export class SaleProductService {
    constructor(
        @InjectRepository(SaleProductEntity)
        private saleProductRepository: SaleProductRepository
    ) { }
}
