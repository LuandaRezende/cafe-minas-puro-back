import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id_product: Number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name: String;

    @Column({ type: 'date', nullable: false })
    created_at: Date;
}
