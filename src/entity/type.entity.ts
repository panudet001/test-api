import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, ManyToOne} from 'typeorm';
import { users } from './users.entity';


@Entity()
export class user_type extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 255 ,name: 'name_type' })
    name_type	: string

    @Column({ name: 'last_edit_time' })
    last_edit_time	: Date

 
}