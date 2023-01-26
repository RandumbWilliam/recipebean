import { useRouter } from "next/router";
import Load from "../components/modules/Load";
import { useMyUserQuery } from "../generated/graphql";

const excludedRoutes = ["/login", "/", "/register"];

export const withAuth = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const [{ data, fetching }] = useMyUserQuery();

    if (fetching) {
      return <Load />;
    }

    if (data?.myUser && !excludedRoutes?.includes(router.pathname)) {
      return <Component {...props} />;
    }

    if (!data?.myUser && excludedRoutes?.includes(router.pathname)) {
      return <Component {...props} />;
    }

    if (!data?.myUser && !excludedRoutes?.includes(router.pathname)) {
      router.push("/login?next=" + router.pathname);
    }

    if (data?.myUser && excludedRoutes?.includes(router.pathname)) {
      router.push("/cookbooks");
    }

    return null;
  };
};
