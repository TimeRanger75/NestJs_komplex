import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Account } from './account/entities/account.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('transfer/:sourceid/:targetid')
  async Transfer(
    @Param('sourceid') sourceid: number,
    @Param('targetid') targetid: number,
    @Body('amount') amount: number,
  ) {
    const accountRepo = this.dataSource.getRepository(Account);
    const source = await accountRepo.findOneBy({ id: sourceid });
    const target = await accountRepo.findOneBy({ id: targetid });
    if (!source || !target) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } else {
      if (source.balance < amount) {
        throw new HttpException(
          'Not enough balance in the account ',
          HttpStatus.CONFLICT,
        );
      } else {
        await this.dataSource
          .getRepository(Account)
          .update({ id: sourceid }, { balance: source.balance - amount });
        await this.dataSource
          .getRepository(Account)
          .update({ id: targetid }, { balance: target.balance + amount });
      }
    }
  }
}
