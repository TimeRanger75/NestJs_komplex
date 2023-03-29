import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private dataSource: DataSource) {}

  async create(createAccountDto: CreateAccountDto) {
    const account = Object.assign(new Account(), createAccountDto);
    await this.dataSource.getRepository(Account).save(account);
  }

  async findAll() {
    return await this.dataSource.getRepository(Account).find();
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(Account).findOneBy({ id });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    await this.dataSource.getRepository(Account).update(
      { id: id },
      {
        accountNumber: updateAccountDto.accountNumber,
        balance: updateAccountDto.balance,
      },
    );
    return await this.dataSource.getRepository(Account).findOneBy({ id });
  }

  async remove(id: number) {
    await this.dataSource.getRepository(Account).delete({ id });
    return `Row at id: #${id} is deleted`;
  }
}
