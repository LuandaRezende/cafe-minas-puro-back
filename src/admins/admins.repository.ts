import { EntityRepository, Repository } from "typeorm";
import { AdminsEntity } from "./admins.entity";

@EntityRepository(AdminsEntity)
export class AdminRepository extends Repository<AdminsEntity>{ }