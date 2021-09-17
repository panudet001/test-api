import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { user_type } from '../entity/type.entity';
import { users } from '../entity/users.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/view/:id?') 
    async getUsers(@Param() params): Promise<users[]>{
      const id = (params.id)? params.id: 0
      if(id > 0){
        return await this.userService.selectUser(id);
      }else{
        return await this.userService.userAll();
      }
      
    }

    @Post('/add/:id?')
    @HttpCode(HttpStatus.CREATED)
    async addUser(@Body() body,@Param() params) { 
        const id = (params.id)? params.id: 0
        if(id > 0){
          await this.userService.upDataUser(id,body);
          return 2
    
        }else{
          const data = await this.userService.addUsers(body);
          return data
        }

      
    
    }


    @Get("/type/:id?") 
    async getType(@Param() params): Promise<user_type[]>{
      const id = (params.id)? params.id: 0
      if(id > 0){
        return await this.userService.selectType(id);
      }else{
        return await this.userService.typeAll();
      }
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
