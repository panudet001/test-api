import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { result } from '../entity/result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(result)
        private readonly resultRepository: Repository<result>,
        
        
    ) {}

    async getAns(params){
        const email = (params.email)?params.email:0
        let sql = `select result.id as id, email, title, fname,lname,nickname,birthday,age,province,school,room,name_set,name_sub,exp_date,
        date,star,end,result.answer as answer,result.status as status,quiz_sub.id as subId,totel
        from result 
        left join users on users.id = result.user_id 
        left join quiz_sub on quiz_sub.id = result.sub_id 
        left join quiz_set on quiz_set.id = quiz_sub.set_id 
        `
        if (Number(email) !== 0) {
            sql = sql + ` where email = "${email}" `
        }else{
            sql = sql + ` order by sub_id, date asc`
        } 

        //console.log(sql)

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
                subId: quiz.subId,
                sub: quiz.name_sub,
                exp : quiz.exp_date,
                today: quiz.date,
                star : quiz.star,
                end :quiz.end,
                totel :quiz.totel,
                answer:  quiz.answer, 
                start: quiz.status
            })
        })

        return {
            message: "success",
            statusCode: 200000,
            data : result
                       
        }

       


    }

    

    async getExcel (params){
        const email = (params.email)?params.email:0
        let sql = `select result.id as id, email, title, fname,lname,nickname,birthday,age,province,school,room,name_set,name_sub,exp_date,
        date,star,end,result.answer as answer,result.status as status,quiz_sub.id as subId,totel
        from result 
        left join users on users.id = result.user_id 
        left join quiz_sub on quiz_sub.id = result.sub_id 
        left join quiz_set on quiz_set.id = quiz_sub.set_id 
        `
        if (Number(email) !== 0) {
            sql = sql + ` where email = "${email}" `
        }else{
            sql = sql + ` order by sub_id, date asc`
        } 

        //console.log(sql)

        let quizs = await this.resultRepository.query(sql)
        
        let result = []
        const api = (quizs).map((quiz) => {
            result.push({ 
                อีเมล์: quiz.email,
                // วันที่สร้างฐานข้อมูลครั้งแรก: quiz.
                คำนำหน้า: quiz.title,
                ชื่อ: quiz.fname,
                นามสกุล: quiz.lname,
                ชื่อเล่น: quiz.nickname,
                วันเกิด: quiz.birthday,
                อายุ: quiz.age,
                จังหวัด: quiz.province,
                โรงเรียน: quiz.school,
                ชั้น: quiz.room,
                ชุดข้อสอบ: quiz.name_set+"/"+quiz.name_sub,
                วันหมดอายุ : quiz.exp_date,
                วันทดสอบ: quiz.date,
                เวลาเริ่มทำแบบทดสอบ : quiz.star,
                เวลากดส่งแบบทดสอบ :quiz.end,
                ข้อที่1 : this.selectStatus(quiz.status,0),
                ข้อที2 : this.selectStatus(quiz.status,1),
                ข้อที3 : this.selectStatus(quiz.status,2),
                ข้อที4 : this.selectStatus(quiz.status,3),
                ข้อที5 : this.selectStatus(quiz.status,4),
                ข้อที6 : this.selectStatus(quiz.status,5),
                ข้อที7 : this.selectStatus(quiz.status,6),
                ข้อที8 : this.selectStatus(quiz.status,7),
                ข้อที9 : this.selectStatus(quiz.status,8),
                ข้อที10 : this.selectStatus(quiz.status,9),
                ข้อที11 : this.selectStatus(quiz.status,10),
                ข้อที12 : this.selectStatus(quiz.status,11),
            })
        })

        return {
            message: "success",
            statusCode: 200000,
            data : result
                       
        }

       


    
    }

    selectStatus (data,i){
        const newData = data.split(",")
        return newData[i]

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

    async selectAns(params){
        const id = params.id
        const no = (params.no)?params.no:0
        let sql = `select result.id as id,name_set,quiz_sub.id as subId, name_sub,status, quiz_item.answer as ans,
        result.answer as quiz,photo,title_id,name_title
        from result
        left join quiz_item on quiz_item.sub_id = result.sub_id
        left join quiz_sub on quiz_sub.id = result.sub_id 
        left join quiz_set on quiz_set.id = quiz_sub.set_id 
        left join quiz_title on quiz_title.id = quiz_item.title_id
        where result.id = ${id}
        `
        if (Number(no) !== 0) {
            sql = sql + ` and title_id = ${no} `
        }else{
            sql = sql + ` order by title_id asc `
        } 


        //console.log(sql)

        let quizs = await this.resultRepository.query(sql)
        
        let result = []
        const api = (quizs).map((quiz) => {
            result.push({
                id: quiz.id,
                set: quiz.name_set,
                sub: quiz.name_sub,
                name_title : quiz.name_title,
                title: quiz.title_id,
                photo: quiz.photo,
                quiz:  quiz.quiz, 
                answer:  quiz.ans, 
            })
        })

        return {
            message: "success",
            statusCode: 200000,
            data : result
                       
        }
    }


    
}
