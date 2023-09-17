import {
  UseMutationOptions,
  UseQueryOptions
} from "@tanstack/react-query";
import { HTTPError } from "ky";

export type PromiseStatus = "init" | "fetching" | "success" | "error";

export type MutationOptions<
  /** Returned data type  */
  TData = unknown,
  /** Payload type */
  TVariables = void,
  TContext = unknown,
> = Omit<
  UseMutationOptions<TData, HTTPError, TVariables, TContext>,
  "mutationFn"
>;

export type QueryOptions<TReturnData = unknown> = Omit<
  UseQueryOptions<TReturnData, HTTPError, TReturnData>,
  "queryFn"
>;

