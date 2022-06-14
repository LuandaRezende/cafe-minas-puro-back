import { EntityRepository, Repository } from 'typeorm';
import { LoadsEntity } from './loads.entity';

@EntityRepository(LoadsEntity)
export class LoadsRepository extends Repository<LoadsEntity> { }
