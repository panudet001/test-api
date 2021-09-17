import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { result } from '../entity/result.entity';
import { Repository } from 'typeorm';
import { result_item } from '../entity/resultItem.entity';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(result)
        private readonly resultRepository: Repository<result>,
        @InjectRepository(result_item)
        private readonly itemRepository: Repository<result_item>,
        
    ) {}

    async getAns(params){
        const email = (params.email)?params.email:0
        let sql = `select result.id as id, email, title, fname,lname,nickname,birthday,age,province,school,room,name_set,name_sub,exp_date,
        date,star,end,result.answer as answer,result.status as status
        from result 
        left join users on users.id = result.user_id 
        left join quiz_sub on quiz_sub.id = result.sub_id 
        left join quiz_set on quiz_set.id = quiz_sub.set_id 
        `
        if (Number(email) !== 0) {
            sql = sql + ` where email = "${email}" `
        } 

        console.log(sql)

        let quizs = await this.resultRepository.query(sql)
        
        let result = []
        const api = (quizs).map((quiz) => {
            result.push({
                id: quiz.id,
                email: quiz.email,
                title: quiz.title,
                fname: quiz.fname,
                lname: quiz.lname,
                nickname: quiz.nickname,
                birthday: quiz.birthday,
                age: quiz.age,
                province: quiz.province,
                school: quiz.school,
                room: quiz.room,
                set: quiz.name_set,
                sub: quiz.name_sub,
                exp : quiz.exp_date,
                today: quiz.date,
                star : quiz.star,
                end :quiz.end,
                answer:  quiz.answer.split(','), 
                start: quiz.status.split(',')
            })
        })

        return result


    }

    async addAns(data){
        const addAns = new result();
        addAns.user_id = data.user_id,
        addAns.sub_id = data.sub_id,
        addAns.date = data.date,
        addAns.star = data.star,
        addAns.end = data.end,
        addAns.totel = data.totel,
        addAns.answer = data.ans,
        addAns.status = data.status,
        addAns.last_edit_time = new Date()
        

    const create = await this.resultRepository.save(addAns);
    const id = create.id
    return id
    }

    async setAnd(){
        
    }

    async addItemAns(data,id){
        const addItem = new result_item();
        addItem.result_id = id,
        addItem.quiz_item_id = data.quiz_item_id,
        addItem.answer = data.answer,
        addItem.start = data.answer_start,
        addItem.last_edit_time = new Date(),

    await this.itemRepository.save(addItem);
    }
    
}
