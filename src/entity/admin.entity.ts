import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, OneToOne} from 'typeorm';


@Entity()
export class admin extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 255 ,name: 'email' })
    email	: string

    @Column({ name: 'last_edit_time' })
    last_edit_time	: Date

}