import { customAlphabet } from "nanoid";
import { NextResponse } from 'next/server';
import type { JSX } from 'react';
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

export const randomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Generates a unique random Id based on the the given length
 * @param len the id length (default 20)
 * @param uppercaseOnly generate a unique id with uppercase and numbers only (default false)
 * @returns unique string id
 */
export const uniqueId = (len = 20, uppercaseOnly = false): string => {
  const initAlphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const alphabet = initAlphabet.concat(!uppercaseOnly ? "abcdefghijklmnopqrstuvwxyz" : "")

  const id = customAlphabet(alphabet, len);

  return id();
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
 * @returns returns the converted number, if a wrong number is supplied or "0" returns null
 */
export const toNumberOrNull = (n: string): number | null => {
  const converted = parseInt(n.trim());
  return !isNaN(converted) && isFinite(converted) && converted !== 0
    ? converted
    : null;
};

export const getImageDirectUrl = (imageId: string) =>
  `https://lh5.googleusercontent.com/d/${imageId}`;

/**
 * converts an empty string to null value otherwise returns the string
 * @param string the string to be checked
 * @param includeZeroString convert string containing zero "0" to null as well
 * @returns null if empty string, otherwise the string itself
 */
export const toNullIfEmptyString = (
  string: string | null,
  includeZeroString = false
) => {
  if (string === null) return null;
  const str = string.trim();
  if (str === "" || !str) return null;
  if (includeZeroString && str === "0") return null;
  return str;
};


/**
 * Sends a structured json response to the client.
 * @param message the error message - default: Internal server error
 * @param status the error http status code- default: 500
 * @returns NextResponse json response
 */
export const apiErrorResponse = (message?: string, status?: number) => {
  return NextResponse.json({
    error: {
      message: message ?? "Internal server error",
      status: status ?? 500
    }
  }, {
    status: status ?? 500
  })
}
