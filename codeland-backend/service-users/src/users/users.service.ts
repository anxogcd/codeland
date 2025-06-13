import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async findById(id: number): Promise<UserEntity> {
    const entity = await this.userRepository.findOne({ id });
    if (!entity) throw new HttpException('User not found', 404);
    return entity;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}
