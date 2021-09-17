import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, OneToOne} from 'typeorm';


@Entity()
export class quiz_set extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 255 ,name: 'name_set' })
    name_set	: string

    @Column({ name: 'last_edit_time' })
    last_edit_time	: Date

}