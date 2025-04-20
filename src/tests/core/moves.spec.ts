import { RubikCube } from "@src/core/cube";
import { applyMove } from "@src/core/moves";
import { clone2DArray } from "@src/tests/utils";
import { CubeFace, Move } from "@src/utils/types";
import { describe, beforeEach, it, expect } from "bun:test";

describe("RubikCube movement", () => {
  let cube: RubikCube;

  beforeEach(() => {
    cube = new RubikCube();
  });

  it("should rotate the front face clockwise", () => {
    const initialState = cube.getState().get(CubeFace.Front)!;
    applyMove(cube, Move.F);
    const newState = cube.getState().get(CubeFace.Front);
    expect(newState).toEqual([
      [initialState[2][0], initialState[1][0], initialState[0][0]],
      [initialState[2][1], initialState[1][1], initialState[0][1]],
      [initialState[2][2], initialState[1][2], initialState[0][2]],
    ]);
  });

  it("should rotate the front face counter clockwise", () => {
    const initialState = cube.getState().get(CubeFace.Front)!;
    applyMove(cube, Move.FPrime);
    const newState = cube.getState().get(CubeFace.Front);
    expect(newState).toEqual([
      [initialState[0][2], initialState[1][2], initialState[2][2]],
      [initialState[0][1], initialState[1][1], initialState[2][1]],
      [initialState[0][0], initialState[1][0], initialState[2][0]],
    ]);
  });

  it("should rotate adjacent faces correctly", () => {
    const initialState = cube.getState();

    const leftFace = clone2DArray(initialState.get(CubeFace.Left)!);
    const rightFace = clone2DArray(initialState.get(CubeFace.Right)!);
    const topFace = clone2DArray(initialState.get(CubeFace.Top)!);
    const bottomFace = clone2DArray(initialState.get(CubeFace.Bottom)!);

    applyMove(cube, Move.F);

    const newState = cube.getState();

    const newLeftFace = newState.get(CubeFace.Left);
    const newRightFace = newState.get(CubeFace.Right);
    const newTopFace = newState.get(CubeFace.Top);
    const newBottomFace = newState.get(CubeFace.Bottom);

    // Dynamically compute expected values based on initial state
    const expectedTopRow = leftFace.map((row) => row[2]).reverse();
    const expectedRightColumn = topFace[2];
    const expectedBottomRow = rightFace.map((row) => row[0]).reverse();
    const expectedLeftColumn = bottomFace[0];

    // Verify adjacent faces are updated correctly
    expect(newTopFace![2]).toEqual(expectedTopRow);
    expect(newRightFace!.map((row) => row[0])).toEqual(expectedRightColumn);
    expect(newBottomFace![0]).toEqual(expectedBottomRow);
    expect(newLeftFace!.map((row) => row[2])).toEqual(expectedLeftColumn);
  });

  it("should rotate adjacent faces correctly when rotating counterclockwise", () => {
    const initialState = cube.getState();

    const leftFace = clone2DArray(initialState.get(CubeFace.Left)!);
    const rightFace = clone2DArray(initialState.get(CubeFace.Right)!);
    const topFace = clone2DArray(initialState.get(CubeFace.Top)!);
    const bottomFace = clone2DArray(initialState.get(CubeFace.Bottom)!);

    applyMove(cube, Move.FPrime);

    const newState = cube.getState();

    const newLeftFace = newState.get(CubeFace.Left);
    const newRightFace = newState.get(CubeFace.Right);
    const newTopFace = newState.get(CubeFace.Top);
    const newBottomFace = newState.get(CubeFace.Bottom);

    const expectedTopRow = rightFace.map((row) => row[0]);
    const expectedRightColumn = [...bottomFace[0]].reverse();
    const expectedBottomRow = leftFace.map((row) => row[2]);
    const expectedLeftColumn = [...topFace[2]].reverse();

    expect(newTopFace![2]).toEqual(expectedTopRow);
    expect(newRightFace!.map((row) => row[0])).toEqual(expectedRightColumn);
    expect(newBottomFace![0]).toEqual(expectedBottomRow);
    expect(newLeftFace!.map((row) => row[2])).toEqual(expectedLeftColumn);
  });
});
