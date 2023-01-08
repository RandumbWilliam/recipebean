import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  RegisterMutation,
  MyUserQuery,
  MyUserDocument,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MyUserQuery>(
              cache,
              { query: MyUserDocument },
              _result,
              (result, query) => {
                if (result.login) {
                  return {
                    myUser: result.login,
                  };
                } else {
                  return query;
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MyUserQuery>(
              cache,
              { query: MyUserDocument },
              _result,
              (result, query) => {
                if (result.register) {
                  return {
                    myUser: result.register,
                  };
                } else {
                  return query;
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
