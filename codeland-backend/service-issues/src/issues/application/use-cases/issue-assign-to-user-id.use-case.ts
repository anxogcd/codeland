import { HttpException, Injectable } from '@nestjs/common';
import { IUseCase } from '@Shared/application/interfaces/use-case.interface';
import { VONumber } from '@Shared/domain/value-objects/number.value-object';
import { InjectIIssueRepository } from 'src/issues/domain/repositories/issue-repository.di-token';
import { IIssuesRepository } from 'src/issues/domain/repositories/issue-repository.interface';
import { IssueAssignToUserIdDto } from '../dtos/issue-assign-to-user-id.dto';

@Injectable()
export class IssueAssignToUserIdUseCase
  implements IUseCase<IssueAssignToUserIdDto, Boolean>
{
  constructor(
    @InjectIIssueRepository()
    private readonly issuesRepository: IIssuesRepository,
  ) {}
  async execute(command: IssueAssignToUserIdDto): Promise<Boolean> {
    const existentEntity = await this.issuesRepository.findById(
      command.issueId,
    );
    if (!existentEntity)
      throw new HttpException(
        `Issue with id: ${command.issueId} does not exist`,
        404,
      );

    existentEntity.setAssignedTo(VONumber.create(command.userId));

    await this.issuesRepository.save(existentEntity);

    return true;
  }
}
