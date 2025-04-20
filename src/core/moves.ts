/* 
Functions to include:
- map moves to cube face and rotation direction [x]
- rotate face clockwise & counterclockwise [x]

Rotate entire cube:
- rotate cube axis clockwise
- rotate cube axis counterclockwise

Other functions to take into consideration:
- undo last move
- redo last move
- reset cube to solved state
- scramble cube
*/

import { CubeColor, CubeFace, Move, RotationDirection } from "@src/utils/types";
import { RubikCube } from "./cube";

/**
 * Applies a move to the cube.
 * @param cube - The Rubik's Cube instance.
 * @param move - The move to be applied.
 * @returns void
 * @throws Error if the move is invalid.
 * @throws Error if the rotation direction is invalid.
 */
export function applyMove(cube: RubikCube, move: Move): void {
  const { face, direction } = cube.mapMoveToFaceAndDirection(move);
  rotateFace(cube, face, direction);
}

/**
 * Rotates the specified face of the cube clockwise.
 * @param cube - The Rubik's Cube instance.
 * @param face - The face to be rotated.
 * @param direction - The direction of rotation.
 * @returns void
 * @throws Error if the face is not valid.
 */
export function rotateFace(
  cube: RubikCube,
  face: CubeFace,
  direction: RotationDirection
): void {
  if (!Object.values(CubeFace).includes(face)) {
    throw new Error(`Invalid face: ${face}`);
  }
  const stickers = cube.getState().get(face);
  if (!stickers) {
    throw new Error(`Face ${face} not found in cube state`);
  }
  const newStickers = rotateFaceMatrix(stickers, direction);
  cube.getState().set(face, newStickers);

  // Update adjacent faces
  updateAdjacentFaces(cube, face, direction === RotationDirection.Clockwise);
}

/**
 * Rotates a face matrix in the specified direction.
 * @param color - The 2D array representing the face colors.
 * @param direction - The direction to rotate the face.
 * @returns The rotated 2D array.
 */
function rotateFaceMatrix(
  color: CubeColor[][],
  direction: RotationDirection
): CubeColor[][] {
  const rotated = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rotated[i][j] =
        direction === RotationDirection.Clockwise
          ? color[2 - j][i]
          : color[j][2 - i];
    }
  }
  return rotated;
}

/**
 * Updates the adjacent faces when a face is rotated.
 * @param cube - The Rubik's Cube instance.
 * @param face - The face being rotated.
 * @param clockwise - Whether the rotation is clockwise.
 * @returns void
 */
function updateAdjacentFaces(
  cube: RubikCube,
  face: CubeFace,
  clockwise: boolean
): void {
  const state: Map<CubeFace, CubeColor[][]> = cube.getState();

  const adjacentMapping = getAdjacentMapping(face);
  if (!adjacentMapping) {
    throw new Error(`No adjacent mapping defined for face: ${face}`);
  }

  console.log("Before updating adjacent faces:");
  cube.logState();

  const extracted = extractAdjacentRowsOrColumns(state, adjacentMapping);
  console.log("Extracted rows/columns:", extracted);

  const rotated = rotateAdjacentRowsOrColumns(extracted, clockwise);
  console.log("Rotated rows/columns:", rotated);

  applyRotatedRowsOrColumns(state, adjacentMapping, rotated);

  console.log("After updating adjacent faces:");
  cube.logState();
}

function getAdjacentMapping(
  face: CubeFace
): { face: CubeFace; row?: number; col?: number; reversed?: boolean }[] {
  const adjacentMapping: Record<
    CubeFace,
    { face: CubeFace; row?: number; col?: number; reversed?: boolean }[]
  > = {
    [CubeFace.Front]: [
      { face: CubeFace.Top, row: 2, reversed: false },
      { face: CubeFace.Right, col: 0, reversed: false },
      { face: CubeFace.Bottom, row: 0, reversed: true },
      { face: CubeFace.Left, col: 2, reversed: true },
    ],
    [CubeFace.Back]: [
      { face: CubeFace.Top, row: 0, reversed: true },
      { face: CubeFace.Left, col: 0, reversed: false },
      { face: CubeFace.Bottom, row: 2, reversed: false },
      { face: CubeFace.Right, col: 2, reversed: true },
    ],
    [CubeFace.Left]: [
      { face: CubeFace.Top, col: 0, reversed: false },
      { face: CubeFace.Front, col: 0, reversed: false },
      { face: CubeFace.Bottom, col: 0, reversed: false },
      { face: CubeFace.Back, col: 2, reversed: true },
    ],
    [CubeFace.Right]: [
      { face: CubeFace.Top, col: 2, reversed: false },
      { face: CubeFace.Back, col: 0, reversed: true },
      { face: CubeFace.Bottom, col: 2, reversed: false },
      { face: CubeFace.Front, col: 2, reversed: false },
    ],
    [CubeFace.Top]: [
      { face: CubeFace.Back, row: 0, reversed: true },
      { face: CubeFace.Right, row: 0, reversed: false },
      { face: CubeFace.Front, row: 0, reversed: false },
      { face: CubeFace.Left, row: 0, reversed: true },
    ],
    [CubeFace.Bottom]: [
      { face: CubeFace.Front, row: 2, reversed: false },
      { face: CubeFace.Right, row: 2, reversed: false },
      { face: CubeFace.Back, row: 2, reversed: true },
      { face: CubeFace.Left, row: 2, reversed: true },
    ],
  };
  return adjacentMapping[face];
}

function extractAdjacentRowsOrColumns(
  state: Map<CubeFace, CubeColor[][]>,
  adjacentMapping: { face: CubeFace; row?: number; col?: number; reversed?: boolean }[]
): CubeColor[][] {
  return adjacentMapping.map(({ face, row, col, reversed }) => {
    const stickers = state.get(face)!;
    let extracted;
    if (row !== undefined) extracted = stickers[row];
    else if (col !== undefined) extracted = stickers.map((r) => r[col]);
    else throw new Error("Invalid adjacent mapping");

    return reversed ? extracted.reverse() : extracted;
  });
}

function rotateAdjacentRowsOrColumns(
  extracted: CubeColor[][],
  clockwise: boolean
): CubeColor[][] {
  return clockwise
    ? [extracted[3], extracted[0], extracted[1], extracted[2]]
    : [extracted[1], extracted[2], extracted[3], extracted[0]];
}

function applyRotatedRowsOrColumns(
  state: Map<CubeFace, CubeColor[][]>,
  adjacentMapping: { face: CubeFace; row?: number; col?: number }[],
  rotated: CubeColor[][]
): void {
  adjacentMapping.forEach(({ face, row, col }, index) => {
    const stickers = state.get(face)!;
    if (row !== undefined) {
      // Update the entire row
      stickers[row] = [...rotated[index]];
    } else if (col !== undefined) {
      // Update the entire column
      rotated[index].forEach((value, i) => {
        stickers[i][col] = value;
      });
    }
  });
}
