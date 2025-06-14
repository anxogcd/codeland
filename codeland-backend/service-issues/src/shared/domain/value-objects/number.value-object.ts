import { Branded } from '@Shared/utils/value-object-branding';
import { ValidateVOException } from '../exceptions/value-object-validation.exception';
import { AbstractValueObject } from './abstract.value-object';

const VONumberBrand = Symbol('VONumber');
type TVONumberBrand = typeof VONumberBrand;
type NumberBranded = Branded<number, TVONumberBrand>;

export class VONumber extends AbstractValueObject<number, TVONumberBrand> {
  private constructor(value: NumberBranded) {
    super(value);
  }

  static create(number: number): VONumber {
    if (!VONumber.isValidNumber(number)) {
      throw new ValidateVOException('Invalid number value');
    }
    return new VONumber(number as NumberBranded);
  }

  private static isValidNumber(number: unknown): boolean {
    return typeof number === 'number' && !isNaN(number) && isFinite(number);
  }
}
