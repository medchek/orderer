import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@prisma/client";
import {
  PRISMA_NOT_FOUND_ERROR_CODE,
  PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE,
} from "./constants";

// import { prisma } from "../../prisma/db";

const randId = (max: number = 1000) => Math.ceil(Math.random() * max);
/**
 * Adds zero before a single number
 * @param n single number i.e 0 to 9
 * @returns the number prefixed with 0
 */
export const zeroPrefix = (n: number) => (n < 10 && n > -10 ? `0${n}` : n);

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
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generates a unique random Id based on the the given length
 * @param len the id length (default 20)
 * @param uppercaseOnly generate a unique id with uppercase and numbers only (default false)
 * @returns unique string id
 */
export const uniqueId = (len = 20, uppercaseOnly = false): string => {
  const initAlphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const alphabet =
    initAlphabet + (!uppercaseOnly ? "abcdefghijklmnopqrstuvwxyz" : "");

  const id = customAlphabet(alphabet, len);

  return id();
};

/**
 * Simulate network latency
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
 * Converts a number string to a number, converting any negative number to 0
 * @param n String number
 * @returns Converted number. If the provided string was not valid or was a negative number, returns 0
 */
export const toPositiveNumber = (n: string) => {
  const converted = toNumber(n);
  return converted < 0 ? 0 : converted;
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

/**
 * Returns the absolute direct image url based on image id
 * @param imageId the image id
 * @returns full image url
 */
// export const getImageDirectUrl = (imageId: string) =>
//   `https://lh5.googleusercontent.com/d/${imageId}`;

export const getImageDirectUrl = (imageId: string): string => {
  return `//wsrv.nl/?url=https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
};

/**
 * converts an empty string to null value otherwise returns the string
 * @param string the string to be checked
 * @param includeZeroString convert string containing zero "0" to null as well
 * @returns null if empty string, otherwise the string itself
 */
export const toNullIfEmptyString = (
  string: string | null,
  includeZeroString = false,
) => {
  if (string === null) return null;
  const str = string.trim();
  if (str === "" || !str) return null;
  if (includeZeroString && str === "0") return null;
  return str;
};

/**
 * Adds the French partitive de or d' based on the name
 * @param name wilaya name
 * @returns name preceeded by the proper partitive
 */
export const addPartitive = (name: string) => {
  if (name) {
    const startsWithVowel = /^[aieouâêîôûäëïöüàéèùœAIEOUÂÊÎÔÛÄËÏÖÜÀÉÈÙŒ]/.test(
      name[0],
    );
    if (startsWithVowel) {
      return `d'${name}`;
    } else return `de ${name}`;
  }
};
/**
 * Calculates the discounted price
 * @param price the price
 * @param discountPercentage the discount percentage which is a number in the 0 to 100 range
 * @returns the discounted price
 */
export const discountedPrice = (price: number, discountPercentage: number) => {
  if (
    discountPercentage === 0 ||
    discountPercentage < 0 ||
    discountPercentage > 100
  )
    return price;
  return price - (price * discountPercentage) / 100;
};

/**
 * Calculate the total price of an order
 * @param productPriceData combined products price data, shipping price, and anyadditional costs
 * @returns total price
 */
export const calculateTotalPrice = ({
  productsPrice,
  shippingPrice,
  additionalCosts,
}: {
  productsPrice: number;
  shippingPrice: number;
  additionalCosts?: number;
}) => {
  const totalShipping = shippingPrice + (additionalCosts ?? 0);

  return productsPrice + totalShipping;
};

/**
 * Formats a date object
 * @param date date object
 * @returns retuns DD/MM/YYYY HH:mm date string
 */
export const formatDate = (
  rawDate: Date | string,
  opt?: {
    noTime?: boolean;
    addPreposition?: boolean;
  },
) => {
  const date = typeof rawDate === "string" ? new Date(rawDate) : rawDate;
  const year = date.getFullYear();
  const month = zeroPrefix(date.getMonth() + 1);
  const day = zeroPrefix(date.getDate());
  const hours = zeroPrefix(date.getHours());
  const minutes = zeroPrefix(date.getMinutes());

  return (
    `${day}/${month}/${year}` +
    (!opt?.noTime
      ? `${opt?.addPreposition ? " à" : ""} ${hours}:${minutes}`
      : "")
  );
};

/**
 * Get month name by month number
 * @param month a number between 1 and 12
 * @returns the month name
 */
export const getMonthName = (month: number) => {
  switch (month) {
    case 1:
      return "Janvier";
    case 2:
      return "Février";
    case 3:
      return "mars";
    case 4:
      return "Avril";
    case 5:
      return "Mai";
    case 6:
      return "Juin";
    case 7:
      return "juillet";
    case 8:
      return "Août";
    case 9:
      return "septembre";
    case 10:
      return "Octobre";
    case 11:
      return "Novembre ";
    case 12:
      return "Décembre ";
    default:
      return "invalid month number";
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalize the first letter of a string
 * @param str the string to process
 * @returns The same string with the first letter capitalized
 */
export const capitalizeFirst = (str: string) => {
  return str.trim()[0].toUpperCase() + str.slice(1);
};

/**
 * Converts an object containing query filters to url params
 * @param o Object containing the filters
 * @returns The url params string as keys being the params names and the value being the params values
 */
export const convertObjectToQueryParams = (o: { [key: string]: unknown }) => {
  const filterParams = Object.entries(o)
    // filter out any value that is empty
    .filter(([_, value]) => !!value)
    // join key value pairs by = which results in an array of string url params
    .map((rule) => rule.join("="))
    // join all params by &
    .join("&");

  return filterParams;
};

/**
 * Check if the town code belongs to the wilaya by checking if the townCode starts with the wilayaCode
 * @param townCode the town code
 * @param wilayaCode the wilaya code
 * @returns true if it is valid, false otherwise
 */
export const verifyTownCode = (townCode: number, wilayaCode: number) => {
  if (typeof townCode !== "number" || typeof wilayaCode !== "number")
    return false;

  if (!townCode.toString().startsWith(`${wilayaCode}0`)) return false;
  else return true;
};

/**
 * Checks if the thrown error is a prisma exception and whether the expcetion code
 * points to a not found resource
 * @param error error thrown in the catch block of api call
 * @return true if it's a not found prisma error, otherwise, false
 */
export const isNotFoundPrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === PRISMA_NOT_FOUND_ERROR_CODE) {
      return true;
    }
  }
  return false;
};
/**
 * Checks if the thrown error is a prisma exception and whether the expcetion code
 * points to a disallowed duplicate field value
 * @param error error thrown in the catch block of api call
 * @return true if it's a unique constraint prisma error, otherwise, false
 */
export const isUniqueConstraintPrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE) {
      return true;
    }
  }
  return false;
};

/**
 * Sends a structured json response to the client.
 * @param message the error message - default: Internal server error
 * @param status the error http status code- default: 500
 * @returns NextResponse json response
 */
export const apiErrorResponse = (message?: string, status?: number) => {
  return NextResponse.json(
    {
      error: {
        message: message ?? "Internal server error",
        status: status ?? 500,
      },
    },
    {
      status: status ?? 500,
    },
  );
};
