import {
  CubeFace,
  CubeColor,
  Move,
  MoveDefinition,
  RotationDirection,
} from "@src/utils/types";

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
      [
        CubeFace.Front,
        Array(3)
          .fill(0)
          .map(() => Array(3).fill(CubeColor.Green)),
      ],
      [
        CubeFace.Back,
        Array(3)
          .fill(0)
          .map(() => Array(3).fill(CubeColor.Blue)),
      ],
      [
        CubeFace.Left,
        Array(3)
          .fill(0)
          .map(() => Array(3).fill(CubeColor.Orange)),
      ],
      [
        CubeFace.Right,
        Array(3)
          .fill(0)
          .map(() => Array(3).fill(CubeColor.Red)),
      ],
      [
        CubeFace.Top,
        Array(3)
          .fill(0)
          .map(() => Array(3).fill(CubeColor.White)),
      ],
      [
        CubeFace.Bottom,
        Array(3)
          .fill(0)
          .map(() => Array(3).fill(CubeColor.Yellow)),
      ],
    ]);
  }

  /**
   * Checks if the cube is in a solved state.
   */
  public isSolved(): boolean {
    for (const [_, stickers] of this.state.entries()) {
      const color = stickers[0][0];
      for (const row of stickers) {
        if (row.some((sticker) => sticker !== color)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Maps moves to cube face and rotation direction.
   * @param move - The move to be mapped.
   * @returns An object containing the cube face and rotation direction.
   */
  public mapMoveToFaceAndDirection(move: Move): MoveDefinition {
    const moveMap = this.getMoveMap();
    return moveMap[move];
  }

  private getMoveMap(): Record<Move, MoveDefinition> {
    return {
      [Move.U]: {
        face: CubeFace.Top,
        direction: RotationDirection.Clockwise,
      },
      [Move.UPrime]: {
        face: CubeFace.Top,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.D]: {
        face: CubeFace.Bottom,
        direction: RotationDirection.Clockwise,
      },
      [Move.DPrime]: {
        face: CubeFace.Bottom,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.L]: {
        face: CubeFace.Left,
        direction: RotationDirection.Clockwise,
      },
      [Move.LPrime]: {
        face: CubeFace.Left,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.R]: {
        face: CubeFace.Right,
        direction: RotationDirection.Clockwise,
      },
      [Move.RPrime]: {
        face: CubeFace.Right,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.F]: {
        face: CubeFace.Front,
        direction: RotationDirection.Clockwise,
      },
      [Move.FPrime]: {
        face: CubeFace.Front,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.B]: {
        face: CubeFace.Back,
        direction: RotationDirection.Clockwise,
      },
      [Move.BPrime]: {
        face: CubeFace.Back,
        direction: RotationDirection.CounterClockwise,
      },
    };
  }

  getState(): Map<CubeFace, CubeColor[][]> {
    return this.state;
  }

}
