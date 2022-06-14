import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SellerEntity } from '../seller/seller.entity';

@Entity({ name: 'loads' })
export class LoadsEntity {
    @PrimaryGeneratedColumn()
    id_load: Number;

    @Column({ type: 'integer', nullable: false })
    quantity: Number;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    @Column({ type: 'number', nullable: true })
    id_seller: Number;

    @Column({ type: 'number', nullable: true })
    id_product: Number;

    @ManyToOne(() => SellerEntity)
    @JoinColumn([
    { name: 'id_seller', referencedColumnName: 'id_seller' },
  ])
   seller: SellerEntity;

   @ManyToOne(() => ProductEntity)
    @JoinColumn([
    { name: 'id_product', referencedColumnName: 'id_product' },
  ])
   product: ProductEntity;
}
