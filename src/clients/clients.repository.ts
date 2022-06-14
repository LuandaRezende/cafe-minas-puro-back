import { EntityRepository, Repository } from 'typeorm';
import { ClientsEntity } from './clients.entity';

@EntityRepository(ClientsEntity)
export class ClientsRepository extends Repository<ClientsEntity> { }
