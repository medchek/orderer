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
