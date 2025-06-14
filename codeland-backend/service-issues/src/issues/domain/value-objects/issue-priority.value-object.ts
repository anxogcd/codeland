import { ValidateVOException } from '@Shared/domain/exceptions/value-object-validation.exception';
import { AbstractValueObject } from '@Shared/domain/value-objects/abstract.value-object';
import { Branded } from '@Shared/utils/value-object-branding';

export enum EIssuePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

const VOIssuePriorityBrand = Symbol('VOIssuePriority');
type TVOIssuePriorityBrand = typeof VOIssuePriorityBrand;
type IssuePriorityBranded = Branded<EIssuePriority, TVOIssuePriorityBrand>;

export class VOIssuePriority extends AbstractValueObject<
  EIssuePriority,
  TVOIssuePriorityBrand
> {
  private constructor(value: IssuePriorityBranded) {
    super(value);
  }

  static createFromEnum(priority: EIssuePriority): VOIssuePriority {
    if (!VOIssuePriority.isValid(priority)) {
      throw new ValidateVOException(
        'Invalid issue priority. It must be a valid issue priority.',
      );
    }
    return new VOIssuePriority(priority as IssuePriorityBranded);
  }

  private static isValid(value: unknown): boolean {
    return (
      typeof value === 'string' &&
      Object.values(EIssuePriority).includes(value as EIssuePriority)
    );
  }
}
