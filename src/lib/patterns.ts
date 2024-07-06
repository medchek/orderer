import { PRODUCT_CODE_LENGTH } from "./constants";

export const phoneRegex = /^0[756]{1}[0-9]{8}$/i;
export const emailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,5}$/i;

export const imageIdRegex = /^orderer\/[a-zA-Z0-9_-]+$/i;

export const productCodeRegex = new RegExp(
  `^[a-zA-Z0-9]{${PRODUCT_CODE_LENGTH}}$`,
);

export const googleMapsLinkRegex =
  /^https:\/\/maps\.app\.goo\.gl\/[a-zA-Z0-9]{10,}$/i;
