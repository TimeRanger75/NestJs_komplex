import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(private dataSource: DataSource) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const owner = Object.assign(new Owner(), createOwnerDto);
    this.dataSource.getRepository(Owner).save(owner);
    return await owner;
  }

  async findAll() {
    return await this.dataSource.getRepository(Owner).find();
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(Owner).findOneBy({ id });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    await this.dataSource.getRepository(Owner).update(
      { id: id },
      {
        fullName: updateOwnerDto.fullName,
        business: updateOwnerDto.business,
      },
    );
    return await this.dataSource.getRepository(Owner).findOneBy({ id });
  }

  async remove(id: number) {
    await this.dataSource.getRepository(Owner).delete({ id });
    return `Row at id: #${id} is deleted`;
  }
}
