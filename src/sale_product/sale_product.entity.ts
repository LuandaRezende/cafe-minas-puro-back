import { ProductEntity } from 'src/product/product.entity';
import { SaleEntity } from 'src/sale/sale.entity';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sale_product' })
export class SaleProductEntity {
    @PrimaryGeneratedColumn()
    id_sale_product: Number;

    @Column({ type: 'varchar', nullable: false })
    price: String;

    @Column({ type: 'varchar', nullable: false })
    quantity: String;

    @Column({ type: 'varchar', nullable: true })
    id_sale: Number;

    @Column({ type: 'varchar', nullable: true })
    id_product: Number;

    @ManyToMany(() => SaleEntity)
    @JoinColumn([
    { name: 'id_sale', referencedColumnName: 'id_sale' },
    ])
    seller: SaleEntity;

    @ManyToMany(() => ProductEntity)
    @JoinColumn([
    { name: 'id_product', referencedColumnName: 'id_product' },
    ])
    client: ProductEntity;
}
