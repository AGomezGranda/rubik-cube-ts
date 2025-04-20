export const clone2DArray = <T>(arr: T[][]): T[][] =>
  arr.map((row) => [...row]);
