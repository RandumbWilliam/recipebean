import BaseLayout from "@components/layouts/Base";
import RecipeTemplate from "@components/templates/Recipe";
import { useGetRecipeByIdQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";

const Recipe = () => {
  const router = useRouter();
  const recipeId =
    typeof router.query.recipeId === "string" ? router.query.recipeId : "";

  const [{ data, fetching }] = useGetRecipeByIdQuery({
    variables: {
      getRecipeId: recipeId,
    },
  });

  if (!fetching && data?.getRecipe) {
    return (
      <BaseLayout alternate>
        <RecipeTemplate recipe={data.getRecipe} />
      </BaseLayout>
    );
  }

  return <div>Error</div>;
};

export default withUrqlClient(createUrqlClient)(Recipe);
