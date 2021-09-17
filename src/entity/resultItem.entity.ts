import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, OneToOne, ManyToOne} from 'typeorm';
import { result } from './result.entity';


@Entity()
export class result_item extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ name: 'result_id' })
    result_id	: number

    @Column({ name: 'quiz_item_id' })
    quiz_item_id	: number

    @Column({ name: 'answer' })
    answer	: number

    @Column({ name: 'answer_start' })
    start	: number

    @Column({ name: 'last_edit_time' })
    last_edit_time	: Date

    

}