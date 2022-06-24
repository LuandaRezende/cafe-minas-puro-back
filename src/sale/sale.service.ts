import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsRepository } from 'src/clients/clients.repository';
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
        private saleProductRepository: SaleProductRepository,
        private clientsRepository: ClientsRepository
    ) { }

    async createSale(dtoSale: SaleDto): Promise<any> {

        const updateLastSaleClient = await this.clientsRepository.createQueryBuilder()
        .update('Clients')
        .set({ last_sale: dtoSale.date  })
        .where(`id_client= ${dtoSale.id_client}`)
        .execute();

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

    async getHistorySale(){
        const listHistorySale = await this.saleRepository.query('select c.corporate_name, c.city, s.total, c.corporate_name, count(p.id_product) as quantidade_produto, c.id_client, concat(group_concat(p.name)) as product_name, s.date from sale s inner join sale_product sp on s.id_sale = sp.id_sale inner join clients c on c.id_client = s.id_client inner join product p on p.id_product = sp.id_product group by c.id_client, s.date;')

        return listHistorySale;
    }
}
