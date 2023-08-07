export const PRODUCT_CODE_LENGTH = 20;
export const ORDER_CODE_LENGTH = 14;
export const MAX_UPLOAD_FILE_SIZE = 8388608;

export const STATUS_CREATED = 201;
export const STATUS_OK = 200;
export const STATUS_CONFLICT = 409;
export const STATUS_NOT_FOUND = 404;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_FORBIDDEN = 403;
export const STATUS_CONTENT_TOO_LARGE = 413;



export const PRISMA_NOT_FOUND_ERROR_CODE = "P2025"
export const PRISMA_UNIQUE_CONSTRAINT_ERROR_CODE = "P2002"


export enum OrderStatus {
  UNCONFIRMED,
  PROCEEDING, // the package is on the way
  SUCCESS,
  CANCELED,
  RETURNED,
}

