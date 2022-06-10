import { EntityRepository, Repository } from 'typeorm';
import { SellerEntity } from './seller.entity';

@EntityRepository(SellerEntity)
export class SellerRepository extends Repository<SellerEntity> { }
