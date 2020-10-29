/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Cell {
  Dead,
  Alive,
}
/**
*/
export class Universe {
  free(): void;
/**
*/
  tick(): void;
/**
* @param {number} width
* @param {number} height
* @param {Uint32Array} pattern
* @returns {Universe}
*/
  static new_pattern(width: number, height: number, pattern: Uint32Array): Universe;
/**
* @param {number} width
* @param {number} height
* @returns {Universe}
*/
  static new(width: number, height: number): Universe;
/**
* @returns {string}
*/
  render(): string;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  height(): number;
/**
* @returns {number}
*/
  cells(): number;
}
