type Reindeer = '💨' | '💃' | '🦌' | '🌟' | '☄️' | '❤️' | '🌩️' | '⚡' | '🔴';

type Section = [
  Reindeer,
  Reindeer,
  Reindeer,
  Reindeer,
  Reindeer,
  Reindeer,
  Reindeer,
  Reindeer,
  Reindeer,
];

type Sodoku = [
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
  [[Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer], [Reindeer, Reindeer, Reindeer]],
];

type FilterArray<T extends unknown[], U> = T extends [infer Head, ...infer Tail]
  ? Head extends U
    ? [Head, ...FilterArray<Tail, U>]
    : FilterArray<Tail, U>
  : [];

type FlattenArray<TList extends unknown[]> = TList extends [
  infer IFirst extends unknown[],
  ...infer IRest,
]
  ? [...IFirst, ...FlattenArray<IRest>]
  : [];

type FlattenRows<T extends Sodoku> = { [K in keyof T]: FlattenArray<T[K]> };

type GetColumn<T extends Sodoku, K extends number> = FlattenRows<T> extends infer IFlattenedRows
  ? IFlattenedRows extends Section[]
    ? {
        [L in keyof IFlattenedRows]: K extends keyof IFlattenedRows[L]
          ? IFlattenedRows[L][K]
          : never;
      }
    : never
  : never;

type ValidateSection<T extends Section> = {
  [K in Reindeer]: FilterArray<T, K>['length'] extends 1 ? true : false;
}[Reindeer] extends true
  ? true
  : false;

type ValidateRows<T extends Sodoku> = {
  [K in keyof T]: ValidateSection<FlattenArray<T[K]>>;
}[number] extends true
  ? true
  : false;

type ValidateColumns<T extends Sodoku> = {
  [K in keyof T]: K extends `${infer A extends number}` ? ValidateSection<GetColumn<T, A>> : never;
}[number] extends true
  ? true
  : false;

type ValidateRegions<T extends Sodoku> = ValidateRows<
  [
    [T[0][0], T[1][0], T[2][0]],
    [T[3][0], T[4][0], T[5][0]],
    [T[6][0], T[7][0], T[8][0]],
    [T[0][1], T[1][1], T[2][1]],
    [T[3][1], T[4][1], T[5][1]],
    [T[6][1], T[7][1], T[8][1]],
    [T[0][2], T[1][2], T[2][2]],
    [T[3][2], T[4][2], T[5][2]],
    [T[6][2], T[7][2], T[8][2]],
  ]
>;

type Validate<T extends Sodoku> = ValidateRows<T> extends true
  ? ValidateColumns<T> extends true
    ? ValidateRegions<T> extends true
      ? true
      : false
    : false
  : false;

/************************** TESTS **************************/
import { Equal, Expect } from 'type-testing';

type test_sudoku_1_actual = Validate<
  [
    //   ^?
    [['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴']],
    [['🌟', '⚡', '🔴'], ['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️']],
    [['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴'], ['💨', '💃', '🦌']],
    [['🦌', '💨', '💃'], ['⚡', '☄️', '❤️'], ['🔴', '🌩️', '🌟']],
    [['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃'], ['⚡', '☄️', '❤️']],
    [['⚡', '☄️', '❤️'], ['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃']],
    [['💃', '🦌', '💨'], ['❤️', '🌟', '☄️'], ['🌩️', '🔴', '⚡']],
    [['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨'], ['❤️', '🌟', '☄️']],
    [['❤️', '🌟', '☄️'], ['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨']],
  ]
>;
type test_sudoku_1 = Expect<Equal<test_sudoku_1_actual, true>>;

type test_sudoku_2_actual = Validate<
  [
    //   ^?
    [['🌩️', '💨', '☄️'], ['🌟', '🦌', '⚡'], ['❤️', '🔴', '💃']],
    [['🌟', '⚡', '❤️'], ['🔴', '💃', '☄️'], ['🌩️', '💨', '🦌']],
    [['🔴', '🦌', '💃'], ['💨', '❤️', '🌩️'], ['🌟', '⚡', '☄️']],
    [['❤️', '☄️', '🌩️'], ['💃', '⚡', '🔴'], ['💨', '🦌', '🌟']],
    [['🦌', '💃', '⚡'], ['🌩️', '🌟', '💨'], ['🔴', '☄️', '❤️']],
    [['💨', '🌟', '🔴'], ['🦌', '☄️', '❤️'], ['⚡', '💃', '🌩️']],
    [['☄️', '🔴', '💨'], ['❤️', '🌩️', '🦌'], ['💃', '🌟', '⚡']],
    [['💃', '❤️', '🦌'], ['⚡', '🔴', '🌟'], ['☄️', '🌩️', '💨']],
    [['⚡', '🌩️', '🌟'], ['☄️', '💨', '💃'], ['🦌', '❤️', '🔴']],
  ]
>;
type test_sudoku_2 = Expect<Equal<test_sudoku_2_actual, true>>;

