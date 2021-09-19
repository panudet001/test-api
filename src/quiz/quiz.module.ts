import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { quiz_sub } from '../entity/sub.entity';
import { quiz_set } from '../entity/set.entity';
import { quiz_title } from '../entity/title.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { quiz_item } from '../entity/subItem.entity';
import { result } from '../entity/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([quiz_title,quiz_set,quiz_sub,quiz_item,result])],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
