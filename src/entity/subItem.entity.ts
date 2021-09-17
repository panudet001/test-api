import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, OneToOne, ManyToOne} from 'typeorm';
import { quiz_sub } from './sub.entity';


@Entity()
export class quiz_item extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ name: 'sub_id' })
    sub_id	: number

    @Column({ name: 'title_id' })
    title_id	: number

    @Column({ length: 255 ,name: 'photo' })
    photo	: string

    @Column({ name: 'no' })
    no	: number

    @Column({ name: 'answer' })
    answer	: number


    @Column({ name: 'last_edit_time' })
    last_edit_time	: Date

 

}