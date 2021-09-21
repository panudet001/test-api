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
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { AnswerModule } from './answer/answer.module';
import { ConfigModule } from '@nestjs/config';
import { admin } from './entity/admin.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: parseInt(process.env.TYPEORM_PORT) || 33006,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [
        users,user_type,quiz_title,quiz_set,quiz_sub,quiz_item,result,admin
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


