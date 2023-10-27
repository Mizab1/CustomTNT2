import { BLOCKS, ITEMS, LiteralUnion, RootNBT, nbtParser } from "sandstone";

/**
 * Concatenates the given item with the parsed nbt string.
 *
 * @param {LiteralUnion<ITEMS>} item - The item to be concatenated.
 * @param {RootNBT} nbt - The nbt string to be parsed.
 * @return {string} The concatenated string.
 */
export function i(item: LiteralUnion<ITEMS>, nbt: RootNBT): string {
  return `${item}${nbtParser(nbt)}`;
}

/**
 * Generates a string by concatenating a block with its corresponding NBT.
 *
 * @param {LiteralUnion<BLOCKS>} block - The block to concatenate.
 * @param {RootNBT} nbt - The NBT to concatenate.
 * @return {string} The concatenated string.
 */
export function b(block: LiteralUnion<BLOCKS>, nbt: RootNBT): string {
  return `${block}${nbtParser(nbt)}`;
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value for the random integer.
 * @param {number} max - The maximum value for the random integer.
 * @return {number} The generated random integer.
 */
export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomFloatFromInterval(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

/**
 * Generates a random number within a given range, excluding certain values.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {number[]} exclude - An array of values to exclude from the range.
 * @returns {number | null} - A random number within the range, excluding the specified values. Returns null if all values are excluded.
 */
export function getRandomNumberInRange(
  min: number,
  max: number,
  exclude: number[]
): number | null {
  if (max <= min) {
    throw new Error("Invalid range. 'max' should be greater than 'min'.");
  }

  const range = Array.from(
    { length: max - min + 1 },
    (_, index) => min + index
  );

  // Filter out excluded values
  const availableValues = range.filter((value) => !exclude.includes(value));

  if (availableValues.length === 0) {
    // All values are excluded, return null or handle it as you like
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableValues.length);
  return availableValues[randomIndex];
}
