import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: ProductRepository
    ) { }

    async create(dto: ProductDto): Promise<any> {
        const product = this.productRepository.create(dto)

        await this.productRepository.save(product)

        return product;
    }

}
