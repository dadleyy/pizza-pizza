export enum Crust {
  DEFAULT,
  PAN,
  THIN,
  DEEP,
  CHEESY,
};

export type Topping = {
  id: string;
  name: string;
};

export type Sauce = {
};

export enum SaucePresence {
  NORMAL,
  LIGHT,
  HEAVY,
};

export enum ToppingPresence {
  FULL,
  HALF,
  QUARTER,
};
