import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class UserEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  username!: string;

  @Property()
  password!: string;
}
