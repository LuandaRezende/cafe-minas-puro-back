import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleProductDto } from 'src/sale_product/dto/sale_product.dto';
import { SaleProductRepository } from 'src/sale_product/sale_product.repository';
import { SaleDto } from './dto/sale.dto';
import { SaleEntity } from './sale.entity';
import { SaleRepository } from './sale.repository';

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(SaleEntity)
        private saleRepository: SaleRepository,
        private saleProductRepository: SaleProductRepository
    ) { }

    async createSale(dtoSale: SaleDto): Promise<any> {
        const sale = this.saleRepository.create(dtoSale);
        await this.saleRepository.save(sale);

        let saleProducts = [];

        saleProducts = dtoSale.products;

       for(let i = 0; i < saleProducts.length; i++){
         saleProducts[i].id_sale = sale.id_sale;

         const productsSold = this.saleProductRepository.create(saleProducts[i]);
         await this.saleProductRepository.save(productsSold);
       }

        return 'Venda salva com sucesso!';
    }
}
