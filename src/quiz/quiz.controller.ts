import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Headers } from '@nestjs/common';
import { count } from 'console';
import { quiz_sub } from 'src/entity/sub.entity';
import { quiz_set } from '../entity/set.entity';
import { quiz_title } from '../entity/title.entity';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }


  @Get("/user/:id")
  async getsetQuiz(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.quizService.selectSetQuiz(params.id);
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  @Get("/check/:sub/:id")
  async getcheckQuiz(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.quizService.checkSetQuiz(params);
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }


  @Get("title/:id?")
  async getTitle(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const id = (params.id) ? params.id : 0
      let data
      if (id > 0) {
        data = await this.quizService.selectTitle(id);
      } else {
        data = await this.quizService.TitleAll();
      }

      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  @Post('/addTitle/:id?')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Headers() header, @Param() params, @Body() body) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const id = (params.id) ? params.id : 0
      if (id > 0) {
        await this.quizService.upTitle(id, body);
        return {
          message: "success",
          statusCode: 200000,

        }
      } else {
        await this.quizService.addTitle(body);
        return {
          message: "success",
          statusCode: 200000,

        }
      }
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  @Get("/set/:id?")
  async getSet(@Param() params) {
    const id = (params.id) ? params.id : 0
    let data
    if (id > 0) {
      data = await this.quizService.selectSet(id);
    } else {
      data = await this.quizService.setAll();
    }
    return data
  }

  @Post('/addSet/:id?')
  @HttpCode(HttpStatus.CREATED)
  async addSet(@Headers() header, @Param() params, @Body() body) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const id = (params.id) ? params.id : 0
      if (id > 0) {
        await this.quizService.upSet(id, body);
        return {
          message: "success",
          statusCode: 200000,

        }
      } else {
        await this.quizService.addSet(body);
        return {
          message: "success",
          statusCode: 200000,

        }
      }
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }


  @Get("/view/set")
  async getSetQuiz(@Headers() header) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.quizService.getSetQuiz();
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  @Get("/dropdownSet")
  async selectSetQuiz(@Headers() header) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.quizService.dropdownSet();
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }


  @Get("/view/sub/:id")
  async getsubQuiz(@Headers() header, @Param() params: number) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      return await this.quizService.getsubQuiz(params);
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  @Get("/view/add/:id")
  async getView(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.quizService.getQuiz(params);
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }



  @Post('/addQuiz/:id')
  @HttpCode(HttpStatus.CREATED)
  async addQuiz(@Headers() header, @Param() params, @Body() body) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      await this.quizService.addquiz(params, body);
      return {
        message: "success",
        statusCode: 200000,

      }
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }

  }

  @Get('/editQuiz/:id')
  async editQuiz(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.quizService.upSup(params);
      return data
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  @Post('/upQuiz/:id')
  @HttpCode(HttpStatus.CREATED)
  async upQuiz(@Headers() header, @Param() params, @Body() body) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      await this.quizService.editquiz(params, body);
      return {
        message: "success",
        statusCode: 200000,

      }
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }
  }

  @Post('ans/:id')
  @HttpCode(HttpStatus.CREATED)
  async ans(@Headers() header, @Param() params, @Body() body) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const data = await this.quizService.ansQuiz(params, body);
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
