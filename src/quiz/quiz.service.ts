import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { quiz_title } from '../entity/title.entity';
import { Repository } from 'typeorm';
import { quiz_set } from '../entity/set.entity';
import { quiz_sub } from '../entity/sub.entity';
import { quiz_item } from '../entity/subItem.entity';
import { result } from '../entity/result.entity';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(quiz_title)
        private readonly titleRepository: Repository<quiz_title>,
        @InjectRepository(quiz_set)
        private readonly setRepository: Repository<quiz_set>,
        @InjectRepository(quiz_sub)
        private readonly supRepository: Repository<quiz_sub>,
        @InjectRepository(quiz_item)
        private readonly itemSupRepository: Repository<quiz_item>,
        @InjectRepository(result)
        private readonly resultRepository: Repository<result>,
    ) { }


    async selectSetQuiz(data) {
        let sql = `select quiz_sub.id as id, name_set,name_sub,time,number 
                from quiz_sub 
                left join quiz_set on quiz_set.id = quiz_sub.set_id 
                WHERE set_id in (${data})
                `

        let quizs = await this.setRepository.query(sql)

        let result = []
        const api = (quizs).map((quiz) => {
            result.push({
                id: quiz.id,
                set: quiz.name_set,
                sub: quiz.name_sub,
                time: quiz.time,
                number: quiz.number

            })
        })

        return {
            message: "success",
            statusCode: 200000,
            data: result
        }


    }

    async checkSetQuiz(data){
        const sub = data.sub
        const userId = data.id

        const result = await this.resultRepository.count({where: {user_id:userId,sub_id:sub}})

        //const number = {"number" : result}

        return {
            message: "success",
            statusCode: 200000,
            data: result
        }
    }

    async TitleAll() {
        const result = await this.titleRepository.find();

        return {
            message: "success",
            statusCode: 200000,
            data: result
        }
    }

    async selectTitle(id) {

        return await this.titleRepository.find({ where: { id: id } });
    }

    async addTitle(data) {
        const addTitle = new quiz_title();
        addTitle.name_title = data.name_title,
            addTitle.last_edit_time = new Date(),

            await this.titleRepository.save(addTitle);
    }

    async upTitle(id, data) {
        const addType = await this.titleRepository.findOne({ where: { id: id } });
        addType.name_title = data.name_title,
            await this.titleRepository.save(addType);

    }

    async setAll() {
        const result= await this.setRepository.find();
        return {
            message: "success",
            statusCode: 200000,
            data: result
        }
    }

    async selectSet(id) {
        const result= await this.setRepository.find({ where: { id: id } });
        return {
            message: "success",
            statusCode: 200000,
            data: result
        }
    }

    async addSet(data) {
        const addSet = new quiz_set();
        addSet.name_set = data.name_set,
            addSet.last_edit_time = new Date(),

            await this.setRepository.save(addSet);

    }

    async upSet(id, data) {
        const addSet = await this.setRepository.findOne({ where: { id: id } });
        addSet.name_set = data.name_set,
            await this.setRepository.save(addSet);

    }

    async selectSup() {

    }

    async addSup(data) {
        const addSub = new quiz_sub();
        addSub.set_id = data.set_id,
            addSub.name_sub = data.name_sub,
            addSub.time = 25,
            addSub.number = 12


        const create = await this.supRepository.save(addSub);
        const id = create.id
        return id
    }





    async getSetQuiz() {
        let sql = `select name_set, count(set_id) as number, quiz_set.id 
        from quiz_set 
        left join quiz_sub on quiz_set.id = quiz_sub.set_id 
        GROUP BY name_set, quiz_set.id
        `
        let quizs = await this.setRepository.query(sql)

        let result = []
        const api = (quizs).map((quiz) => {
            result.push({
                id: quiz.id,
                title: quiz.name_set,
                Number: quiz.number

            })
        })

        return {
            message: "success",
            statusCode: 200000,
            data: result
        }

        
    }

    async dropdownSet(){
        const quizs= await this.setRepository.find();
        let result = []
        const api = (quizs).map((quiz) => {
            result.push({
                value: quiz.id,
                label: quiz.name_set,
            })
        })

        return {
            message: "success",
            statusCode: 200000,
            data: result
        }
        
    }

    async getsubQuiz(params) {
        const id = params.id
        let sql = `select name_set,name_sub,time,number,quiz_sub.id as id , quiz_set.id as setId
        from quiz_sub 
        left join quiz_set on quiz_set.id = quiz_sub.set_id 
        where set_id = ${id}
        
        `
        let quizs = await this.supRepository.query(sql)
        let result = []
        const api = (quizs).map((quiz) => {
            result.push({
                id: quiz.id,
                setID: quiz.setId,
                set: quiz.name_set,
                subName: quiz.name_sub,
                time: quiz.time,
                count: quiz.number,

            })
        })

        return {
            message: "success",
            statusCode: 200000,
            data: result
        }

    }

    async getQuiz(params) {
        //return await this.supRepository.find({relations: ["item"]});
        const id = (params.id) ? params.id : 0

        let sql = `select *
        from quiz_item 
        left join quiz_title on quiz_title.id = quiz_item.title_id
        where sub_id = ${id} order by title_id asc
        `


        let quizs = await this.supRepository.query(sql)
        let items = []
        const api = (quizs).map((quiz) => {
            items.push({
                id: quiz.title_id, 
                top: quiz.name_title,
                photo: quiz.photo,
            })
        })

        let sql2 = `select set_id,name_set, quiz_sub.id as sub_id ,name_sub,time,number
        from quiz_sub 
        left join quiz_set on quiz_set.id = quiz_sub.set_id
        where quiz_sub.id = ${id}
        `
        let quizs2 = await this.supRepository.query(sql2)
        let items2 = []
        const api2 = (quizs2).map((quiz2) => {
            items2.push({
                setId: quiz2.set_id, 
                setName: quiz2.name_set,
                itemId: quiz2.sub_id,
                itemName: quiz2.name_sub,
                time: quiz2.time,
                count : quiz2.number

            })
        })


        return {
            message: "success",
            statusCode: 200000,
            data1: items2,
            data2: items
                  
        }

    }

    async upSup(params) {
        const id = params.id
        const sub = await this.supRepository.findOne({ where: { id: id } });

        //const quizs = await this.itemSupRepository.find({ where: { sub_id: sub.id } });

        let sql = `select quiz_item.id as id, sub_id, title_id, photo, answer, name_title
        from quiz_item 
        left join quiz_title on quiz_title.id = quiz_item.title_id
        where sub_id = ${sub.id} order by title_id ASC
        `
        let quizs = await this.itemSupRepository.query(sql)
        let items = []
        const api2 = (quizs).map((quiz) => {
            items.push({
                id: quiz.id, 
                sub_id: quiz.sub_id,
                title_id: quiz.title_id,
                title_name: quiz.name_title,
                photo: quiz.photo,
                answer : quiz.answer

            })
        })

        const result = {
            name: sub.name_sub,
            quizs: items
        }

        return {
            message: "success",
            statusCode: 200000,
            data: result,
         
                  
        }

       

    }

    async addquiz(params, data) {
        const setId = params.id
        const obj = data.quiz
        const quiz = new quiz_sub();
        quiz.set_id = setId,
            quiz.name_sub = data.name_sub,
            quiz.time = data.time,
            quiz.number = data.number

        const create = await this.supRepository.save(quiz);
        const id = create.id

        obj.forEach(async (o: any) => {
            await this.addItem(o.item, id);
        })

    }

    async addItem(data, sub) {

        const addItem = new quiz_item();
        addItem.sub_id = sub,
            addItem.title_id = data.title_id,
            addItem.photo = data.photo,
            addItem.no = data.no,
            addItem.answer = data.answer,
            addItem.last_edit_time = new Date(),

            await this.itemSupRepository.save(addItem);
    }

    async editquiz(params, data) {
        const subId = params.id
        const obj = data.quiz
        const sub = await this.supRepository.findOne({ where: { id: subId } });
        sub.name_sub = data.name_sub
        await this.supRepository.save(sub);
        obj.forEach(async (o: any) => {
            await this.upItem(o.item);
        })
    }

    async upItem(data) {
        const editItem = await this.itemSupRepository.findOne({ where: { id: data.id } });
        editItem.title_id = data.title_id,
            editItem.photo = data.photo,
            editItem.no = data.no,
            editItem.answer = data.answer,
            await this.itemSupRepository.save(editItem);
    }

    async ansQuiz (params,data) {
        const ans = [1,1,1,3]
        //const ans = data.ans
        const sub = params.id

        const quiz = await this.itemSupRepository.find({ where:{sub_id:sub},order: { title_id: 'ASC' }});

        let result =""
        for(let i=0;i<quiz.length;i++){
            //result = result +
            if(ans[i] === quiz[i].answer){
                result = result + "1,"
            }else{
                result = result + "0,"
            }
        }
        const ans2 = result.split(",")
        let scroll = 0
        for(let i=0;i<ans2.length;i++){
            //result = result +
            if(Number(ans2[i]) !== 0){
                scroll = scroll + Number(ans2[i])
            }
        }

       // console.log((ans2[0])

        return {
            message: "success",
            statusCode: 200000,
            data :  [
                {
                    "Ans": result,
                    "scroll": scroll,
                   
                }
            ]
                       
        }
    }

}
