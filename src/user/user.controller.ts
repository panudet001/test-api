import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { user_type } from '../entity/type.entity';
import { users } from '../entity/users.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/view/:id?') 
    async getUsers(@Param() params){
      const id = (params.id)? params.id: 0
     
      if(id > 0){
          const result = await this.userService.selectUser(id);
          return result

      }else{
        const result = await this.userService.userAll();
        return result
      }

      
      
    }

    @Post('/add/:id?')
    @HttpCode(HttpStatus.CREATED)
    async addUser(@Body() body,@Param() params) { 
        const id = (params.id)? params.id: 0
        if(id > 0){
          const data = await this.userService.upDataUser(id,body);
          return data
    
        }else{
          const data = await this.userService.addUsers(body);
          return data
        }

      
    
    }


    @Get("/type/:id?") 
    async getType(@Param() params){
      const id = (params.id)? params.id: 0
      let data
      if(id > 0){
        data = await this.userService.selectType(id);
      }else{
        data =  await this.userService.typeAll();
      }
      return data
    }

    @Post('/typeAdd/:id?')
    @HttpCode(HttpStatus.CREATED)
    async addType(@Param() params,@Body() body) {
      const id = (params.id)? params.id: 0
      if(id > 0){
        await this.userService.upType(id,body);
        return "success"
      }else{
        await this.userService.addType(body);
        return "success"
      }
    }



}
