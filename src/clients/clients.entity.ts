import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SellerEntity } from '../seller/seller.entity';

@Entity({ name: 'clients' })
export class ClientsEntity {
    @PrimaryGeneratedColumn()
    id_client: Number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    corporate_name: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    fantasy_name: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    phone: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    email: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    cnpj: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    responsibleName: String;
    
    @Column({ type: 'varchar', length: 200, nullable: false })
    publicPlace: String;

    @Column({ type: 'integer', nullable: false })
    number: Number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    district: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    last_sale: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    city: String;

    @Column({ type: 'date', nullable: false })
    created_at: Date;
}
