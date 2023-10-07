import ky from "ky";

type RecaptchaErrorCodes =
  | "missing-input-secret"
  | "invalid-input-secret"
  | "missing-input-response"
  | "invalid-input-response"
  | "bad-request"
  | "timeout-or-duplicate";

type RecaptchaResponse = {
  success: true | false;
  challenge_ts: string; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string;
  "error-codes"?: RecaptchaErrorCodes[];
};

/**
 * Verify if the client solved the recaptcha or not
 * @param token the client side token generated when the user solved the captcha
 * @returns response containing success status, timestamp of the challenge, host name, and error code in case of error
 */
export const verifyCaptcha = async (
  token: string | null,
): Promise<RecaptchaResponse> => {
  if (!process.env.RECAPTCHA_SECRET_KEY) throw "Recaptcha env not set";
  if (!token) throw "Token not provided";
  // URLSearchParams is used for ky to automatically set the content type to "application/x-www-form-urlencoded" which is required by the recaptcha api route
  const params = new URLSearchParams();
  params.set("secret", process.env.RECAPTCHA_SECRET_KEY);
  params.set("response", token);

  return await ky
    .post("https://www.google.com/recaptcha/api/siteverify", {
      body: params,
    })
    .json();
};
