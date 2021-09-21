import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Headers } from '@nestjs/common';
import { user_type } from '../entity/type.entity';
import { users } from '../entity/users.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/view/:id?')
  async getUsers(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const id = (params.id) ? params.id : 0

      if (id > 0) {
        const result = await this.userService.selectUser(id);
        return result

      } else {
        const result = await this.userService.userAll();
        return result
      }
    } else {
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }

    }



  }


  @Post('login')
  async login(@Headers() header, @Body() body) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const result = await this.userService.checkLogin(body);
      return result
    }else{
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }
    }
  }

  @Post('adminlogin')
  async adminlogin(@Headers() header, @Body() body) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const result = await this.userService.checkLoginAdmin(body);
      return result
    }else{
      return {
        message: "error",
        statusCode: 403007,
        data: "Not appKey in the system"

      }
    }
  }

  @Post('/add/:id?')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Headers() header, @Body() body, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const id = (params.id) ? params.id : 0
      if (id > 0) {
        const data = await this.userService.upDataUser(id, body);
        return data

      } else {
        const data = await this.userService.addUsers(body);
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


  @Get("/type/:id?")
  async getType(@Headers() header, @Param() params) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const id = (params.id) ? params.id : 0
      let data
      if (id > 0) {
        data = await this.userService.selectType(id);
      } else {
        data = await this.userService.typeAll();
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

  @Post('/typeAdd/:id?')
  @HttpCode(HttpStatus.CREATED)
  async addType(@Headers() header, @Param() params, @Body() body) {
    const web = (header.web === "quiz") ? 1 : 0
    if (web > 0) {
      const id = (params.id) ? params.id : 0
      if (id > 0) {
        await this.userService.upType(id, body);
        return {
          message: "success",
          statusCode: 200000,

        }
      } else {
        await this.userService.addType(body);
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




}
