import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        const listPending = await this.saleRepository.query(`select c.corporate_name, c.city, sum(total) as debit_amount, p.amount_paid, sum(total - p.amount_paid) as pendency from clients c inner join sale s on s.id_client = c.id_client inner join payment p on p.id_client = c.id_client where s.form_payment = 'vale' group by c.id_client;`);

        return listPending;
    }
}
