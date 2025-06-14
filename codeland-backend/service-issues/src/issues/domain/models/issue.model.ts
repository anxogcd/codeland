import { VODate } from '@Shared/domain/value-objects/date.value-objects';
import { VONumber } from '@Shared/domain/value-objects/number.value-object';
import { VOString } from '@Shared/domain/value-objects/string.value-object';
import { VOIssueId } from '../value-objects/issue-id.value-object';
import { VOIssuePriority } from '../value-objects/issue-priority.value-object';
import {
  EIssueStatus,
  VOIssueStatus,
} from '../value-objects/issue-status.value-object';

export class IssueModel {
  constructor(
    public readonly id: VOIssueId,
    private title: VOString,
    private status: VOIssueStatus,
    private assignedToId: VONumber,
    private priority: VOIssuePriority,
    private updatedAt: VODate = VODate.now(),
    public readonly createdAt: VODate = VODate.now(),
  ) {}

  getTitle(): VOString {
    return this.title;
  }

  getStatus(): VOIssueStatus {
    return this.status;
  }

  getAssignedTo(): VONumber {
    return this.assignedToId;
  }

  getPriority(): VOIssuePriority {
    return this.priority;
  }

  getUpdatedAt(): VODate {
    return this.updatedAt;
  }

  close() {
    if (this.status.getValue() === EIssueStatus.CLOSED) return;
    this.status = VOIssueStatus.createFromEnum(EIssueStatus.CLOSED);
  }

  open() {
    if (this.status.getValue() === EIssueStatus.OPEN) return;
    this.status = VOIssueStatus.createFromEnum(EIssueStatus.OPEN);
  }

  setAssignedTo(newWarrior: VONumber) {
    this.assignedToId = newWarrior;
  }

  setPriority(newPriority: VOIssuePriority) {
    this.priority = newPriority;
  }

  setTitle(newTitle: VOString) {
    this.title = newTitle;
  }
}
