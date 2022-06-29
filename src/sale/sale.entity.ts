import { ClientsEntity } from 'src/clients/clients.entity';
import { SellerEntity } from 'src/seller/seller.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sale' })
export class SaleEntity {
    @PrimaryGeneratedColumn()
    id_sale: Number;
    
    @Column({ type: 'date', nullable: false })
    date: Date;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    @Column({ type: 'varchar', length: 200, nullable: false })
    city: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    custom_paid: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    form_payment: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    percentual: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    comission: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    total: String;

    @Column({ type: 'number', nullable: true })
    id_seller: Number;

    @Column({ type: 'number', nullable: true })
    id_client: Number;
    
    @ManyToOne(() => SellerEntity)
    @JoinColumn([
    { name: 'id_seller', referencedColumnName: 'id_seller' },
    ])
    seller: SellerEntity;

    @ManyToOne(() => ClientsEntity)
    @JoinColumn([
    { name: 'id_client', referencedColumnName: 'id_client' },
    ])
    client: ClientsEntity;
}
