import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsRepository } from 'src/clients/clients.repository';
import { PaymentRepository } from 'src/payment/payment.repository';
import { ProductRepository } from 'src/product/product.repository';
import { SaleProductDto } from 'src/sale_product/dto/sale_product.dto';
import { SaleProductRepository } from 'src/sale_product/sale_product.repository';
import { SellerRepository } from 'src/seller/seller.repository';
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
        private sellerRepository: SellerRepository,
        private clientsRepository: ClientsRepository,
        private paymentRepository: PaymentRepository
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

    async getTotalSale(){
        const today = new Date();
        const date = new Date(new Date().setDate(today.getDate() - 15));

        const dayStart = date.getDate();   
        const monthStart = date.getMonth() + 1;
        const yearStart = date.getFullYear();
        const startPeriod = yearStart + '-' + monthStart + '-' + dayStart; 

        const dayEnd = today.getDate();   
        const monthEnd = today.getMonth() + 1;
        const yearEnd = today.getFullYear();
        const endPeriod = yearEnd + '-' + monthEnd +'-' + dayEnd; 

        const allTotalSales = await this.saleRepository.query(`select s.total, s.id_sale from sale s where s.date BETWEEN '${startPeriod}' AND '${endPeriod}';`)

        return allTotalSales;
    }

    async getDataDashboard(idSeller: number, value){
        
        //total gasto no dia
        const graphOne = await this.sellerRepository.query(`select *, sum(t.gasoline) as totalGasoline, sum(t.lunch) as totalTravel, sum(t.other) as totalOther,
        sum(t.gasoline)+ sum(t.lunch)+ sum(t.other) as totalGasto from seller s
            join travel t on t.id_seller = s.id_seller where s.id_seller = 2
            and t.created_at BETWEEN '${value.start}' AND '${value.end}'`);


        //entradas recebidas
        const graphTwo = []
        const diffVale = await this.saleRepository.query(`select *, sum(p.amount_paid) as totalVista from payment p where 
        p.id_seller = ${idSeller} and p.date BETWEEN '${value.start}' AND '${value.end}' 
        and p.form_payment <> 'vale';`)
        const equalVale = await this.saleRepository.query(`select *, sum(p.amount_paid) as totalVale from payment p where 
        p.id_seller = ${idSeller} and p.date BETWEEN '${value.start}' AND '${value.end}'
         and p.form_payment = 'vale';`)
        const dataGraphTwo = {
            vista: diffVale[0].totalVista,
            vale: equalVale[0].totalVale,
            total: Number(diffVale[0].totalVista) + Number(equalVale[0].totalVale)
        }
        graphTwo.push(dataGraphTwo)


        //entradas realizadas
        const graphThree = [];
        const diffValeSale = await this.paymentRepository.query(`select *, sum(s.total) as totalSaleVista from sale s 
        where s.id_seller = ${idSeller} and s.date BETWEEN '${value.start}' AND '${value.end}' 
        and s.form_payment <> 'vale';`)
        const equalValeSale = await this.paymentRepository.query(`select *, sum(s.total) as totalVale from sale s 
        where s.id_seller = ${idSeller} and s.date BETWEEN '${value.start}' AND '${value.end}' 
        and s.form_payment = 'vale';`)
        const dataGraphThree = {
            vista: diffValeSale[0].totalSaleVista,
            vale: equalValeSale[0].totalVale,
            total: Number(diffValeSale[0].totalSaleVista) + Number(equalValeSale[0].totalVale)
        }
        graphThree.push(dataGraphThree)

        //quantidade de vendas
        const dataGraphFour = await this.saleRepository.query(`select count(s.id_seller) as quantitySale from sale s
        where s.id_seller = ${idSeller} and s.date BETWEEN '${value.start}' AND '${value.end}'`);

        //total de vendas realizadas
        const dataGraphFive = await this.saleRepository.query(`select *, sum(total) as totalSum from sale s
        where s.id_seller = ${idSeller}
        and s.date BETWEEN '${value.start}' AND '${value.end}'
        group by s.form_payment;`);

        let totalGraphFive = 0;

        let dataGraphFiveTreatment = [];

        for(let i = 0; i < dataGraphFive.length; i++){

            dataGraphFiveTreatment.push({
                name: dataGraphFive[i].form_payment,
                data: [Number(dataGraphFive[i].total)]
            })

            totalGraphFive = Number(totalGraphFive) + Number(dataGraphFive[i].total);
        }

        dataGraphFiveTreatment.push({name: 'total', data: [totalGraphFive]})

        return {graphOne, graphTwo, graphThree, dataGraphFour, dataGraphFiveTreatment, totalLastGraph: totalGraphFive};
    }

    async getAllSalesMade(){
        const listAllSalesMade = await this.saleRepository.query('select c.corporate_name, sv.name, sv.id_seller, c.id_client, s.id_sale, total from sale s join clients c on c.id_client = s.id_client join seller sv on sv.id_seller = s.id_seller;')

        return listAllSalesMade;
    }

    async getSalesMadeBySeller(id: number, value){
        const listSalesMadeBySeller = await this.saleRepository.query(`select c.corporate_name, sv.name, s.date, sum(s.total) as total, s.id_sale, c.id_client, sv.id_seller from 
        sale s join clients c on c.id_client = s.id_client join seller sv on sv.id_seller = s.id_seller
        where sv.id_seller = ${id} and s.date BETWEEN '${value.start}' AND '${value.end}'`);

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
