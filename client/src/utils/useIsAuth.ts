import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMyUserQuery } from "../generated/graphql";

const excludedRoutes = ["/login", "/", "/register"];

export const useIsAuth = () => {
  const [{ data, fetching }] = useMyUserQuery();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (fetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (data?.myUser) {
      setAuthenticated(true);
    }

    if (!data?.myUser && !excludedRoutes?.includes(router.pathname)) {
      router.push("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);

  return { authenticated, loading };
};
