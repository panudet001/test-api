import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, OneToOne, ManyToOne} from 'typeorm';
import { quiz_item } from './subItem.entity';


@Entity()
export class quiz_sub extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ name: 'set_id' })
    set_id	: number

    @Column({ length: 255 ,name: 'name_sub' })
    name_sub	: string

    @Column({ name: 'time' })
    time	: number

    @Column({ name: 'number' })
    number	: number


}