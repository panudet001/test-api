import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from '../entity/users.entity';
import { user_type } from '../entity/type.entity';
import { admin } from '../entity/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([users,user_type,admin])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
