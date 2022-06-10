import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'admins' })
export class AdminsEntity {
    @PrimaryGeneratedColumn()
    id_admin: Number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    name: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    email: String;

    @Column({ type: 'varchar', length: 200, nullable: false })
    password: String;

    @Column({ type: 'date', nullable: false })
    created_at: Date;
}