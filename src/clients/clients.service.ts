import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from 'src/payment/payment.repository';
import { SaleRepository } from 'src/sale/sale.repository';
import { SellerRepository } from 'src/seller/seller.repository';
import { ClientsEntity } from './clients.entity';
import { ClientsRepository } from './clients.repository';
import { ClientsDto } from './dto/clients.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientsEntity)
        private clientsRepository: ClientsRepository,
        private saleRepository: SaleRepository,
        private paymentRepository: PaymentRepository,
    ) { }

    async createClient(dto: ClientsDto): Promise<any> {
        const client = this.clientsRepository.create(dto);

        await this.clientsRepository.save(client);

        console.log(client)

        console.log(' Cliente adicionado com sucesso! ');

        return client;
    }

    async getAll(): Promise<ClientsEntity[]> {
        const listClients = await this.clientsRepository.find();

        if (listClients.length === 0) {
            throw new NotFoundException({ message: 'Lista vazia' })
        }

        return listClients;
    }

    async getPendingCustomer(){
        const debit = await this.saleRepository.query(`select c.corporate_name, s.id_client, s.city, sum(total) as debit from sale s join clients c on c.id_client = s.id_client where s.form_payment = 'vale' group by s.id_client;`);

        const paid = await this.paymentRepository.query(`select *, sum(amount_paid) as paid from payment group by id_client;`);

        let listPending = [];

        if(debit.length > 0)
        for(let i = 0; i < debit.length; i++){
            if(paid.length > 0){
                for(let j = 0; j < paid.length; j++){
                    if(debit[i].id_client === paid[j].id_client){
                        if(paid[j].paid - debit[i].debit < 0){
                            listPending.push({
                                corporate_name: debit[i].corporate_name, 
                                city:debit[i].city,
                                debit_amount: debit[i].debit,
                                amount_paid:paid[j].paid,
                                pendency: paid[j].paid - debit[i].debit,
                                id_client: debit[i].id_client,
                            })
                        }
                    }
                }
            }
        }

        return listPending;
    }
}
