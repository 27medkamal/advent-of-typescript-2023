type ArrayOfLength<L extends number, P extends unknown[] = []> = P['length'] extends L
  ? P
  : ArrayOfLength<L, [unknown, ...P]>;

type Add<N1 extends number, N2 extends number> = [
  ...ArrayOfLength<N1>,
  ...ArrayOfLength<N2>,
]['length'] &
  number;

type DayCounter<B extends number, E extends number> = B extends E
  ? B
  : B | DayCounter<Add<B, 1>, E>;

/************************** TESTS **************************/
import { Expect, Equal } from 'type-testing';

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

// prettier-ignore
type DaysUntilChristmas =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;
