import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerRepository } from 'src/seller/seller.repository';
import { ClientsEntity } from './clients.entity';
import { ClientsRepository } from './clients.repository';
import { ClientsDto } from './dto/clients.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientsEntity)
        private clientsRepository: ClientsRepository,
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
}