type test_sudoku_3_actual = Validate<
  [
    //   ^?
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🌟', '⚡', '💨'], ['❤️', '💃', '🔴'], ['☄️', '🌩️', '🦌']],
    [['☄️', '🌩️', '❤️'], ['⚡', '🌟', '🦌'], ['💃', '🔴', '💨']],
    [['🌩️', '💃', '🔴'], ['🦌', '💨', '⚡'], ['🌟', '☄️', '❤️']],
    [['❤️', '☄️', '⚡'], ['💃', '🌩️', '🌟'], ['🦌', '💨', '🔴']],
    [['💨', '🌟', '🦌'], ['☄️', '🔴', '❤️'], ['🌩️', '💃', '⚡']],
    [['💃', '💨', '🌟'], ['🔴', '🦌', '☄️'], ['❤️', '⚡', '🌩️']],
    [['🔴', '❤️', '☄️'], ['🌟', '⚡', '🌩️'], ['💨', '🦌', '💃']],
    [['⚡', '🦌', '🌩️'], ['💨', '❤️', '💃'], ['🔴', '🌟', '☄️']],
  ]
>;
type test_sudoku_3 = Expect<Equal<test_sudoku_3_actual, true>>;

type test_sudoku_4_actual = Validate<
  [
    //   ^?
    [['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴']],
    [['🌟', '⚡', '🔴'], ['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️']],
    [['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴'], ['💨', '💃', '🦌']],
    [['🦌', '💨', '💃'], ['⚡', '☄️', '❤️'], ['🔴', '🌩️', '🌟']],
    [['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃'], ['⚡', '☄️', '❤️']],
    [['⚡', '☄️', '❤️'], ['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃']],
    [['💃', '🦌', '💨'], ['❤️', '🌟', '☄️'], ['⚡', '🔴', '🌟']],
    [['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨'], ['❤️', '🌟', '☄️']],
    [['❤️', '🌟', '☄️'], ['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨']],
  ]
>;
type test_sudoku_4 = Expect<Equal<test_sudoku_4_actual, false>>;

type test_sudoku_5_actual = Validate<
  [
    //   ^?
    [['🌩️', '💨', '☄️'], ['🌟', '🦌', '⚡'], ['❤️', '🔴', '💃']],
    [['🌟', '⚡', '❤️'], ['🔴', '💃', '☄️'], ['🌩️', '💨', '🦌']],
    [['🔴', '🦌', '💃'], ['💨', '❤️', '🌩️'], ['🌟', '⚡', '☄️']],
    [['❤️', '☄️', '🌩️'], ['💃', '⚡', '🔴'], ['💨', '🦌', '🌟']],
    [['🦌', '💃', '⚡'], ['🌩️', '🌟', '💨'], ['🔴', '☄️', '❤️']],
    [['💨', '🌟', '🔴'], ['🦌', '☄️', '❤️'], ['⚡', '💃', '🌩️']],
    [['☄️', '🔴', '💨'], ['❤️', '💃', '🦌'], ['💃', '🌟', '⚡']],
    [['💃', '❤️', '🦌'], ['⚡', '🔴', '🌟'], ['☄️', '🌩️', '💨']],
    [['⚡', '🌩️', '🌟'], ['☄️', '💨', '💃'], ['🦌', '❤️', '🔴']],
  ]
>;
type test_sudoku_5 = Expect<Equal<test_sudoku_5_actual, false>>;

type test_sudoku_6_actual = Validate<
  [
    //   ^?
    [['⚡', '🔴', '🌩️'], ['🦌', '❤️', '💨'], ['💨', '🌟', '☄️']],
    [['❤️', '🦌', '🌟'], ['💨', '🌟', '🔴'], ['💃', '⚡', '🌩️']],
    [['💨', '💃', '🌟'], ['☄️', '⚡', '🌩️'], ['🔴', '❤️', '🦌']],
    [['🦌', '⚡', '🔴'], ['❤️', '💃', '💨'], ['☄️', '🌩️', '🌟']],
    [['🌟', '🌩️', '💃'], ['⚡', '🔴', '☄️'], ['❤️', '🦌', '💨']],
    [['☄️', '💨', '❤️'], ['🌟', '🌩️', '🦌'], ['⚡', '💃', '🔴']],
    [['🌩️', '☄️', '💨'], ['💃', '🦌', '⚡'], ['🌟', '🔴', '❤️']],
    [['🔴', '❤️', '⚡'], ['🌩️', '☄️', '🌟'], ['🦌', '💨', '💃']],
    [['💃', '🌟', '🦌'], ['🔴', '💨', '❤️'], ['🌩️', '☄️', '⚡']],
  ]
>;
type test_sudoku_6 = Expect<Equal<test_sudoku_6_actual, false>>;

type test_sudoku_7_actual = Validate<
  [
    [['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴']],
    [['💃', '🦌', '☄️'], ['❤️', '🌩️', '🌟'], ['⚡', '🔴', '💨']],
    [['🦌', '☄️', '❤️'], ['🌩️', '🌟', '⚡'], ['🔴', '💨', '💃']],
    [['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴'], ['💨', '💃', '🦌']],
    [['❤️', '🌩️', '🌟'], ['⚡', '🔴', '💨'], ['💃', '🦌', '☄️']],
    [['🌩️', '🌟', '⚡'], ['🔴', '💨', '💃'], ['🦌', '☄️', '❤️']],
    [['🌟', '⚡', '🔴'], ['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️']],
    [['⚡', '🔴', '💨'], ['💃', '🦌', '☄️'], ['❤️', '🌩️', '🌟']],
    [['🔴', '💨', '💃'], ['🦌', '☄️', '❤️'], ['🌩️', '🌟', '⚡']],
  ]
>;

type test_sudoku_7 = Expect<Equal<test_sudoku_7_actual, false>>;

type test_sudoku_8_actual = Validate<
  [
    //   ^?
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
  ]
>;

type test_sudoku_8 = Expect<Equal<test_sudoku_8_actual, false>>;
