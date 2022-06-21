import { EntityRepository, Repository } from "typeorm";
import { SaleProductEntity } from "./sale_product.entity";

@EntityRepository(SaleProductEntity)
export class SaleProductRepository extends Repository<SaleProductEntity>{ }