import { RubikCube } from "@src/core/cube";

const cube = new RubikCube();

console.log("Cube initial data: \n")
console.log(cube.metadata);

console.log("Initial state of the Rubik's Cube: \n");
cube.logState();