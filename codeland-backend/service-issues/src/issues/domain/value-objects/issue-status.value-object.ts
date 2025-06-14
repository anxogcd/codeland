import { ValidateVOException } from '@Shared/domain/exceptions/value-object-validation.exception';
import { AbstractValueObject } from '@Shared/domain/value-objects/abstract.value-object';
import { Branded } from '@Shared/utils/value-object-branding';

export enum EIssueStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  IN_PROGRESS = 'IN_PROGRESS',
}

const VOIssueStatusBrand = Symbol('VOIssueStatus');
type TVOIssueStatusBrand = typeof VOIssueStatusBrand;
type IssueStatusBranded = Branded<EIssueStatus, TVOIssueStatusBrand>;

export class VOIssueStatus extends AbstractValueObject<
  EIssueStatus,
  TVOIssueStatusBrand
> {
  private constructor(value: IssueStatusBranded) {
    super(value);
  }

  static createFromEnum(status: EIssueStatus): VOIssueStatus {
    if (!VOIssueStatus.isValid(status)) {
      throw new ValidateVOException(
        'Invalid issue status. It must be a valid issue status.',
      );
    }
    return new VOIssueStatus(status as IssueStatusBranded);
  }

  private static isValid(value: unknown): boolean {
    return (
      typeof value === 'string' &&
      Object.values(EIssueStatus).includes(value as EIssueStatus)
    );
  }
}
