type Alley = '  ';
type MazeItem = '🎄' | '🎅' | Alley;
type DELICIOUS_COOKIES = '🍪';
type MazeMatrix = MazeItem[][];
type Directions = 'up' | 'down' | 'left' | 'right';

type ArrayOfLength<
  TType extends unknown,
  TLength extends number,
  TArray extends TType[] = [],
> = TArray['length'] extends TLength ? TArray : ArrayOfLength<TType, TLength, [TType, ...TArray]>;

type Add<N1 extends number, N2 extends number> = [
  ...ArrayOfLength<unknown, N1>,
  ...ArrayOfLength<unknown, N2>,
]['length'] &
  number;

type Decrement<N extends number> = ArrayOfLength<unknown, N> extends [...infer T, unknown]
  ? T['length']
  : never;

type FindSanta<
  T extends MazeMatrix,
  I1 extends number = 0,
  I2 extends number = 0,
> = T[I1][I2] extends '🎅'
  ? [I1, I2]
  : Add<I2, 1> extends T[I1]['length']
    ? FindSanta<T, Add<I1, 1>, 0>
    : FindSanta<T, I1, Add<I2, 1>>;

type GetNewPosition<D extends Directions, I1 extends number, I2 extends number> = D extends 'up'
  ? [Decrement<I1>, I2]
  : D extends 'down'
    ? [Add<I1, 1>, I2]
    : D extends 'left'
      ? [I1, Decrement<I2>]
      : [I1, Add<I2, 1>];

type UpdateArray<T extends unknown[], I extends number, TItem extends unknown> = T extends [
  infer F,
  ...infer R,
]
  ? I extends 0
    ? [TItem, ...R]
    : [F, ...UpdateArray<R, Decrement<I>, TItem>]
  : never;

type UpdateMaze<
  T extends MazeMatrix,
  I1 extends number,
  I2 extends number,
  TItem extends string,
> = T extends [infer F extends string[], ...infer R extends MazeMatrix]
  ? I1 extends 0
    ? [UpdateArray<F, I2, TItem>, ...R]
    : [F, ...UpdateMaze<R, Decrement<I1>, I2, TItem>]
  : never;

type DeservesCookies<
  T extends MazeMatrix,
  D extends Directions,
  I1 extends number,
  I2 extends number,
> = D extends 'Up'
  ? I1 extends 0
    ? true
    : false
  : D extends 'down'
    ? Add<I1, 1> extends T['length']
      ? true
      : false
    : D extends 'left'
      ? I2 extends 0
        ? true
        : false
      : Add<I2, 1> extends T[I1]['length']
        ? true
        : false;

type FillWithCookies<T extends MazeMatrix> = ArrayOfLength<
  ArrayOfLength<DELICIOUS_COOKIES, T[0]['length']>,
  T['length']
>;

type Move<T extends MazeMatrix, D extends Directions> = FindSanta<T> extends [
  infer I1 extends number,
  infer I2 extends number,
]
  ? DeservesCookies<T, D, I1, I2> extends true
    ? FillWithCookies<T>
    : GetNewPosition<D, I1, I2> extends [infer NI1 extends number, infer NI2 extends number]
      ? T[NI1][NI2] extends '🎄'
        ? T
        : UpdateMaze<T, NI1, NI2, '🎅'> extends infer U extends MazeMatrix
          ? UpdateMaze<U, I1, I2, '  '>
          : never
      : never
  : never;

/************************** TESTS **************************/
import { Expect, Equal } from 'type-testing';

type Maze0 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎅', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];

// can't move up!
type test_maze0_up_actual = Move<Maze0, 'up'>;
//   ^?
type test_maze0_up = Expect<Equal<test_maze0_up_actual, Maze0>>;

// but Santa can move down!
type test_maze0_down_actual = Move<Maze0, 'down'>;
//   ^?
type Maze1 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎅', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze0_down = Expect<Equal<test_maze0_down_actual, Maze1>>;

