import { customAlphabet } from "nanoid";
import { Session } from "next-auth";
// import { prisma } from "../../prisma/db";

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

/**
 * Return whether the session belongs to the admin
 * @param session
 * @returns
 */
export const isAdmin = (session: Session | null) => {
  return session && session.user?.email === process.env.GOOGLE_ADMIN_EMAIL;
};

/**
 * Used to simulate network latency
 */
export const sleep = (timeInMs: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
};

/**
 * Converts a number string to a number
 * @param n String number
 * @returns The converted number. If the provided string was not a valid number returns 0
 */
export const toNumber = (n: string) => {
  const converted = parseInt(n.trim());
  return !isNaN(converted) && isFinite(converted) ? converted : 0;
};

/**
 * Converts a number string to a number
 * @param n The string number
 * @returns returns the converted number, if a wrrong number is supplied or "0" returns null
 */
export const toNumberOrNull = (n: string): number | null => {
  const converted = parseInt(n.trim());
  return !isNaN(converted) && isFinite(converted) && converted !== 0
    ? converted
    : null;
};
