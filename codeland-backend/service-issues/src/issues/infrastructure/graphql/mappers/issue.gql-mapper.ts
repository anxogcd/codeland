import { IssueModel } from 'src/issues/domain/models/issue.model';
import { IssueGqlType } from '../types/issue.gqltype';

export class IssueMapper {
  static toGql(issue: IssueModel): IssueGqlType {
    return {
      id: issue.id.getRaw(),
      title: issue.getTitle().getRaw(),
      status: issue.getStatus().getRaw(),
      assignedToId: issue.getAssignedTo().getRaw(),
      priority: issue.getPriority().getRaw(),
      updatedAt: issue.getUpdatedAt().getRaw(),
      createdAt: issue.createdAt.getRaw(),
    };
  }
}
