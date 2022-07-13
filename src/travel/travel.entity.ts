import { ClientsEntity } from 'src/clients/clients.entity';
import { SaleEntity } from 'src/sale/sale.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SellerEntity } from '../seller/seller.entity';

@Entity({ name: 'travel' })
export class TravelEntity {
    @PrimaryGeneratedColumn()
    id_travel_expense: Number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    gasoline: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    lunch: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    other: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    total_spent: String;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    @Column({ type: 'number', nullable: true })
    id_sale: Number;

    @ManyToOne(() => SaleEntity)
    @JoinColumn([
    { name: 'id_sale', referencedColumnName: 'id_sale' },
    ])

    @Column({ type: 'number', nullable: true })
    id_seller: Number;

    @ManyToOne(() => SellerEntity)
    @JoinColumn([
    { name: 'id_seller', referencedColumnName: 'id_seller' },
  ])
   seller: SellerEntity;
}
