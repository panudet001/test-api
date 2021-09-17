import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from '../entity/users.entity';
import { Repository } from 'typeorm';
import { user_type } from '../entity/type.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(users)
        private readonly userRepository: Repository<users>,
        @InjectRepository(user_type)
        private readonly typeRepository: Repository<user_type>,
       
      ) {}

      async userAll() {
        return await this.userRepository.find({relations: ["userType"]});
      }

      async selectUser(id){
        return await this.userRepository.find({where:{id:id},relations: ["userType"]});
      }

      async upDataUser(id,body){
        const user = await this.userRepository.findOne({ where: { id: id } });
        user.email = body.email;
        user.title = body.title;
        user.fname = body.fname;
        user.lname = body.lname;
        user.nickname = body.nickname;
        user.age = body.age;
        user.birthday = body.birthday;
        user.province = body.province;
        user.school = body.school;
        user.room = body.room;
        user.start = body.start;
        user.set_Quiz = body.set_Quiz;
        await this.userRepository.save(user);

      }

      async checkMail(data){
        const id = data.email
        const create = await this.userRepository.findOne({where: {email:id}});
        const check = (create.id)?Number(create.id):0

        return check

       

      }

      async addUsers(data) {

        const email = await this.userRepository.findOne({where: {email:data.email}})

        if(!email){
            const addUser = new users();
             addUser.title = data.title,
             addUser.fname = data.fname,
             addUser.fname = data.fname,
             addUser.lname = data.lname
             addUser.email = data.email,
             addUser.nickname = data.nickname
             addUser.age = data.age,
             addUser.birthday = data.birthday,
             addUser.province = data.province,
             addUser.school = data.school,
             addUser.room = data.room,
             addUser.exp_date = new Date(),
             addUser.start = 3,
             addUser.set_Quiz = data.set_Quiz,
             addUser.last_edit_time = new Date(),
 
            await this.userRepository.save(addUser);
            return 1
        }else{
          return 0
        }

        
 
     }

     async typeAll(): Promise<user_type[]> {
       
      return await this.typeRepository.find();
    }

    async selectType(id){
      return await this.typeRepository.find({where:{id:id}});
    }

    async addType(data) {
      const addType = new user_type();
          addType.name_type = data.name_type,
          addType.last_edit_time = new Date(),

      await this.typeRepository.save(addType);

  }

  async upType(id,data) {
   
    const addType = await this.typeRepository.findOne({ where: { id: id } });
    addType.name_type = data.name_type,
    await this.typeRepository.save(addType);

}
}
