import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Headers } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private readonly AnsService: AnswerService) { }


  @Get('/view/:email?')
  async editQuiz(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.AnsService.getAns(params);
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  
  @Get('/excel/:email?')
  async excelQuiz(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.AnsService.getExcel(params);
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() params) {
    const id = await this.AnsService.addAns(params);

    return {
      message: "success",
      statusCode: 200000,

    }
  }

  @Get('/get/:id/:no?')
  async getQuiz(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.AnsService.selectAns(params);
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }


}
