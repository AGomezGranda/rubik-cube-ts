export enum CubeFace {
  Front = "front",
  Back = "back",
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

export enum CubeColor {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Yellow = "yellow",
  White = "white",
  Orange = "orange",
}

export enum RotationDirection {
  Clockwise = "clockwise",
  CounterClockwise = "counterclockwise",
}

export type Cube = {
  [faces in CubeFace]: CubeFaceData;
};

export type CubeMove = {
  face: CubeFace;
  direction: RotationDirection;
};

type CubeFaceData = {
  stickers: CubeColor[][]; // 2D array representing a 3x3 grid of colors
  face: CubeFace;
  metadata: CubeMetadata;
};

type CubeMetadata = {
  id: string; // Unique identifier for the cube state
  moveHistory: CubeMove[]; // Array of moves made to reach this state
};

// we wont use this for now
//
// export enum Move {
//   Up = "U",
//   Down = "D",
//   Left = "L",
//   Right = "R",
//   Front = "F",
//   Back = "B",
// }
