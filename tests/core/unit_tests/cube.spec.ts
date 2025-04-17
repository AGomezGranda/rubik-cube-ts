import { afterEach, beforeEach, describe, expect, it } from "bun:test";

import { RubikCube } from "@src/core/cube";
import { CubeFace, CubeColor } from "@src/utils/types";

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

    expect(cube["state"].get(CubeFace.Front)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Green))
    );
    expect(cube["state"].get(CubeFace.Back)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Blue))
    );
    expect(cube["state"].get(CubeFace.Left)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Orange))
    );
    expect(cube["state"].get(CubeFace.Right)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.Red))
    );
    expect(cube["state"].get(CubeFace.Top)).toEqual(
      Array(3).fill(Array(3).fill(CubeColor.White))
    );
    expect(cube["state"].get(CubeFace.Bottom)).toEqual(
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

    // Modify the state of the cube
    const frontFace = cube["state"].get(CubeFace.Front);
    if (frontFace) {
      frontFace[0][0] = CubeColor.Red;
    }

    expect(cube.isSolved()).toBe(false);
  });
});
