import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { quiz_sub } from 'src/entity/sub.entity';
import { quiz_set } from '../entity/set.entity';
import { quiz_title } from '../entity/title.entity';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Get("title/:id?") 
    async getTitle(@Param() params): Promise<quiz_title[]>{
      const id = (params.id)?params.id:0
      if(id > 0){
        return await this.quizService.selectTitle(id);
      }else{
        return await this.quizService.TitleAll();
      }
      
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
    async getSet(@Param() params): Promise<quiz_set[]>{
      const id = (params.id)?params.id:0
      if(id > 0){
        return await this.quizService.selectSet(id);
      }else{
        return await this.quizService.setAll();
      }
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
      return await this.quizService.getSetQuiz();
    }

    @Get("/view/sub/:id")
    async getsubQuiz(@Param() params: number){
      return await this.quizService.getsubQuiz(params);
    }

    @Get("/view/add/:id?")
    async getView(@Param() params: number){
      return await this.quizService.getQuiz(params);
    }



   
    @Post('/addQuiz/:id')
    @HttpCode(HttpStatus.CREATED)
    async addQuiz(@Param() params,@Body() body) {
        
        await this.quizService.addquiz(params,body);
       
    }
    
    @Get('/editQuiz/:id')
    async editQuiz(@Param() params) {
      return await this.quizService.upSup(params);
    }

    @Post('/upQuiz/:id')
    @HttpCode(HttpStatus.CREATED)
    async upQuiz(@Param() params,@Body() body) {
        
        await this.quizService.editquiz(params,body);
       
    }




}
