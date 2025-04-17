import { CubeFace, CubeColor } from "@src/utils/types";

export class RubikCube {
  private state: Map<CubeFace, CubeColor[][]>;

  constructor() {
    this.state = new Map();
    this.initializeCube();
  }

  /**
   * Logs the current state of the cube to the console.
   */
  public logState(): void {
    this.state.forEach((stickers, face) => {
      console.log(`${face} face: `);
      stickers.forEach((row) => console.log(row.join(" ")));
      console.log("");
    });
  }

  /**
   * Initializes the cube to a solved state.
   */
  private initializeCube(): void {
    this.state = new Map<CubeFace, CubeColor[][]>([
      [CubeFace.Front, Array(3).fill(Array(3).fill(CubeColor.Green))],
      [CubeFace.Back, Array(3).fill(Array(3).fill(CubeColor.Blue))],
      [CubeFace.Left, Array(3).fill(Array(3).fill(CubeColor.Orange))],
      [CubeFace.Right, Array(3).fill(Array(3).fill(CubeColor.Red))],
      [CubeFace.Top, Array(3).fill(Array(3).fill(CubeColor.White))],
      [CubeFace.Bottom, Array(3).fill(Array(3).fill(CubeColor.Yellow))],
    ]);
  }

  /**
   * Checks if the cube is in a solved state.
   */
  public isSolved(): boolean {
    for (const [, stickers] of this.state.entries()) {
      const color = stickers[0][0];
      for (const row of stickers) {
        if (row.some((sticker) => sticker !== color)) {
          return false;
        }
      }
    }
    return true;
  }
}
