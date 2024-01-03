type Connect4Chips = '🔴' | '🟡';
type Connect4Cell = Connect4Chips | '  ';
type Connect4State = '🔴' | '🟡' | '🔴 Won' | '🟡 Won' | 'Draw';
type Connect4Row = [
  Connect4Cell,
  Connect4Cell,
  Connect4Cell,
  Connect4Cell,
  Connect4Cell,
  Connect4Cell,
  Connect4Cell,
];
type Connect4Board = [Connect4Row, Connect4Row, Connect4Row, Connect4Row, Connect4Row, Connect4Row];
type Connect4Game = {
  board: Connect4Board;
  state: Connect4State;
};

type EmptyBoard = [
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
];

type NewGame = {
  board: EmptyBoard;
  state: '🟡';
};

type UpdateBoard<T extends Connect4Row[], P extends number, C extends Connect4Chips> = T extends [
  ...infer F extends Connect4Row[],
  infer L extends string[],
]
  ? L[P] extends '  '
    ? [
        ...F,
        {
          [K in keyof L]: K extends `${P}` ? C : L[K];
        },
      ]
    : [...UpdateBoard<F, P, C>, L]
  : never;

type ArrayHasValue<T extends string[], V extends string> = T extends [
  infer F,
  ...infer R extends string[],
]
  ? F extends V
    ? true
    : ArrayHasValue<R, V>
  : false;

type ChipIsInPositions<
  T extends Connect4Board,
  C extends Connect4Chips,
  P extends [number, number][],
> = {
  [K in keyof P]: T[P[K][0]][P[K][1]] extends C ? true : false;
}[number] extends true
  ? true
  : false;

type isDraw<T extends Connect4Board> = {
  [K in keyof T]: ArrayHasValue<T[K], '  '>;
}[number] extends true
  ? false
  : true;

