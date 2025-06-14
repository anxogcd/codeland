import { Branded } from '@Shared/utils/value-object-branding';
import { ValidateVOException } from '../exceptions/value-object-validation.exception';
import { AbstractValueObject } from './abstract.value-object';

const VOStringBrand = Symbol('VOString');
type TVOStringBrand = typeof VOStringBrand;
type StringBranded = Branded<string, TVOStringBrand>;

export class VOString extends AbstractValueObject<string, TVOStringBrand> {
  private constructor(value: StringBranded) {
    super(value);
  }

  static create(value: string): VOString {
    if (!VOString.isValidString(value)) {
      throw new ValidateVOException('Invalid string value');
    }
    return new VOString(value as StringBranded);
  }

  private static isValidString(value: unknown): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }
}
