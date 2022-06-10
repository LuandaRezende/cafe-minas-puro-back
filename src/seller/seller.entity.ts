import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'seller' })
export class SellerEntity {
    @PrimaryGeneratedColumn()
    id_seller: Number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name: String;

    @Column({ type: 'date', nullable: false })
    created_at: Date;
}
