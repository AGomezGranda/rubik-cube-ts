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

export enum Move {
  U = "U",
  UPrime = "U'",
  D = "D",
  DPrime = "D'",
  L = "L",
  LPrime = "L'",
  R = "R",
  RPrime = "R'",
  F = "F",
  FPrime = "F'",
  B = "B",
  BPrime = "B'",
}

export enum RotationDirection { 
  Clockwise = "clockwise",
  CounterClockwise = "counterclockwise",
}

  export enum CubeRotation {
  X = "X",
  Y = "Y",
  Z = "Z",
}

export type MoveDefinition = {
  face: CubeFace;
  direction: RotationDirection;
  count?: number
};

export type Cube = {
  [faces in CubeFace]: CubeFaceData;
};

type CubeFaceData = {
  stickers: CubeColor[][]; // 2D array representing a 3x3 grid of colors
  face: CubeFace;
  metadata?: CubeMetadata;
};

type CubeMetadata = {
  id: string;
  moveHistory: Move[];
};
