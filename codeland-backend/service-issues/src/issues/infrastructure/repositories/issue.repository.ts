import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CriteriaResult } from '@Shared/domain/interfaces/criteria-result.interface';
import { VODate } from '@Shared/domain/value-objects/date.value-objects';
import { VONumber } from '@Shared/domain/value-objects/number.value-object';
import { VOString } from '@Shared/domain/value-objects/string.value-object';
import { IIssueFiltersWithPagination } from 'src/issues/domain/interfaces/issue-filters.interface';
import { IssueModel } from 'src/issues/domain/models/issue.model';
import { IIssuesRepository } from 'src/issues/domain/repositories/issue-repository.interface';
import { VOIssueId } from 'src/issues/domain/value-objects/issue-id.value-object';
import { VOIssuePriority } from 'src/issues/domain/value-objects/issue-priority.value-object';
import { VOIssueStatus } from 'src/issues/domain/value-objects/issue-status.value-object';
import { IssueEntity } from '../entities/issue.entity';

@Injectable()
export class IssueRepository implements IIssuesRepository {
  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepository: EntityRepository<IssueEntity>,
  ) {}

  async findByCriteria(
    criteria: IIssueFiltersWithPagination,
  ): Promise<CriteriaResult<IssueModel>> {
    const { filters, orderBy, page = 1, limit = 10 } = criteria ?? {};

    const queryFilters: FilterQuery<IssueEntity> = {};
    if (filters) {
      if (filters.title) queryFilters.title = { $re: filters.title };

      if (filters.assignedToId)
        queryFilters.assignedToId = filters.assignedToId;

      if (filters.priority) queryFilters.priority = filters.priority;

      if (filters.status) queryFilters.status = filters.status;
    }

    const order = orderBy ? { [orderBy as string]: 'desc' } : {};
    const [entities, total] = await this.issueRepository.findAndCount(
      queryFilters,
      {
        orderBy: order,
        offset: (page - 1) * limit,
        limit,
      },
    );

    return { data: entities.map(this.toDomain), total };
  }

  private toDomain(persistanceEntity: IssueEntity): IssueModel {
    return new IssueModel(
      VOIssueId.createFromString(persistanceEntity.id),
      VOString.create(persistanceEntity.title),
      VOIssueStatus.createFromEnum(persistanceEntity.status),
      VONumber.create(persistanceEntity.assignedToId),
      VOIssuePriority.createFromEnum(persistanceEntity.priority),
      VODate.create(persistanceEntity.updatedAt),
      VODate.create(persistanceEntity.createdAt),
    );
  }
}
