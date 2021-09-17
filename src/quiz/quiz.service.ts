import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { quiz_title } from '../entity/title.entity';
import { Repository } from 'typeorm';
import { quiz_set } from '../entity/set.entity';
import { quiz_sub } from '../entity/sub.entity';
import { quiz_item } from '../entity/subItem.entity';

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
    ) {}

    async TitleAll() {
        return await this.titleRepository.find();
    }

    async selectTitle(id) {
        
        return await this.titleRepository.find({where:{id:id}});
    }

    async addTitle(data){
        const addTitle = new quiz_title();
        addTitle.name_title = data.name_title,
        addTitle.last_edit_time = new Date(),

    await this.titleRepository.save(addTitle);
    }

    async upTitle(id,data){
        const addType = await this.titleRepository.findOne({ where: { id: id } });
        addType.name_title = data.name_title,
        await this.titleRepository.save(addType);

    }

    async setAll() {
        return await this.setRepository.find();
    }

    async selectSet(id){
        return await this.setRepository.find({where:{id:id}});
    }

    async addSet(data){
        const addSet = new quiz_set();
        addSet.name_set = data.name_set,
        addSet.last_edit_time = new Date(),

    await this.setRepository.save(addSet);
    
    }

    async upSet(id,data){
        const addSet = await this.setRepository.findOne({ where: { id: id } });
        addSet.name_set = data.name_set,
        await this.setRepository.save(addSet);

    }

    async selectSup(){

    }

    async addSup(data){
        const addSub = new quiz_sub();
        addSub.set_id = data.set_id,
        addSub.name_sub = data.name_sub,
        addSub.time = 25,
        addSub.number = 12


        const create = await this.supRepository.save(addSub);
        const id = create.id
        return id
    }

   
    async getSetQuiz(){
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

        return result
    }

    async getsubQuiz(params){
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
                time:quiz.time,
                count: quiz.number, 

            })
        })

        return result

    }

    async getQuiz(params){
        //return await this.supRepository.find({relations: ["item"]});
        const id = (params.id)? params.id : 0

        let sql = `select *
        from quiz_sub 
        left join quiz_item on quiz_item.sub_id = quiz_sub.id
        left join quiz_set on quiz_set.id = quiz_sub.set_id
        left join quiz_title on quiz_title.id = quiz_item.title_id
       
        `
        

        let quizs = await this.supRepository.query(sql)
        let result = []
        const api = (quizs).map((quiz) => {
            result.push({
                title: quiz.name_set,
                titleSub: quiz.name_sub,
                time: 25,
                count: 12,
                no:quiz.no,
                topId: quiz.title_id,
                top: quiz.name_title,
                photo: quiz.photo,
                

               

            })
        })

        return result


    }

    async upSup(params){
        const id = params.id
        const sub = await this.supRepository.findOne({where:{id:id}});
        
        const quizs = await this.itemSupRepository.find({where:{sub_id:sub.id}});

        const result = {
            name : sub.name_sub,
            quizs : quizs
        }

        return result;

    }

    async addquiz(params,data){
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
        await this.addItem(o.item,id);
    })
   
    }

    async addItem(data,sub){
        
        const addItem = new quiz_item();
        addItem.sub_id = sub,
        addItem.title_id = data.title_id,
        addItem.photo = data.photo,
        addItem.no = data.no,
        addItem.answer = data.answer,
        addItem.last_edit_time = new Date(),

    await this.itemSupRepository.save(addItem);
    }

    async editquiz (params,data){
        const subId = params.id
        const obj = data.quiz
        const sub = await this.supRepository.findOne({ where: { id: subId } });
        sub.name_sub = data.name_sub
        await this.supRepository.save(sub);
        obj.forEach(async (o: any) => {
            await this.upItem(o.item);
        })
    }

    async upItem(data){
        const editItem = await this.itemSupRepository.findOne({ where: { id: data.id } });
        editItem.title_id = data.title_id,
        editItem.photo = data.photo,
        editItem.no = data.no,
        editItem.answer = data.answer,
    await this.itemSupRepository.save(editItem);
    }

}
