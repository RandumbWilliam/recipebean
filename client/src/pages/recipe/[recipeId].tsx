import BaseLayout from "@components/layouts/Base";
import Load from "@components/modules/Load";
import RecipeTemplate from "@components/templates/Recipe";
import { useGetRecipeByIdQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Recipe = () => {
  const router = useRouter();
  const recipeId =
    typeof router.query.recipeId === "string" ? router.query.recipeId : "";

  const [{ data, fetching }, reexecuteQuery] = useGetRecipeByIdQuery({
    variables: {
      getRecipeId: recipeId,
    },
  });

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [router, reexecuteQuery]);

  if (fetching) {
    return <Load />;
  }

  if (!data?.getRecipe) {
    return <div>Error</div>;
  }

  return (
    <BaseLayout alternate>
      <RecipeTemplate recipe={data.getRecipe} />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Recipe);
