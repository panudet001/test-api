import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, OneToOne} from 'typeorm';


@Entity()
export class quiz_title extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 255 ,name: 'name_title' })
    name_title	: string

    @Column({ name: 'last_edit_time' })
    last_edit_time	: Date

}