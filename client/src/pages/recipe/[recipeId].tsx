import BaseLayout from "@components/layouts/Base";
import Load from "@components/modules/Load";
import RecipeTemplate from "@components/templates/Recipe";
import { useGetRecipeByIdQuery } from "@generated/graphql";
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

  if (fetching) {
    return <Load />;
  }

  if (!fetching && data?.getRecipe) {
    return (
      <BaseLayout alternate>
        <RecipeTemplate recipe={data.getRecipe} />
      </BaseLayout>
    );
  }
};

export default Recipe;
