import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from 'src/payment/payment.repository';
import { SaleDto } from 'src/sale/dto/sale.dto';
import { SaleEntity } from 'src/sale/sale.entity';
import { SaleRepository } from 'src/sale/sale.repository';
import { MonthClosureEntity } from './month_closure.entity';
import { MonthClosureRepository } from './month_closure.repository';

@Injectable()
export class MonthClosureService {
    constructor(
        @InjectRepository(MonthClosureEntity)
        private monthClosureRepository: MonthClosureRepository,
        private saleRepository: SaleRepository,
        private paymentRepository: PaymentRepository

    ) { }

    async findMonthClosure(id: number, value): Promise<any> {
        const allSales = await this.saleRepository.query(`select *, sum(s.total) as inCash from sale s
        where s.id_seller = ${id} and s.date BETWEEN '${value.start}' AND '${value.end}'
        group by s.id_sale;`);

        const fiado = await this.saleRepository.query(`select s.id_seller, s.id_client, s.date, s.form_payment,
        s.id_sale, s.city, s.custom_paid, s.total, s.percentual, s.comission, p.amount_paid from sale s
        join payment p on p.id_client = s.id_client
        where s.id_seller = ${id} and s.date BETWEEN '${value.start}' AND '${value.end}' and s.form_payment = 'vale'
        group by s.id_sale;`)

        const paid = await this.paymentRepository.query(`select *, sum(p.amount_paid) as total from payment p
        where p.id_seller = ${id} group by p.id_client;`)

        let array = [];

        for(let i = 0; i < allSales.length; i++){
            let paid = 0;
            if(allSales[i].custom_paid === 'true'){
                paid = allSales[i].inCash;
            }

            array.push({
                    idSale: allSales[i].id_sale,
                    date: allSales[i].date,
                    id_client: allSales[i].id_client,
                    amountPaid: paid,
                    inCash: allSales[i].custom_paid === 'true' ? 'Sim' : 'Não',
                    total: allSales[i].total,
                    percentual: allSales[i].percentual ? allSales[i].percentual : '-',
                    comission: allSales[i].comission ? allSales[i].comission : '', 
            })
        }

        let found = null;

        if(fiado.length > 0){
            

                for(let j = 0; j < fiado.length; j++){

                    const achou = array.find(id => id.idSale === fiado[j].id_sale);
                    const index = array.findIndex(id => id.idSale === fiado[j].id_sale);


                    if(achou){
                        found = achou;
                        array.splice(index, 1)

                        for(let k = 0; k < paid.length; k++){
                            if(paid[k].id_client === found.id_client){
                                array.push({
                                    idSale: found.idSale,
                                    date: found.date,
                                    amountPaid: paid[j].total,
                                    inCash: paid[j].custom_paid === 'true' ? 'Sim' : 'Não',
                                    total: found.total,
                                    percentual: found.percentual ?  found.percentual : '-',
                                    comission: found.comission ?  found.comission : '', 
                                })
                            }
                        }                        
                    }

                }
              
        }

        return array;
    }   

    async updateSale(dto): Promise<any> {

        let array = [];

        for(let i = 0; i< dto.dataTable.length; i++){
          const value = await this.saleRepository.createQueryBuilder()
            .update('Sale')
            .set({ percentual: dto.dataTable[i].percentual, comission: dto.dataTable[i].comission  })
            .where(`id_sale = ${dto.dataTable[i].idSale}`)
            .execute();

            array.push(value)
        }
        return array;
    }
}

