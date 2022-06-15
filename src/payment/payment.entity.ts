import { ClientsEntity } from 'src/clients/clients.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SellerEntity } from '../seller/seller.entity';

@Entity({ name: 'payment' })
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id_debit_payment: Number;

    @Column({ type: 'varchar', nullable: false })
    amount_paid: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    form_payment: String;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    @Column({ type: 'date', nullable: false })
    date: Date;

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
