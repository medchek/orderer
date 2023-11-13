import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";

export type PromiseStatus = "init" | "fetching" | "success" | "error";

export type MutationOptions<
  /** Returned data type  */
  TReturnData = unknown,
  /** Payload type */
  TPayloadVariables = void,
> = Omit<
  UseMutationOptions<TReturnData, HTTPError, TPayloadVariables, TContext>,
  "mutationFn"
>;

export type QueryOptions<TReturnData = unknown> = Omit<
  UseQueryOptions<TReturnData, HTTPError, TReturnData>,
  "queryFn"
>;
