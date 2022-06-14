import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerEntity } from 'src/seller/seller.entity';
import { SellerRepository } from 'src/seller/seller.repository';
import { LoadsDto } from './dto/loads.dto';
import { LoadsEntity } from './loads.entity';
import { LoadsRepository } from './loads.repository';

@Injectable()
export class LoadsService {

    constructor(
        @InjectRepository(LoadsEntity)
        private loadsRepository: LoadsRepository,
        private sellerRepository: SellerRepository,
    ) { }

    async createLoad(dto: LoadsDto): Promise<any> {
        const loads = this.loadsRepository.create(dto)

        await this.loadsRepository.save(loads)

        console.log('Carga cadastrado com sucesso!')

        return loads;
    }

    async findSellerById(id: number): Promise<SellerEntity> {
        const load = await this.sellerRepository.findOne(id);
        if (!load) {
            throw new NotFoundException('Carga não existe!');
        }

        return load;
    }

    async findSaleSellerById(id): Promise<LoadsEntity[]> {
        const sellerLoad = await this.loadsRepository.createQueryBuilder('Loads')
        .innerJoinAndSelect('Seller', 'seller','seller.id_seller = loads.id_seller')
        .innerJoinAndSelect('Product', 'product','product.id_product = loads.id_product')
        .select('Seller.name as name, Product.name as product, Loads.quantity, Loads.created_at')
        .where(`Seller.id_seller = ${id}`)
        .getRawMany();

        if (!sellerLoad) {
            throw new NotFoundException('Nenhum carga deste vendedor!');
        }

        return sellerLoad;
    }

    async getSellerById(id: number): Promise<any> {
        const load = await this.findSellerById(id);

        console.log('service seller', load);

        if(load){
          console.log(' Carga deste vendedor encontrada!! ');

          const loadSeller = await this.findSaleSellerById(load.id_seller);

          return loadSeller;
        }
    }

    async getAllSellerLoad(): Promise<LoadsEntity[]> {
        const allSellerLoad = await this.loadsRepository.createQueryBuilder('Loads')
        .innerJoinAndSelect('Seller', 'seller','seller.id_seller = loads.id_seller')
        .innerJoinAndSelect('Product', 'product','product.id_product = loads.id_product')
        .select('Seller.name as name, Product.name as product, Loads.quantity, Loads.created_at')
        .getRawMany();

      return allSellerLoad;   
    }

    // async getAllProducts(): Promise<ProductEntity[]> {
    //     const listProducts = await this.productRepository.find();

    //     if (listProducts.length === 0) {
    //         throw new NotFoundException({ message: 'Não tem produtos cadastrados!' })
    //     }

    //     console.log('Encontrou: ' + listProducts.length + ' produtos ');

    //     return listProducts;
    // }

    // async findById(id: number): Promise<ProductEntity> {
    //     const product = await this.productRepository.findOne(id);
    //     if (!product) {
    //         throw new NotFoundException('Produto não existe!');
    //     }
    //     return product;
    // }

    // async delete(id: number): Promise<any> {
    //     const product = await this.findById(id);
    //     await this.productRepository.delete(product);
    //     console.log(' Produto: ' + product.name + ' deletado com sucesso! ')
    //     return product;
    // }

}
