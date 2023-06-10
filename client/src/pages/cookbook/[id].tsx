import BaseLayout from "@components/layouts/Base";
import Load from "@components/modules/Load";
import CookbookTemplate from "@components/templates/Cookbook";
import { useGetCookbookQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";

const Cookbook = () => {
  const router = useRouter();
  const cookbookId = typeof router.query.id === "string" ? router.query.id : "";

  const [{ data, fetching }] = useGetCookbookQuery({
    variables: {
      getCookbookId: cookbookId,
    },
  });

  if (fetching) {
    return <Load />;
  }

  if (!data?.getCookbook) {
    return <div>Error</div>;
  }

  return (
    <BaseLayout>
      <CookbookTemplate cookbook={data.getCookbook} />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Cookbook);
