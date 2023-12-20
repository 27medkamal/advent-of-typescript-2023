type Letters = {
  'A': ['█▀█ ', '█▀█ ', '▀ ▀ '];
  'B': ['█▀▄ ', '█▀▄ ', '▀▀  '];
  'C': ['█▀▀ ', '█ ░░', '▀▀▀ '];
  'E': ['█▀▀ ', '█▀▀ ', '▀▀▀ '];
  'H': ['█ █ ', '█▀█ ', '▀ ▀ '];
  'I': ['█ ', '█ ', '▀ '];
  'M': ['█▄░▄█ ', '█ ▀ █ ', '▀ ░░▀ '];
  'N': ['█▄░█ ', '█ ▀█ ', '▀ ░▀ '];
  'P': ['█▀█ ', '█▀▀ ', '▀ ░░'];
  'R': ['█▀█ ', '██▀ ', '▀ ▀ '];
  'S': ['█▀▀ ', '▀▀█ ', '▀▀▀ '];
  'T': ['▀█▀ ', '░█ ░', '░▀ ░'];
  'Y': ['█ █ ', '▀█▀ ', '░▀ ░'];
  'W': ['█ ░░█ ', '█▄▀▄█ ', '▀ ░ ▀ '];
  ' ': ['░', '░', '░'];
  ':': ['#', '░', '#'];
  '*': ['░', '#', '░'];
};

type GetLetter<TLetter extends string> = Uppercase<TLetter> extends keyof Letters
  ? Letters[Uppercase<TLetter>]
  : ['', '', ''];

type StringToLines<TString extends string> = TString extends `${infer IFirst}\n${infer IRest}`
  ? [IFirst, ...StringToLines<IRest>]
  : [TString];

type LineToAsciiArt<
  TLine extends string,
  TResult extends string[] = [],
> = TLine extends `${infer ILetter extends string}${infer IRest extends string}`
  ? GetLetter<ILetter> extends [
      infer ILetter1 extends string,
      infer ILetter2 extends string,
      infer ILetter3 extends string,
    ]
    ? LineToAsciiArt<
        IRest,
        [
          `${TResult[0] extends string ? TResult[0] : ''}${ILetter1}`,
          `${TResult[1] extends string ? TResult[1] : ''}${ILetter2}`,
          `${TResult[2] extends string ? TResult[2] : ''}${ILetter3}`,
        ]
      >
    : TResult
  : TResult;

type FlattenList<TList extends unknown[]> = TList extends [
  infer IFirst extends unknown[],
  ...infer IRest,
]
  ? [...IFirst, ...FlattenList<IRest>]
  : [];

type LinesToAsciiArt<TLines extends string[]> = FlattenList<{
  [TKey in keyof TLines]: LineToAsciiArt<TLines[TKey]>;
}>;

type ToAsciiArt<TString extends string> = LinesToAsciiArt<StringToLines<TString>>;

/************************** TESTS **************************/
import { Equal, Expect } from 'type-testing';

type test_0_actual = ToAsciiArt<'   * : * Merry * : *   \n  Christmas  '>;
//   ^?
type test_0_expected = [
  '░░░░░#░░░█▄░▄█ █▀▀ █▀█ █▀█ █ █ ░░░#░░░░░',
  '░░░#░░░#░█ ▀ █ █▀▀ ██▀ ██▀ ▀█▀ ░#░░░#░░░',
  '░░░░░#░░░▀ ░░▀ ▀▀▀ ▀ ▀ ▀ ▀ ░▀ ░░░░#░░░░░',
  '░░█▀▀ █ █ █▀█ █ █▀▀ ▀█▀ █▄░▄█ █▀█ █▀▀ ░░',
  '░░█ ░░█▀█ ██▀ █ ▀▀█ ░█ ░█ ▀ █ █▀█ ▀▀█ ░░',
  '░░▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀▀▀ ░▀ ░▀ ░░▀ ▀ ▀ ▀▀▀ ░░',
];
type test_0 = Expect<Equal<test_0_actual, test_0_expected>>;

type test_1_actual = ToAsciiArt<'  Happy new  \n  * : * : * Year * : * : *  '>;
//   ^?
type test_1_expected = [
  '░░█ █ █▀█ █▀█ █▀█ █ █ ░█▄░█ █▀▀ █ ░░█ ░░',
  '░░█▀█ █▀█ █▀▀ █▀▀ ▀█▀ ░█ ▀█ █▀▀ █▄▀▄█ ░░',
  '░░▀ ▀ ▀ ▀ ▀ ░░▀ ░░░▀ ░░▀ ░▀ ▀▀▀ ▀ ░ ▀ ░░',
  '░░░░#░░░#░░░█ █ █▀▀ █▀█ █▀█ ░░░#░░░#░░░░',
  '░░#░░░#░░░#░▀█▀ █▀▀ █▀█ ██▀ ░#░░░#░░░#░░',
  '░░░░#░░░#░░░░▀ ░▀▀▀ ▀ ▀ ▀ ▀ ░░░#░░░#░░░░',
];
type test_1 = Expect<Equal<test_1_actual, test_1_expected>>;

type test_2_actual = ToAsciiArt<'  * : * : * : * : * : * \n  Trash  \n  * : * : * : * : * : * '>;
//   ^?
type test_2_expected = [
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░▀█▀ █▀█ █▀█ █▀▀ █ █ ░░',
  '░░░█ ░██▀ █▀█ ▀▀█ █▀█ ░░',
  '░░░▀ ░▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀ ░░',
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░',
];
type test_2 = Expect<Equal<test_2_actual, test_2_expected>>;

type test_3_actual =
  ToAsciiArt<'  : * : * : * : * : * : * : \n  Ecyrbe  \n  : * : * : * : * : * : * : '>;
//   ^?
type test_3_expected = [
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░█▀▀ █▀▀ █ █ █▀█ █▀▄ █▀▀ ░░',
  '░░█▀▀ █ ░░▀█▀ ██▀ █▀▄ █▀▀ ░░',
  '░░▀▀▀ ▀▀▀ ░▀ ░▀ ▀ ▀▀  ▀▀▀ ░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
];
type test_3 = Expect<Equal<test_3_actual, test_3_expected>>;
