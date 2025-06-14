import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async findById(id: number): Promise<UserModel> {
    const entity = await this.userRepository.findOne({ id });
    if (!entity) throw new HttpException('User not found', 404);

    return entity;
  }

  async findByUsername(username: string): Promise<UserModel> {
    const entity = await this.userRepository.findOne({ username });
    if (!entity) throw new HttpException('User not found', 404);

    return entity;
  }

  async findAll(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }
}
