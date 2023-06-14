import { customAlphabet } from "nanoid";

const randId = (max: number = 1000) => Math.ceil(Math.random() * max);

export const randInputId = (prefix: string = "input") =>
  `${prefix}-${randId()}`;

/**
 * Remove text exceeding max length
 * @param str text to proceed
 * @param max max allowed length before truncating
 */
export const trucateString = (str: string, max: number): string => {
  return str.length <= max ? str : str.slice(0, max) + "...";
};

/**
 * Generates a unique random Id based on the the given length
 * @param len the id length (default 20)
 * @returns unique string id
 */
export const uniqueId = (len = 20): string => {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const id = customAlphabet(alphabet, len);

  return id();
};
