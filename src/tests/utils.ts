import {CubeColor, CubeFace} from "@src/utils/types";

export const clone2DArray = <T>(arr: T[][]): T[][] =>
  arr.map((row) => [...row]);

export function deepCopyMap(originalMap: Map<CubeFace, CubeColor[][]>): Map<CubeFace, CubeColor[][]> {
    const newMap = new Map<CubeFace, CubeColor[][]>();
    for (const [k, v] of originalMap){
        newMap.set(k, clone2DArray(v));
    }
    return newMap;
}

