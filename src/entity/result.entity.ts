import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, OneToOne, ManyToOne} from 'typeorm';
import { result_item } from './resultItem.entity';


@Entity()
export class result extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ name: 'user_id' })
    user_id	: number

    @Column({ name: 'sub_id' })
    sub_id	: number

    @Column("date",{ name: 'date' })
    date	: Date

    @Column({ length: 255 ,name: 'star' })
    star	: string

    @Column({ length: 255 ,name: 'end' })
    end	: string

    @Column({ name: 'totel' })
    totel	: number

    @Column({ length: 255 ,name: 'answer' })
    answer	: string

    @Column({ length: 255 ,name: 'status' })
    status	: string


    @Column({ name: 'last_edit_time' })
    last_edit_time	: Date



 
}