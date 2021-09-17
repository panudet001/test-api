import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { result_item } from '../entity/resultItem.entity';
import { result } from '../entity/result.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([result,result_item])],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
