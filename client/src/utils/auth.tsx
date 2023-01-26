import { withUrqlClient } from "next-urql";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMyUserQuery } from "../generated/graphql";
import { createUrqlClient } from "./createUrqlClient";

interface AuthProps {
  children: JSX.Element;
  excludedRoutes?: string[];
  pageProps: AppProps;
}

const Auth = ({ children, excludedRoutes, pageProps }: AuthProps) => {
  const [{ data, fetching }] = useMyUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (
      !fetching &&
      !data?.myUser &&
      !excludedRoutes?.includes(router.pathname)
    ) {
      router.push("/login?next=" + router.pathname);
    }

    if (
      !fetching &&
      data?.myUser &&
      excludedRoutes?.includes(router.pathname)
    ) {
      router.push("/cookbooks");
    }
  }, [fetching, data, router]);

  if (fetching) {
    return <div>LOADING</div>;
  } else {
    return children;
  }
};

export default withUrqlClient(createUrqlClient)(Auth);