type ChipWon<T extends Connect4Board, C extends Connect4Chips> = true extends [
  ChipIsInPositions<T, C, [[0, 1], [0, 2], [0, 3], [0, 4]]>,
  ChipIsInPositions<T, C, [[0, 0], [0, 1], [0, 2], [0, 3]]>,
  ChipIsInPositions<T, C, [[0, 1], [0, 2], [0, 3], [0, 4]]>,
  ChipIsInPositions<T, C, [[0, 2], [0, 3], [0, 4], [0, 5]]>,
  ChipIsInPositions<T, C, [[0, 3], [0, 4], [0, 5], [0, 6]]>,
  ChipIsInPositions<T, C, [[1, 0], [1, 1], [1, 2], [1, 3]]>,
  ChipIsInPositions<T, C, [[1, 1], [1, 2], [1, 3], [1, 4]]>,
  ChipIsInPositions<T, C, [[1, 2], [1, 3], [1, 4], [1, 5]]>,
  ChipIsInPositions<T, C, [[1, 3], [1, 4], [1, 5], [1, 6]]>,
  ChipIsInPositions<T, C, [[2, 0], [2, 1], [2, 2], [2, 3]]>,
  ChipIsInPositions<T, C, [[2, 1], [2, 2], [2, 3], [2, 4]]>,
  ChipIsInPositions<T, C, [[2, 2], [2, 3], [2, 4], [2, 5]]>,
  ChipIsInPositions<T, C, [[2, 3], [2, 4], [2, 5], [2, 6]]>,
  ChipIsInPositions<T, C, [[3, 0], [3, 1], [3, 2], [3, 3]]>,
  ChipIsInPositions<T, C, [[3, 1], [3, 2], [3, 3], [3, 4]]>,
  ChipIsInPositions<T, C, [[3, 2], [3, 3], [3, 4], [3, 5]]>,
  ChipIsInPositions<T, C, [[3, 3], [3, 4], [3, 5], [3, 6]]>,
  ChipIsInPositions<T, C, [[4, 0], [4, 1], [4, 2], [4, 3]]>,
  ChipIsInPositions<T, C, [[4, 1], [4, 2], [4, 3], [4, 4]]>,
  ChipIsInPositions<T, C, [[4, 2], [4, 3], [4, 4], [4, 5]]>,
  ChipIsInPositions<T, C, [[4, 3], [4, 4], [4, 5], [4, 6]]>,
  ChipIsInPositions<T, C, [[5, 0], [5, 1], [5, 2], [5, 3]]>,
  ChipIsInPositions<T, C, [[5, 1], [5, 2], [5, 3], [5, 4]]>,
  ChipIsInPositions<T, C, [[5, 2], [5, 3], [5, 4], [5, 5]]>,
  ChipIsInPositions<T, C, [[5, 3], [5, 4], [5, 5], [5, 6]]>,
  ChipIsInPositions<T, C, [[0, 0], [1, 0], [2, 0], [3, 0]]>,
  ChipIsInPositions<T, C, [[1, 0], [2, 0], [3, 0], [4, 0]]>,
  ChipIsInPositions<T, C, [[2, 0], [3, 0], [4, 0], [5, 0]]>,
  ChipIsInPositions<T, C, [[0, 1], [1, 1], [2, 1], [3, 1]]>,
  ChipIsInPositions<T, C, [[1, 1], [2, 1], [3, 1], [4, 1]]>,
  ChipIsInPositions<T, C, [[2, 1], [3, 1], [4, 1], [5, 1]]>,
  ChipIsInPositions<T, C, [[0, 2], [1, 2], [2, 2], [3, 2]]>,
  ChipIsInPositions<T, C, [[1, 2], [2, 2], [3, 2], [4, 2]]>,
  ChipIsInPositions<T, C, [[2, 2], [3, 2], [4, 2], [5, 2]]>,
  ChipIsInPositions<T, C, [[0, 3], [1, 3], [2, 3], [3, 3]]>,
  ChipIsInPositions<T, C, [[1, 3], [2, 3], [3, 3], [4, 3]]>,
  ChipIsInPositions<T, C, [[2, 3], [3, 3], [4, 3], [5, 3]]>,
  ChipIsInPositions<T, C, [[0, 4], [1, 4], [2, 4], [3, 4]]>,
  ChipIsInPositions<T, C, [[1, 4], [2, 4], [3, 4], [4, 4]]>,
  ChipIsInPositions<T, C, [[2, 4], [3, 4], [4, 4], [5, 4]]>,
  ChipIsInPositions<T, C, [[0, 5], [1, 5], [2, 5], [3, 5]]>,
  ChipIsInPositions<T, C, [[1, 5], [2, 5], [3, 5], [4, 5]]>,
  ChipIsInPositions<T, C, [[2, 5], [3, 5], [4, 5], [5, 5]]>,
  ChipIsInPositions<T, C, [[0, 6], [1, 6], [2, 6], [3, 6]]>,
  ChipIsInPositions<T, C, [[1, 6], [2, 6], [3, 6], [4, 6]]>,
  ChipIsInPositions<T, C, [[2, 6], [3, 6], [4, 6], [5, 6]]>,
  ChipIsInPositions<T, C, [[0, 0], [1, 1], [2, 2], [3, 3]]>,
  ChipIsInPositions<T, C, [[0, 1], [1, 2], [2, 3], [3, 4]]>,
  ChipIsInPositions<T, C, [[0, 2], [1, 3], [2, 4], [3, 5]]>,
  ChipIsInPositions<T, C, [[0, 3], [1, 4], [2, 5], [3, 6]]>,
  ChipIsInPositions<T, C, [[1, 0], [2, 1], [3, 2], [4, 3]]>,
  ChipIsInPositions<T, C, [[1, 1], [2, 2], [3, 3], [4, 4]]>,
  ChipIsInPositions<T, C, [[1, 2], [2, 3], [3, 4], [4, 5]]>,
  ChipIsInPositions<T, C, [[1, 3], [2, 4], [3, 5], [4, 6]]>,
  ChipIsInPositions<T, C, [[2, 0], [3, 1], [4, 2], [5, 3]]>,
  ChipIsInPositions<T, C, [[2, 1], [3, 2], [4, 3], [5, 4]]>,
  ChipIsInPositions<T, C, [[2, 2], [3, 3], [4, 4], [5, 5]]>,
  ChipIsInPositions<T, C, [[2, 3], [3, 4], [4, 5], [5, 6]]>,
  ChipIsInPositions<T, C, [[0, 3], [1, 2], [2, 1], [3, 0]]>,
  ChipIsInPositions<T, C, [[0, 4], [1, 3], [2, 2], [3, 1]]>,
  ChipIsInPositions<T, C, [[0, 5], [1, 4], [2, 3], [3, 2]]>,
  ChipIsInPositions<T, C, [[0, 6], [1, 5], [2, 4], [3, 3]]>,
  ChipIsInPositions<T, C, [[1, 3], [2, 2], [3, 1], [4, 0]]>,
  ChipIsInPositions<T, C, [[1, 4], [2, 3], [3, 2], [4, 1]]>,
  ChipIsInPositions<T, C, [[1, 5], [2, 4], [3, 3], [4, 2]]>,
  ChipIsInPositions<T, C, [[1, 6], [2, 5], [3, 4], [4, 3]]>,
  ChipIsInPositions<T, C, [[2, 3], [3, 2], [4, 1], [5, 0]]>,
  ChipIsInPositions<T, C, [[2, 4], [3, 3], [4, 2], [5, 1]]>,
  ChipIsInPositions<T, C, [[2, 5], [3, 4], [4, 3], [5, 2]]>,
  ChipIsInPositions<T, C, [[2, 6], [3, 5], [4, 4], [5, 3]]>,
][number]
  ? true
  : false;

