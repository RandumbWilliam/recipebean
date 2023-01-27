import { useRouter } from "next/router";
import Load from "../components/modules/Load";
import { useMyUserQuery } from "../generated/graphql";

const unprotectRoutes = ["/login", "/", "/register"];

export const withAuth = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const [{ data, fetching }] = useMyUserQuery();

    const authenticated = data?.myUser;
    const protectedRoute = !unprotectRoutes?.includes(router.pathname);

    if (fetching) {
      return <Load />;
    }

    if (!authenticated && protectedRoute) {
      router.push("/login?next=" + router.pathname);
      return null;
    }

    if (authenticated && !protectedRoute) {
      router.push("/cookbooks");
      return null;
    }

    return <Component {...props} />;
  };
};