// Santa can move down again!
type test_maze1_down_actual = Move<Maze1, 'down'>;
type Maze2 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎅', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze1_down = Expect<Equal<test_maze1_down_actual, Maze2>>;

// can't move left!
type test_maze2_left_actual = Move<Maze2, 'left'>;
//   ^?
type test_maze2_left = Expect<Equal<test_maze2_left_actual, Maze2>>;

// if Santa moves up, it's back to Maze1!
type test_maze2_up_actual = Move<Maze2, 'up'>;
//   ^?
type test_maze2_up = Expect<Equal<test_maze2_up_actual, Maze1>>;

// can't move right!
type test_maze2_right_actual = Move<Maze2, 'right'>;
//   ^?
type test_maze2_right = Expect<Equal<test_maze2_right_actual, Maze2>>;

// we exhausted all other options! guess we gotta go down!
type test_maze2_down_actual = Move<Maze2, 'down'>;
//   ^?
type Maze3 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '🎅', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze2_down = Expect<Equal<test_maze2_down_actual, Maze3>>;

// maybe we just gotta go down all the time?
type test_maze3_down_actual = Move<Maze3, 'down'>;
//   ^?
type Maze4 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '🎅', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze3_down = Expect<Equal<test_maze3_down_actual, Maze4>>;

// let's go left this time just to change it up?
type test_maze4_left_actual = Move<Maze4, 'left'>;
//   ^?
type Maze5 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '🎅', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
// it worked!
type test_maze4_left = Expect<Equal<test_maze4_left_actual, Maze5>>;

// couldn't hurt to try left again?
type test_maze5_left_actual = Move<Maze5, 'left'>;
//   ^?
type Maze6 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '🎅', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze5_left = Expect<Equal<test_maze5_left_actual, Maze6>>;

// three time's a charm?
type test_maze6_left_actual = Move<Maze6, 'left'>;
//   ^?
// lol, nope.
type test_maze6_left = Expect<Equal<test_maze6_left_actual, Maze6>>;

// we haven't tried up yet (?)
type test_maze6_up_actual = Move<Maze6, 'up'>;
//   ^?
type Maze7 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '🎅', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
// NOICE.
type test_maze6_up = Expect<Equal<test_maze6_up_actual, Maze7>>;

// maybe another left??
type test_maze7_left_actual = Move<Maze7, 'left'>;
//   ^?
type Maze8 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '🎅', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze7_left = Expect<Equal<test_maze7_left_actual, Maze8>>;

// haven't tried a right yet.. let's give it a go!
type test_maze7_right_actual = Move<Maze8, 'right'>;
//   ^?
// not this time...
type test_maze7_right = Expect<Equal<test_maze7_right_actual, Maze7>>;

// probably just need to stick with left then
type test_maze8_left_actual = Move<Maze8, 'left'>;
//   ^?
type Maze9 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '🎅', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze8_left = Expect<Equal<test_maze8_left_actual, Maze9>>;

// why fix what's not broken?
type test_maze9_left_actual = Move<Maze9, 'left'>;
//   ^?
type Maze10 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '🎅', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze9_left = Expect<Equal<test_maze9_left_actual, Maze10>>;

// do you smell cookies?? it's coming from down..
type test_maze10_down_actual = Move<Maze10, 'down'>;
//   ^?
type Maze11 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '🎅', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze10_down = Expect<Equal<test_maze10_down_actual, Maze11>>;

// the cookies must be freshly baked.  I hope there's also the customary glass of milk!
type test_maze11_left_actual = Move<Maze11, 'left'>;
//   ^?
type Maze12 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎅', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
];
type test_maze11_left = Expect<Equal<test_maze11_left_actual, Maze12>>;

// COOKIES!!!!!
type test_maze12_left_actual = Move<Maze12, 'left'>;
//   ^?
type MazeWin = [
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
];
type test_maze12_left = Expect<Equal<test_maze12_left_actual, MazeWin>>;
