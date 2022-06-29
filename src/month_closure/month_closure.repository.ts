import { EntityRepository, Repository } from "typeorm";
import { MonthClosureEntity } from "./month_closure.entity";

@EntityRepository(MonthClosureEntity)
export class MonthClosureRepository extends Repository<MonthClosureEntity>{ }