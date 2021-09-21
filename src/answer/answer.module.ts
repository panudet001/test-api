import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { result } from '../entity/result.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([result])],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
