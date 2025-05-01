// noinspection JSSuspiciousNameCombination

import { Axis, CubeFace, RotationDirection } from "@src/utils/types";
import { RubikCube } from "@src/core/cube";

/**
 * Applies XYZ rotation to the cube
 * @param cube
 * @param axis
 * @param direction
 * @return void
 * @throws Error
 */
export function applyRotation(
  cube: RubikCube,
  axis: Axis,
  direction: RotationDirection
): void {
  switch (axis) {
    case Axis.X:
      rotateX(cube, direction);
      break;
    case Axis.Y:
      rotateY(cube, direction);
      break;
    case Axis.Z:
      rotateZ(cube, direction);
      break;
    default:
      throw new Error(`Invalid axis, ${axis}`);
  }
}

function rotateX(cube: RubikCube, direction: RotationDirection) {
  if (direction === RotationDirection.Clockwise) {
    cube.orientation = {
      top: CubeFace.Front,
      bottom: CubeFace.Back,
      front: CubeFace.Bottom,
      back: CubeFace.Top,
      left: CubeFace.Left,
      right: CubeFace.Right,
    };
  } else {
    cube.orientation = {
      top: CubeFace.Back,
      bottom: CubeFace.Front,
      front: CubeFace.Top,
      back: CubeFace.Bottom,
      left: CubeFace.Left,
      right: CubeFace.Right,
    };
  }
}

function rotateY(cube: RubikCube, direction: RotationDirection) {
  if (direction === RotationDirection.Clockwise) {
    cube.orientation = {
      top: CubeFace.Top,
      bottom: CubeFace.Bottom,
      left: CubeFace.Front,
      right: CubeFace.Back,
      front: CubeFace.Right,
      back: CubeFace.Left,
    };
  } else {
    cube.orientation = {
      top: CubeFace.Top,
      bottom: CubeFace.Bottom,
      left: CubeFace.Back,
      right: CubeFace.Front,
      front: CubeFace.Left,
      back: CubeFace.Right,
    };
  }
}

function rotateZ(cube: RubikCube, direction: RotationDirection) {
  if (direction === RotationDirection.Clockwise) {
    cube.orientation = {
      top: CubeFace.Left,
      bottom: CubeFace.Right,
      left: CubeFace.Bottom,
      right: CubeFace.Top,
      front: CubeFace.Front,
      back: CubeFace.Back,
    };
  } else {
    cube.orientation = {
      top: CubeFace.Right,
      bottom: CubeFace.Left,
      left: CubeFace.Top,
      right: CubeFace.Bottom,
      front: CubeFace.Back,
      back: CubeFace.Front,
    };
  }
}
