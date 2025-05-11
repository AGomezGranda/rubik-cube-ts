/*
Functions to include:
- map moves to cube face and rotation direction [x]
- rotate face clockwise and counterclockwise [x]

Rotate the entire cube:
- rotate cube axis [x]

Other functions to take into consideration:
- undo last move [x]
- list move history [x]
- reset cube to solved state [x]
- scramble cube [x]
*/

import {
  Axis,
  CubeColor,
  CubeFace,
  CubeMetadata,
  Move,
  MoveDefinition,
  OrientationState,
  RotationDirection,
} from "@src/utils/types";
import { randomUUIDv7 } from "bun";
import { applyMove, scrambleCube } from "@src/core/moves";
import { applyRotation } from "@src/core/rotation";

export class RubikCube {
  public state: Map<CubeFace, CubeColor[][]>;
  public metadata: CubeMetadata = {
    id: "",
    moveHistory: [],
  };
  public orientation: OrientationState;

  constructor() {
    this.state = new Map();
    this.metadata.id = randomUUIDv7();
    this.metadata.moveHistory = [];
    this.initializeCube();
    this.orientation = {
      top: CubeFace.Top,
      bottom: CubeFace.Bottom,
      left: CubeFace.Left,
      right: CubeFace.Right,
      front: CubeFace.Front,
      back: CubeFace.Back,
    };
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
    const currentOrientation = this.getOrientation();

    return {
      [Move.U]: {
        face: currentOrientation.top,
        direction: RotationDirection.Clockwise,
      },
      [Move.UPrime]: {
        face: currentOrientation.top,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.D]: {
        face: currentOrientation.bottom,
        direction: RotationDirection.Clockwise,
      },
      [Move.DPrime]: {
        face: currentOrientation.bottom,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.L]: {
        face: currentOrientation.left,
        direction: RotationDirection.Clockwise,
      },
      [Move.LPrime]: {
        face: currentOrientation.left,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.R]: {
        face: currentOrientation.right,
        direction: RotationDirection.Clockwise,
      },
      [Move.RPrime]: {
        face: currentOrientation.right,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.F]: {
        face: currentOrientation.front,
        direction: RotationDirection.Clockwise,
      },
      [Move.FPrime]: {
        face: currentOrientation.front,
        direction: RotationDirection.CounterClockwise,
      },
      [Move.B]: {
        face: currentOrientation.back,
        direction: RotationDirection.Clockwise,
      },
      [Move.BPrime]: {
        face: currentOrientation.back,
        direction: RotationDirection.CounterClockwise,
      },
    };
  }

  getState(): Map<CubeFace, CubeColor[][]> {
    return this.state;
  }

  resetCube(): void {
    this.initializeCube();
    this.metadata.moveHistory = [];
  }

  scramble(length: number = 20): void {
    scrambleCube(this, length);
  }

  applyMove(move: Move): void {
    applyMove(this, move);
  }

  getOrientation(): OrientationState {
    return this.orientation;
  }

  applyRotation(axis: Axis, direction: RotationDirection): void {
    applyRotation(this, axis, direction);
  }
}
