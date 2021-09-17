import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entity/users.entity';
import { user_type } from './entity/type.entity';
import { quiz_title } from './entity/title.entity';
import { quiz_set } from './entity/set.entity';
import { quiz_item } from './entity/subItem.entity';
import { quiz_sub } from './entity/sub.entity';
import { result } from './entity/result.entity';
import { result_item } from './entity/resultItem.entity';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { AnswerModule } from './answer/answer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33006,
      username: 'root',
      password: 'root',
      database: 'quiz',
      entities: [
        users,user_type,quiz_title,quiz_set,quiz_sub,quiz_item,result,result_item
      ],
      // entities: ['../typeorm/entities/*.ts'],

      synchronize: true,
    }),
    UserModule,
    QuizModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


