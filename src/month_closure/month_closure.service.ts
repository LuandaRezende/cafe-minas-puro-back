import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from 'src/payment/payment.repository';
import { SaleDto } from 'src/sale/dto/sale.dto';
import { SaleEntity } from 'src/sale/sale.entity';
import { SaleRepository } from 'src/sale/sale.repository';
import { TravelRepository } from 'src/travel/travel.repository';
import { MonthClosureEntity } from './month_closure.entity';
import { MonthClosureRepository } from './month_closure.repository';

@Injectable()
export class MonthClosureService {
    constructor(
        @InjectRepository(MonthClosureEntity)
        private monthClosureRepository: MonthClosureRepository,
        private saleRepository: SaleRepository,
        private paymentRepository: PaymentRepository,
        private travelRepository: TravelRepository
    ) { }

    async findMonthClosure(id: number, value): Promise<any> {
        const allSales = await this.saleRepository.query(`select * from sale s
        where s.id_seller = ${id} and s.date BETWEEN '${value.start}' AND '${value.end}'
        group by s.id_sale;`);

        const allDebitSeller = await this.paymentRepository.query(`select *, sum(p.amount_paid) as amount_paid from payment p
        where p.id_seller = ${id} group by p.id_sale;`)

        const allTravelExpense = await this.travelRepository.query(`select *, sum(t.total_spent) as total_spent from travel t
        where t.id_seller = ${id} group by t.id_sale;`)

        let array = [];

        for(let i = 0; i < allSales.length; i++){
            //se pagamento em vale é fiado
            if(allSales[i].form_payment === 'vale'){
                //verifica se existe algum pagamento de débito daquele vendedor
                if(allDebitSeller.length > 0){
                    for(let j = 0; j < allDebitSeller.length; j++){
                        //verifica se o if da venda é igual ao id do pagamento de debito caso for, ele subtrai no valor da total da venda
                        
                        if(allSales[i].id_sale === allDebitSeller[j].id_sale){
                                array.push({
                                    idSale: allSales[i].id_sale,
                                    date: allSales[i].date,
                                    amountPaid: allSales[i].total - allDebitSeller[j].amount_paid,
                                    inCash: allSales[i].custom_paid === 'true' ? 'Sim' : 'Não',
                                    total: allSales[i].total,
                                    totalKg: allSales[i].kg_total ? allSales[i].kg_total : '-',
                                    percentual: allSales[i].percentual ?  allSales[i].percentual : '-',
                                    comission: allSales[i].comission ?  allSales[i].comission : 0, 
                                })
                        }else{
                            //coloca no array o valor pago como 0 pois nao existe pagamento de debito referente aquela venda 
                            array.push({
                                idSale: allSales[i].id_sale,
                                date: allSales[i].date,
                                amountPaid: 0,
                                inCash: allSales[i].custom_paid === 'true' ? 'Sim' : 'Não',
                                total: allSales[i].total,
                                totalKg: allSales[i].kg_total ? allSales[i].kg_total : '-',
                                percentual: allSales[i].percentual ?  allSales[i].percentual : '-',
                                comission: allSales[i].comission ?  allSales[i].comission : 0, 
                            })
                        }

                    }
                }else{
                    array.push({
                        idSale: allSales[i].id_sale,
                        date: allSales[i].date,
                        amountPaid: 0,
                        inCash: allSales[i].custom_paid === 'true' ? 'Sim' : 'Não',
                        total: allSales[i].total,
                        totalKg: allSales[i].kg_total ? allSales[i].kg_total : '-',
                        percentual: allSales[i].percentual ?  allSales[i].percentual : '-',
                        comission: allSales[i].comission ?  allSales[i].comission : 0, 
                    })    
                }
            }else{
                //se nao é em vale é pagamento a vista
                array.push({
                    idSale: allSales[i].id_sale,
                    date: allSales[i].date,
                    amountPaid: allSales[i].total,
                    inCash: allSales[i].custom_paid === 'true' ? 'Sim' : 'Não',
                    total: allSales[i].total,
                    totalKg: allSales[i].kg_total ? allSales[i].kg_total : '-',
                    percentual: allSales[i].percentual ?  allSales[i].percentual : '-',
                    comission: allSales[i].comission ?  allSales[i].comission : 0, 
                })
            }
        }

        //obtem o gasto da viagem de cada venda
        for(let a = 0; a < array.length; a++){
            if(allTravelExpense.length > 0){
                for(let b = 0; b < allTravelExpense.length; b++){
                    if(array[a].idSale === allTravelExpense[b].id_sale){
                        array[a].spent = allTravelExpense[b].total_spent ? allTravelExpense[b].total_spent : 0;
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

