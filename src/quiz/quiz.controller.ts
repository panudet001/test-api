import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { count } from 'console';
import { quiz_sub } from 'src/entity/sub.entity';
import { quiz_set } from '../entity/set.entity';
import { quiz_title } from '../entity/title.entity';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}


    @Get("/user/:id")
    async getsetQuiz(@Param() params){
      const data = await this.quizService.selectSetQuiz(params.id);
      return data
    }

    @Get("/check/:sub/:id")
    async getcheckQuiz(@Param() params){
      const data = await this.quizService.checkSetQuiz(params);
      return data
    }


    @Get("title/:id?") 
    async getTitle(@Param() params): Promise<quiz_title[]>{
      const id = (params.id)?params.id:0
      let data
      if(id > 0){
        data = await this.quizService.selectTitle(id);
      }else{
        data = await this.quizService.TitleAll();
      }

      return data
      
    }

    @Post('/addTitle/:id?')
    @HttpCode(HttpStatus.CREATED)
    async addUser(@Param() params,@Body() body) {
      const id = (params.id)?params.id:0
      if(id > 0){
        await this.quizService.upTitle(id,body);
        return "success"
      }else{
        await this.quizService.addTitle(body);
        return "success"
      }
    }

    @Get("/set/:id?") 
    async getSet(@Param() params){
      const id = (params.id)?params.id:0
      let data
      if(id > 0){
        data = await this.quizService.selectSet(id);
      }else{
        data = await this.quizService.setAll();
      }
      return data
    }

    @Post('/addSet/:id?')
    @HttpCode(HttpStatus.CREATED)
    async addSet(@Param() params,@Body() body) {
      const id = (params.id)?params.id:0
      if(id > 0){
        await this.quizService.upSet(id,body);
        return "success"
      }else{
        await this.quizService.addSet(body);
        return "success"
      }
    }

    
    @Get("/view/set")
    async getSetQuiz(){
      const data = await this.quizService.getSetQuiz();
      return data
    }

    @Get("/dropdownSet")
    async selectSetQuiz(){
      const data = await this.quizService.dropdownSet();
      return data
    }


    @Get("/view/sub/:id")
    async getsubQuiz(@Param() params: number){
      return await this.quizService.getsubQuiz(params);
    }

    @Get("/view/add/:id")
    async getView(@Param() params){
      const data = await this.quizService.getQuiz(params);
      return data
    }


   
    @Post('/addQuiz/:id')
    @HttpCode(HttpStatus.CREATED)
    async addQuiz(@Param() params,@Body() body) {
        
        await this.quizService.addquiz(params,body);
       
    }
    
    @Get('/editQuiz/:id')
    async editQuiz(@Param() params) {
      const data = await this.quizService.upSup(params);
      return data
    }

    @Post('/upQuiz/:id')
    @HttpCode(HttpStatus.CREATED)
    async upQuiz(@Param() params,@Body() body) {
        
        await this.quizService.editquiz(params,body);
       
    }

    @Post('ans/:id')
    @HttpCode(HttpStatus.CREATED)
    async ans(@Param() params,@Body() body) {
        
       const data = await this.quizService.ansQuiz(params,body);
       return data
       
    }




}