type Connect4<T extends Connect4Game, P extends number> = T extends {
  board: infer B extends Connect4Board;
  state: infer S extends Connect4Chips;
}
  ? UpdateBoard<B, P, S> extends infer A extends Connect4Board
    ? {
        board: A;
        state: ChipWon<A, '🔴'> extends true
          ? '🔴 Won'
          : ChipWon<A, '🟡'> extends true
            ? '🟡 Won'
            : isDraw<A> extends true
              ? 'Draw'
              : S extends '🔴'
                ? '🟡'
                : '🔴';
      }
    : T
  : never;

/************************** TESTS **************************/
import { Expect, Equal } from 'type-testing';

type test_move1_actual = Connect4<NewGame, 0>;
//   ^?
type test_move1_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
  ];
  state: '🔴';
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = Connect4<test_move1_actual, 0>;
//   ^?
type test_move2_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
  ];
  state: '🟡';
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = Connect4<test_move2_actual, 0>;
//   ^?
type test_move3_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
  ];
  state: '🔴';
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = Connect4<test_move3_actual, 1>;
//   ^?
type test_move4_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '  ', '  ', '  ', '  ', '  '],
  ];
  state: '🟡';
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_move5_actual = Connect4<test_move4_actual, 2>;
//   ^?
type test_move5_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '  ', '  ', '  ', '  '],
  ];
  state: '🔴';
};
type test_move5 = Expect<Equal<test_move5_actual, test_move5_expected>>;

type test_move6_actual = Connect4<test_move5_actual, 1>;
//   ^?
type test_move6_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '🔴', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '  ', '  ', '  ', '  '],
  ];
  state: '🟡';
};
type test_move6 = Expect<Equal<test_move6_actual, test_move6_expected>>;

type test_red_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🔴', '🔴', '🔴', '  ', '  ', '  ', '  '],
      ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  '],
    ];
    state: '🔴';
  },
  3
>;

type test_red_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '🔴', '🔴', '🔴', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  '],
  ];
  state: '🔴 Won';
};

type test_red_win = Expect<Equal<test_red_win_actual, test_red_win_expected>>;

type test_yellow_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🔴', '  ', '🔴', '🔴', '  ', '  ', '  '],
      ['🟡', '  ', '🟡', '🟡', '  ', '  ', '  '],
    ];
    state: '🟡';
  },
  1
>;

type test_yellow_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '🔴', '🔴', '  ', '  ', '  '],
    ['🟡', '🟡', '🟡', '🟡', '  ', '  ', '  '],
  ];
  state: '🟡 Won';
};

type test_yellow_win = Expect<Equal<test_yellow_win_actual, test_yellow_win_expected>>;

type test_diagonal_yellow_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '🟡', '🔴', '  ', '  ', '  '],
      ['🔴', '🟡', '🔴', '🔴', '  ', '  ', '  '],
      ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  '],
    ];
    state: '🟡';
  },
  3
>;

type test_diagonal_yellow_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '🟡', '  ', '  ', '  '],
    ['  ', '  ', '🟡', '🔴', '  ', '  ', '  '],
    ['🔴', '🟡', '🔴', '🔴', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  '],
  ];
  state: '🟡 Won';
};

type test_diagonal_yellow_win = Expect<
  Equal<test_diagonal_yellow_win_actual, test_diagonal_yellow_win_expected>
>;

type test_draw_actual = Connect4<
  {
    board: [
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '  '],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
    ];
    state: '🟡';
  },
  6
>;

type test_draw_expected = {
  board: [
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
  ];
  state: 'Draw';
};

type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
