import { Injectable, NotFoundException } from '@nestjs/common';
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

        // console.log('Produto cadastrado com sucesso!')

        return product;
    }

    async getAllProducts(): Promise<ProductEntity[]> {
        const listProducts = await this.productRepository.find();

        // if (listProducts.length === 0) {
        //     throw new NotFoundException({ message: 'Não tem produtos cadastrados!' })
        // }

        // console.log('Encontrou: ' + listProducts.length + ' produtos ');

        return listProducts;
    }

    async findById(id: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException('Produto não existe!');
        }
        return product;
    }

    async delete(id: number): Promise<any> {
        const product = await this.findById(id);
        await this.productRepository.delete(product);
        console.log(' Produto: ' + product.name + ' deletado com sucesso! ')
        return product;
    }

}
