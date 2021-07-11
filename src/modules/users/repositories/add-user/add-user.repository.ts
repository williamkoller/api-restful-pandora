import { Hasher } from '@/infra/cryptography/hasher/hasher';
import { User } from '@/infra/typeorm/entities/user/user-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';

@Injectable()
export class AddUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly addUserRepository: Repository<User>,
    private readonly hasher: Hasher,
  ) {}

  async addUser(data: AddUserDto): Promise<User> {
    const addUser = this.addUserRepository.create({
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: await this.hasher.hash(data.password),
    });

    return await this.addUserRepository.save(addUser);
  }
}
