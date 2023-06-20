import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import {
  DeleteUserMutation,
  LoginMutation,
  LogoutMutation,
  MyUserDocument,
  MyUserQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql";

export const createUrqlClient = (ssrExchange: any) => ({
  url: API_URL,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          deleteUser: (_result, args, cache, info) => {
            betterUpdateQuery<DeleteUserMutation, MyUserQuery>(
              cache,
              { query: MyUserDocument },
              _result,
              (result, query) => {
                if (result.deleteUser.errors || !result.deleteUser.boolean) {
                  return query;
                } else {
                  return { myUser: null };
                }
              }
            );
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MyUserQuery>(
              cache,
              { query: MyUserDocument },
              _result,
              () => ({ myUser: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MyUserQuery>(
              cache,
              { query: MyUserDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    myUser: result.login.user,
                  };
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
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    myUser: result.register.user,
                  };
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
