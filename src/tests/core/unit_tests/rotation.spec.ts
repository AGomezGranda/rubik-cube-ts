import { beforeEach, describe, expect, it } from "bun:test";
import { RubikCube } from "@src/core/cube";
import { applyRotation } from "@src/core/rotation";
import {
  Axis,
  CubeFace,
  OrientationState,
  RotationDirection,
} from "@src/utils/types";

describe("Cube rotation", () => {
  let cube: RubikCube;

  beforeEach(() => {
    cube = new RubikCube();
  });

  it("should rotate the cube X axis clockwise", () => {
    applyRotation(cube, Axis.X, RotationDirection.Clockwise);
    const expectedRotation: OrientationState = {
      top: CubeFace.Front,
      bottom: CubeFace.Back,
      left: CubeFace.Left,
      right: CubeFace.Right,
      front: CubeFace.Bottom,
      back: CubeFace.Top,
    };
    expect(cube.getOrientation()).toEqual(expectedRotation);
  });

  it("should rotate the cube X axis counterclockwise", () => {
    applyRotation(cube, Axis.X, RotationDirection.CounterClockwise);
    const expectedRotation: OrientationState = {
      top: CubeFace.Back,
      bottom: CubeFace.Front,
      left: CubeFace.Left,
      right: CubeFace.Right,
      front: CubeFace.Top,
      back: CubeFace.Bottom,
    };
    expect(cube.getOrientation()).toEqual(expectedRotation);
  });

  it("should rotate the cube Y axis clockwise", () => {
    applyRotation(cube, Axis.Y, RotationDirection.Clockwise);
    const expectedRotation: OrientationState = {
      top: CubeFace.Top,
      bottom: CubeFace.Bottom,
      left: CubeFace.Front,
      right: CubeFace.Back,
      front: CubeFace.Right,
      back: CubeFace.Left,
    };
    expect(cube.getOrientation()).toEqual(expectedRotation);
  });
  it("should rotate the cube Y axis counter clockwise", () => {
    applyRotation(cube, Axis.Y, RotationDirection.CounterClockwise);
    const expectedRotation: OrientationState = {
      top: CubeFace.Top,
      bottom: CubeFace.Bottom,
      left: CubeFace.Back,
      right: CubeFace.Front,
      front: CubeFace.Left,
      back: CubeFace.Right,
    };
    expect(cube.getOrientation()).toEqual(expectedRotation);
  });

  it("should rotate the cube Z axis clockwise", () => {
    applyRotation(cube, Axis.Z, RotationDirection.Clockwise);
    const expectedRotation: OrientationState = {
      top: CubeFace.Left,
      bottom: CubeFace.Right,
      left: CubeFace.Bottom,
      right: CubeFace.Top,
      front: CubeFace.Front,
      back: CubeFace.Back,
    };
    expect(cube.getOrientation()).toEqual(expectedRotation);
  });

  it("should rotate the cube Z axis counter clockwise", () => {
    applyRotation(cube, Axis.Z, RotationDirection.CounterClockwise);
    const expectedRotation: OrientationState = {
      top: CubeFace.Right,
      bottom: CubeFace.Left,
      left: CubeFace.Top,
      right: CubeFace.Bottom,
      front: CubeFace.Back,
      back: CubeFace.Front,
    };
    expect(cube.getOrientation()).toEqual(expectedRotation);
  });
  it("should throw an exception if another axis is defined", () => {
    expect(() => {
      applyRotation(cube, "A" as Axis, RotationDirection.Clockwise);
    }).toThrow(Error);
  });
});
