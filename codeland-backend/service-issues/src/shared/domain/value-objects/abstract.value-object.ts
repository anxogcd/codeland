import { Branded } from '@Shared/utils/value-object-branding';

export abstract class AbstractValueObject<T, TBrand extends symbol> {
  protected constructor(private readonly value: Branded<T, TBrand>) {}

  getValue(): Branded<T, TBrand> {
    return this.value;
  }

  equals(vo: AbstractValueObject<T, TBrand>): boolean {
    return vo.constructor === this.constructor && vo.getValue() === this.value;
  }

  toString(): string {
    return String(this.value);
  }

  getRaw(): T {
    return this.value as unknown as T;
  }
}
