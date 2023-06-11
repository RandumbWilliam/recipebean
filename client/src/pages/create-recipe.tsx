import BaseLayout from "@components/layouts/Base";
import Load from "@components/modules/Load";
import CreateRecipeTemplate from "@components/templates/CreateRecipe";
import { useGetCookbooksQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CreateRecipe = () => {
  const router = useRouter();
  const [{ data, fetching }, reexecuteQuery] = useGetCookbooksQuery();

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [router, reexecuteQuery]);

  if (fetching) {
    return <Load />;
  }

  if (!data?.getCookbooks) {
    return <div>Error</div>;
  }

  return (
    <BaseLayout>
      <CreateRecipeTemplate cookbooks={data.getCookbooks} />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateRecipe);
