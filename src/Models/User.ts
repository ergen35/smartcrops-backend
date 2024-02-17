import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName: string;

    @Column({ type: 'timestamp with time zone' })
    birthDate: Date
}