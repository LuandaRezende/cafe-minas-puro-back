import { EntityRepository, Repository } from 'typeorm';
import { TravelEntity } from './travel.entity';

@EntityRepository(TravelEntity)
export class TravelRepository extends Repository<TravelEntity> { }
