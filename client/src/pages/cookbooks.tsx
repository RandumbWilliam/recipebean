import BeanLayout from "@components/layouts/Bean";
import CookbooksTemplate from "@components/templates/Cookbooks";
import { useGetCookbooksQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Cookbooks = () => {
  const router = useRouter();
  const [{ data, fetching }, reexecuteQuery] = useGetCookbooksQuery();

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [router, reexecuteQuery]);

  if (!fetching && data?.getCookbooks) {
    return (
      <BeanLayout>
        <CookbooksTemplate cookbooks={data.getCookbooks} />
      </BeanLayout>
    );
  }

  return <div>Error</div>;
};

export default withUrqlClient(createUrqlClient)(Cookbooks);
