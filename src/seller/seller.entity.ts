import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TravelEntity } from '../travel/travel.entity';

@Entity({ name: 'seller' })
export class SellerEntity {
    @PrimaryGeneratedColumn()
    id_seller: Number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name: String;

    @Column({ type: 'date', nullable: false })
    created_at: Date;

    // @OneToMany(
    //     type => TravelEntity,
    //     (post: TravelEntity) => post.id_seller,
    //     { onUpdate: 'CASCADE', onDelete: 'CASCADE' },
    //   )
    //   posts: TravelEntity[];
}
