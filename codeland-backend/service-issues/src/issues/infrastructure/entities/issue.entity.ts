import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { v7 } from 'uuid';
import { EIssuePriority } from '../../domain/value-objects/issue-priority.value-object';
import { EIssueStatus } from '../../domain/value-objects/issue-status.value-object';

@ObjectType()
@Entity()
export class IssueEntity {
  @Field()
  @PrimaryKey({ type: 'uuid' })
  id: string = v7();

  @Property()
  title!: string;

  @Property({ type: 'string' })
  status!: EIssueStatus;

  @Property({ name: 'assignedtoid' })
  assignedToId!: number;

  @Property({ type: 'string' })
  priority!: EIssuePriority;

  @Property({ name: 'updatedat', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ name: 'createdat', onCreate: () => new Date() })
  createdAt: Date = new Date();
}
