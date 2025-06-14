const brand = Symbol('brand');

export type Branded<T, TBrand extends symbol> = T & {
  readonly [brand]: TBrand;
};
