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

export enum Axis {
  X = "X",
  Y = "Y",
  Z = "Z",
}

export interface OrientationState {
  front: CubeFace;
  back: CubeFace;
  left: CubeFace;
  right: CubeFace;
  top: CubeFace;
  bottom: CubeFace;
}

export type MoveDefinition = {
  face: CubeFace;
  direction: RotationDirection;
  count?: number;
};

export type CubeMetadata = {
  id: string;
  moveHistory: Move[];
};
