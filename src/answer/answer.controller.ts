import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
    constructor(private readonly AnsService: AnswerService) {}


    @Get('/view/:email?')
    async editQuiz(@Param() params) {
      return await this.AnsService.getAns(params);
    }

    @Post('/add')
    @HttpCode(HttpStatus.CREATED)
    async addUser(@Body() params) {
        const id = await this.AnsService.addAns(params);
       
      
      return "success"
    }
}
