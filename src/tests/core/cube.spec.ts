import { afterEach, beforeEach, describe, expect, it } from "bun:test";

import { RubikCube } from "@src/core/cube";
import { CubeFace, CubeColor, Move, RotationDirection } from "@src/utils/types";
import {applyMove} from "@src/core/moves";
import {deepCopyMap} from "@tests/utils";

describe("RubikCube", () => {
  let originalConsoleLog: (...args: any[]) => void;
  const consoleLogs: string[] = [];

  beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = (...args: any[]) => {
      consoleLogs.push(args.join(" "));
    };
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    consoleLogs.length = 0; // Clear the logs after each test
  });

  it("should initialize with the correct state", () => {
    const cube = new RubikCube();

    expect(cube.state.get(CubeFace.Front)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Green))
    );
    expect(cube.state.get(CubeFace.Back)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Blue))
    );
    expect(cube.state.get(CubeFace.Left)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Orange))
    );
    expect(cube.state.get(CubeFace.Right)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Red))
    );
    expect(cube.state.get(CubeFace.Top)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.White))
    );
    expect(cube.state.get(CubeFace.Bottom)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Yellow))
    );
  });

  it("should log the correct state", () => {
    const cube = new RubikCube();
    cube.logState();

    const expectedLogs = [
      `${CubeFace.Front} face: `,
      `${CubeColor.Green} ${CubeColor.Green} ${CubeColor.Green}`,
      `${CubeColor.Green} ${CubeColor.Green} ${CubeColor.Green}`,
      `${CubeColor.Green} ${CubeColor.Green} ${CubeColor.Green}`,
      "",
      `${CubeFace.Back} face: `,
      `${CubeColor.Blue} ${CubeColor.Blue} ${CubeColor.Blue}`,
      `${CubeColor.Blue} ${CubeColor.Blue} ${CubeColor.Blue}`,
      `${CubeColor.Blue} ${CubeColor.Blue} ${CubeColor.Blue}`,
      "",
      `${CubeFace.Left} face: `,
      `${CubeColor.Orange} ${CubeColor.Orange} ${CubeColor.Orange}`,
      `${CubeColor.Orange} ${CubeColor.Orange} ${CubeColor.Orange}`,
      `${CubeColor.Orange} ${CubeColor.Orange} ${CubeColor.Orange}`,
      "",
      `${CubeFace.Right} face: `,
      `${CubeColor.Red} ${CubeColor.Red} ${CubeColor.Red}`,
      `${CubeColor.Red} ${CubeColor.Red} ${CubeColor.Red}`,
      `${CubeColor.Red} ${CubeColor.Red} ${CubeColor.Red}`,
      "",
      `${CubeFace.Top} face: `,
      `${CubeColor.White} ${CubeColor.White} ${CubeColor.White}`,
      `${CubeColor.White} ${CubeColor.White} ${CubeColor.White}`,
      `${CubeColor.White} ${CubeColor.White} ${CubeColor.White}`,
      "",
      `${CubeFace.Bottom} face: `,
      `${CubeColor.Yellow} ${CubeColor.Yellow} ${CubeColor.Yellow}`,
      `${CubeColor.Yellow} ${CubeColor.Yellow} ${CubeColor.Yellow}`,
      `${CubeColor.Yellow} ${CubeColor.Yellow} ${CubeColor.Yellow}`,
      "",
    ];

    const actualLogs = consoleLogs.map((args: string) => args);
    expect(actualLogs).toEqual(expectedLogs);
  });

  it("should check if the cube initialize cube is in solved state", () => {
    const cube = new RubikCube();
    expect(cube.isSolved()).toBe(true);
  });

  it("should not be in a solved state if the cube state is modified", () => {
    const cube = new RubikCube();

    const frontFace = cube.state.get(CubeFace.Front);
    if (frontFace) {
      frontFace[0][0] = CubeColor.Red;
    }

    expect(cube.isSolved()).toBe(false);
  });

  it("should map the moves to the correct cube face and rotation direction", () => {
    const cube = new RubikCube();
    const moves = [
      {
        move: Move.B,
        expectedFace: CubeFace.Back,
        expectedDirection: RotationDirection.Clockwise,
      },
      {
        move: Move.BPrime,
        expectedFace: CubeFace.Back,
        expectedDirection: RotationDirection.CounterClockwise,
      },
      {
        move: Move.D,
        expectedFace: CubeFace.Bottom,
        expectedDirection: RotationDirection.Clockwise,
      },
      {
        move: Move.DPrime,
        expectedFace: CubeFace.Bottom,
        expectedDirection: RotationDirection.CounterClockwise,
      },
      {
        move: Move.L,
        expectedFace: CubeFace.Left,
        expectedDirection: RotationDirection.Clockwise,
      },
      {
        move: Move.LPrime,
        expectedFace: CubeFace.Left,
        expectedDirection: RotationDirection.CounterClockwise,
      },
      {
        move: Move.R,
        expectedFace: CubeFace.Right,
        expectedDirection: RotationDirection.Clockwise,
      },
      {
        move: Move.RPrime,
        expectedFace: CubeFace.Right,
        expectedDirection: RotationDirection.CounterClockwise,
      },
      {
        move: Move.F,
        expectedFace: CubeFace.Front,
        expectedDirection: RotationDirection.Clockwise,
      },
      {
        move: Move.FPrime,
        expectedFace: CubeFace.Front,
        expectedDirection: RotationDirection.CounterClockwise,
      },
      {
        move: Move.U,
        expectedFace: CubeFace.Top,
        expectedDirection: RotationDirection.Clockwise,
      },
      {
        move: Move.UPrime,
        expectedFace: CubeFace.Top,
        expectedDirection: RotationDirection.CounterClockwise,
      },
    ];
    moves.forEach(({ move, expectedFace, expectedDirection }) => {
      const { face, direction } = cube.mapMoveToFaceAndDirection(move);
      expect(face).toBe(expectedFace);
      expect(direction).toBe(expectedDirection);
    });
  });

  it('should return the state of the cube properly', () => {
        const cube = new RubikCube();
        const state = cube.getState();
        expect(state).toEqual(cube.state);
    });

  it('should reset the cube state and movement history', () => {
    const cube = new RubikCube();
    const originalState = deepCopyMap(cube.getState())
    cube.applyMove(Move.F);
    cube.resetCube()
    const resetState = cube.getState();
    expect(resetState).toEqual(originalState);
    expect(cube.metadata.moveHistory.length).toBe(0);
  });

  it('should scramble the cube', () => {
    const cube = new RubikCube();
    const originalState = deepCopyMap(cube.getState())
    cube.scramble(20)
    const newState = cube.getState();
    expect(cube.metadata.moveHistory.length).toBe(20);
    expect(newState).not.toEqual(originalState);
  });
});
