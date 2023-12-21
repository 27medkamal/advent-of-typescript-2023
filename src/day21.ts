type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  ';
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = [
  [TicTacToeCell, TicTacToeCell, TicTacToeCell],
  [TicTacToeCell, TicTacToeCell, TicTacToeCell],
  [TicTacToeCell, TicTacToeCell, TicTacToeCell],
];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [['  ', '  ', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};

type GetValueForPosition<T extends TicTactToeBoard, P extends TicTacToePositions> = T extends [
  [infer TL, infer TC, infer TR],
  [infer ML, infer MC, infer MR],
  [infer BL, infer BC, infer BR],
]
  ? P extends 'top-left'
    ? TL
    : P extends 'top-center'
      ? TC
      : P extends 'top-right'
        ? TR
        : P extends 'middle-left'
          ? ML
          : P extends 'middle-center'
            ? MC
            : P extends 'middle-right'
              ? MR
              : P extends 'bottom-left'
                ? BL
                : P extends 'bottom-center'
                  ? BC
                  : P extends 'bottom-right'
                    ? BR
                    : never
  : never;

type UpdateBoard<
  T extends TicTactToeBoard,
  P extends TicTacToePositions,
  C extends TicTacToeChip,
> = T extends [
  [infer TL, infer TC, infer TR],
  [infer ML, infer MC, infer MR],
  [infer BL, infer BC, infer BR],
]
  ? P extends 'top-left'
    ? [[C, TC, TR], [ML, MC, MR], [BL, BC, BR]]
    : P extends 'top-center'
      ? [[TL, C, TR], [ML, MC, MR], [BL, BC, BR]]
      : P extends 'top-right'
        ? [[TL, TC, C], [ML, MC, MR], [BL, BC, BR]]
        : P extends 'middle-left'
          ? [[TL, TC, TR], [C, MC, MR], [BL, BC, BR]]
          : P extends 'middle-center'
            ? [[TL, TC, TR], [ML, C, MR], [BL, BC, BR]]
            : P extends 'middle-right'
              ? [[TL, TC, TR], [ML, MC, C], [BL, BC, BR]]
              : P extends 'bottom-left'
                ? [[TL, TC, TR], [ML, MC, MR], [C, BC, BR]]
                : P extends 'bottom-center'
                  ? [[TL, TC, TR], [ML, MC, MR], [BL, C, BR]]
                  : P extends 'bottom-right'
                    ? [[TL, TC, TR], [ML, MC, MR], [BL, BC, C]]
                    : never
  : never;

type ChipIsInPositions<
  T extends TicTactToeBoard,
  C extends TicTacToeChip,
  P extends TicTacToePositions[],
> = (
  T extends [
    [infer TL, infer TC, infer TR],
    [infer ML, infer MC, infer MR],
    [infer BL, infer BC, infer BR],
  ]
    ? {
        [K in keyof P]: P[K] extends 'top-left'
          ? TL extends C
            ? true
            : false
          : P[K] extends 'top-center'
            ? TC extends C
              ? true
              : false
            : P[K] extends 'top-right'
              ? TR extends C
                ? true
                : false
              : P[K] extends 'middle-left'
                ? ML extends C
                  ? true
                  : false
                : P[K] extends 'middle-center'
                  ? MC extends C
                    ? true
                    : false
                  : P[K] extends 'middle-right'
                    ? MR extends C
                      ? true
                      : false
                    : P[K] extends 'bottom-left'
                      ? BL extends C
                        ? true
                        : false
                      : P[K] extends 'bottom-center'
                        ? BC extends C
                          ? true
                          : false
                        : P[K] extends 'bottom-right'
                          ? BR extends C
                            ? true
                            : false
                          : never;
      }
    : never
) extends { [K in keyof P]: true }
  ? true
  : false;

type isDraw<T extends TicTactToeBoard> = T extends [
  [infer TL, infer TC, infer TR],
  [infer ML, infer MC, infer MR],
  [infer BL, infer BC, infer BR],
]
  ? TL extends TicTacToeChip
    ? TC extends TicTacToeChip
      ? TR extends TicTacToeChip
        ? ML extends TicTacToeChip
          ? MC extends TicTacToeChip
            ? MR extends TicTacToeChip
              ? BL extends TicTacToeChip
                ? BC extends TicTacToeChip
                  ? BR extends TicTacToeChip
                    ? true
                    : false
                  : false
                : false
              : false
            : false
          : false
        : false
      : false
    : false
  : never;

type ChipWon<T extends TicTactToeBoard, C extends TicTacToeChip> = ChipIsInPositions<
  T,
  C,
  ['top-left', 'top-center', 'top-right']
> extends [true, true, true]
  ? true
  : ChipIsInPositions<T, C, ['middle-left', 'middle-center', 'middle-right']> extends true
    ? true
    : ChipIsInPositions<T, C, ['bottom-left', 'bottom-center', 'bottom-right']> extends true
      ? true
      : ChipIsInPositions<T, C, ['top-left', 'middle-left', 'bottom-left']> extends true
        ? true
        : ChipIsInPositions<T, C, ['top-center', 'middle-center', 'bottom-center']> extends true
          ? true
          : ChipIsInPositions<T, C, ['top-right', 'middle-right', 'bottom-right']> extends true
            ? true
            : ChipIsInPositions<T, C, ['top-left', 'middle-center', 'bottom-right']> extends true
              ? true
              : ChipIsInPositions<T, C, ['top-right', 'middle-center', 'bottom-left']> extends true
                ? true
                : false;

type TicTacToe<T extends TicTacToeGame, P extends TicTacToePositions> = T extends {
  board: infer B extends TicTactToeBoard;
  state: infer S extends TicTacToeChip;
}
  ? GetValueForPosition<B, P> extends '  '
    ? UpdateBoard<B, P, S> extends infer A extends TicTactToeBoard
      ? {
          board: A;
          state: ChipWon<A, '❌'> extends true
            ? '❌ Won'
            : ChipWon<A, '⭕'> extends true
              ? '⭕ Won'
              : isDraw<A> extends true
                ? 'Draw'
                : S extends '❌'
                  ? '⭕'
                  : '❌';
        }
      : never
    : T
  : never;

/************************** TESTS **************************/
import { Equal, Expect } from 'type-testing';

type test_move1_actual = TicTacToe<NewGame, 'top-center'>;
//   ^?
type test_move1_expected = {
  board: [['  ', '❌', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];
  state: '⭕';
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, 'top-left'>;
//   ^?
type test_move2_expected = {
  board: [['⭕', '❌', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];
  state: '❌';
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, 'middle-center'>;
//   ^?
type test_move3_expected = {
  board: [['⭕', '❌', '  '], ['  ', '❌', '  '], ['  ', '  ', '  ']];
  state: '⭕';
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, 'bottom-left'>;
//   ^?
type test_move4_expected = {
  board: [['⭕', '❌', '  '], ['  ', '❌', '  '], ['⭕', '  ', '  ']];
  state: '❌';
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_x_win_actual = TicTacToe<test_move4_actual, 'bottom-center'>;
//   ^?
type test_x_win_expected = {
  board: [['⭕', '❌', '  '], ['  ', '❌', '  '], ['⭕', '❌', '  ']];
  state: '❌ Won';
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, 'bottom-right'>;
//   ^?
type type_move5_expected = {
  board: [['⭕', '❌', '  '], ['  ', '❌', '  '], ['⭕', '  ', '❌']];
  state: '⭕';
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, 'middle-left'>;
//   ^?
type test_o_win_expected = {
  board: [['⭕', '❌', '  '], ['⭕', '❌', '  '], ['⭕', '  ', '❌']];
  state: '⭕ Won';
};

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, 'top-center'>;
//   ^?
type test_invalid_expected = {
  board: [['  ', '❌', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];
  state: '⭕';
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
  board: [['⭕', '❌', '⭕'], ['⭕', '❌', '❌'], ['❌', '⭕', '  ']];
  state: '⭕';
};
type test_draw_actual = TicTacToe<test_before_draw, 'bottom-right'>;
//   ^?
type test_draw_expected = {
  board: [['⭕', '❌', '⭕'], ['⭕', '❌', '❌'], ['❌', '⭕', '⭕']];
  state: 'Draw';
};
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
