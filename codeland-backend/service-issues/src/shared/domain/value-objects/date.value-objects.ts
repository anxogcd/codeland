import { Branded } from '@Shared/utils/value-object-branding';
import { ValidateVOException } from '../exceptions/value-object-validation.exception';
import { AbstractValueObject } from './abstract.value-object';

const VODateBrand = Symbol('VODate');
type TVODateBrand = typeof VODateBrand;
type DateBranded = Branded<Date, TVODateBrand>;

export class VODate extends AbstractValueObject<Date, TVODateBrand> {
  private constructor(value: DateBranded) {
    super(value);
  }

  static create(date: Date): VODate {
    if (!VODate.isValidDate(date)) {
      throw new ValidateVOException('Invalid date value');
    }
    return new VODate(date as DateBranded);
  }

  private static isValidDate(date: unknown): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  static now(): VODate {
    return VODate.create(new Date());
  }
}
