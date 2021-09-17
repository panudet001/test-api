import { Entity, Column, PrimaryGeneratedColumn ,OneToMany,JoinColumn, BaseEntity, OneToOne, ManyToMany, JoinTable, ManyToOne} from 'typeorm';
import { user_type } from './type.entity';


@Entity()
export class users extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ length: 20 ,name: 'title' })
    title	: string

    @Column({ length: 255 ,name: 'fname' })
    fname	: string

    @Column({ length: 255 ,name: 'lname' })
    lname	: string

    @Column({ length: 255 ,name: 'email' })
    email	: string

    @Column({ length: 255 ,name: 'nickname' })
    nickname	: string

    @Column({ length: 255 ,name: 'birthday' })
    birthday	: string
    
    @Column({ length: 2 ,name: 'age' })
    age	: string

    @Column({ length: 255 ,name: 'province' })
    province	: string

    @Column({ length: 255 ,name: 'school' })
    school	: string
    
    @Column({ length: 255 ,name: 'room' })
    room	: string

    @Column("date",{ name: 'exp_date' })
    exp_date	: Date

    @Column({ name: 'start' })
    start	: number

    @Column({ length: 255 ,name: 'set_Quiz' })
    set_Quiz	: string
  

    @Column({ name: 'last_edit_time' })
    last_edit_time	: Date


    @ManyToOne(type => user_type, userType =>userType.id)
    @JoinColumn({ name: "start", referencedColumnName:"id"})
    userType: user_type[];

    

    


}