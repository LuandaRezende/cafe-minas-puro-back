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
        const valuePaid = await this.paymentRepository.query(`select *, sum(amount_paid) as valor_pago from payment p
        where p.id_seller = ${id} 
        group by p.id_client;`);

        const valueVista = await this.saleRepository.query(`select s.id_seller, s.id_client, s.date, s.form_payment,
        s.id_sale, s.city, s.custom_paid, s.total, s.percentual, s.comission, p.amount_paid from sale s
        join payment p on p.id_client = s.id_client
        where s.id_seller = ${id} and s.date BETWEEN '${value.start}' AND '${value.end}' and s.form_payment <> 'vale'
        group by s.id_sale;`);
        
        let array = [];

        for(let i = 0; i < valuePaid.length; i++){
            for(let j = 0; j < valueVista.length; j++){
                    if(valuePaid[i].id_client !== valueVista[j].id_client){
                        array.push({
                            idSale: valueVista[j].id_sale,
                            amountPaid: valuePaid[i].valor_pago,
                            date: valueVista[j].date,
                            inCash: valueVista[j].amount_paid,
                            total: valueVista[j].total,
                            percentual: valueVista[j].percentual ? valueVista[j].percentual : '-',
                            comission: valueVista[j].comission ? valueVista[j].comission : '', 
                        })
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

