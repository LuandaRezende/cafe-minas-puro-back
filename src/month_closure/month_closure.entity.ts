import { SaleEntity } from 'src/sale/sale.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SellerEntity } from '../seller/seller.entity';

@Entity({ name: 'month_closure' })
export class MonthClosureEntity {
    @PrimaryGeneratedColumn()
    id_month_closure: Number;

    @Column({ type: 'varchar', nullable: false })
    closed: String;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    @Column({ type: 'number', nullable: true })
    id_seller: Number;

    @Column({ type: 'number', nullable: true })
    id_sale: Number;

    @OneToOne(() => SellerEntity)
    @JoinColumn([
    { name: 'id_seller', referencedColumnName: 'id_seller' },
    ])
    seller: SellerEntity;

    @OneToOne(() => SaleEntity)
    @JoinColumn([
    { name: 'id_sale', referencedColumnName: 'id_sale' },
    ])
    sale: SaleEntity;
}
