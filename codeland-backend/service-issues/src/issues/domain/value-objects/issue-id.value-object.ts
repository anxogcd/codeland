import { ValidateVOException } from '@Shared/domain/exceptions/value-object-validation.exception';
import { AbstractValueObject } from '@Shared/domain/value-objects/abstract.value-object';
import { Branded } from '@Shared/utils/value-object-branding';
import { v7 as uuidv7, validate, version } from 'uuid';

const VOIssueIdBrand = Symbol('VOIssueId');
type TVOIssueIdBrand = typeof VOIssueIdBrand;
type IssueIdBranded = Branded<string, TVOIssueIdBrand>;

export class VOIssueId extends AbstractValueObject<string, TVOIssueIdBrand> {
  private constructor(value: IssueIdBranded) {
    super(value);
  }

  static createFromString(value: string): VOIssueId {
    const trimmed = String(value.trim());
    if (!VOIssueId.isValidId(trimmed)) {
      throw new ValidateVOException(
        'Invalid issueID. It must be a valid UUID version 7 string.',
      );
    }

    return new VOIssueId(trimmed as IssueIdBranded);
  }

  static createRandom(): VOIssueId {
    return new VOIssueId(uuidv7() as IssueIdBranded);
  }

  private static isValidId(value: unknown): boolean {
    return typeof value === 'string' && validate(value) && version(value) === 7;
  }
}
