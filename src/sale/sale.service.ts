import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsRepository } from 'src/clients/clients.repository';
import { ProductRepository } from 'src/product/product.repository';
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
        private productRepository: ProductRepository,
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

    async getAllSalesMade(){
        const listAllSalesMade = await this.saleRepository.query('select c.corporate_name, sv.name, sv.id_seller, c.id_client, s.id_sale, total from sale s join clients c on c.id_client = s.id_client join seller sv on sv.id_seller = s.id_seller;')

        return listAllSalesMade;
    }

    async getSalesMadeBySeller(id: number){
        const listSalesMadeBySeller = await this.saleRepository.query(`select c.corporate_name, sv.name, sum(s.total) as total, s.id_sale, c.id_client, sv.id_seller from sale s join clients c on c.id_client = s.id_client join seller sv on sv.id_seller = s.id_seller where sv.id_seller = ${id} group by s.id_client;`)

        return listSalesMadeBySeller;
    }

    async getProductsSaleModal(idClient: number, idSeller: number){

        let listAllProducts = await this.saleRepository.query(`select s.id_seller, s.id_sale, s.id_client, sp.id_product, s.date, s.city, sp.quantity, sp.price, p.name from sale s
        join sale_product sp on sp.id_sale = s.id_sale
        join product p on p.id_product = sp.id_product
        where s.id_seller = ${idSeller} and s.id_client = ${idClient};`)

        listAllProducts = listAllProducts.reduce(function(results, id) {
            (results[id.id_sale] = results[id.id_sale] || []).push(id);
            return results;
        }, {})

        return listAllProducts;
    }

    async deleteSale(id: number): Promise<any> {
        //deleta a venda e todos produtos relacionados a essa venda tabela

        const sale = await this.saleRepository.findOne(id);
        const saleProduct = await this.saleProductRepository.findOne(id);

        const saleDeleted = await this.saleRepository.delete(sale);
        await this.saleProductRepository.delete(saleProduct);

        return saleDeleted;
    }
}
