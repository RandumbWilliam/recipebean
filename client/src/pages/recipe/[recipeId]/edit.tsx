import BaseLayout from "@components/layouts/Base";
import Load from "@components/modules/Load";
import { EditRecipeTemplate } from "@components/templates/CreateRecipe";
import {
  useGetCookbooksQuery,
  useGetRecipeByIdQuery,
} from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const EditRecipe: React.FC = () => {
  const router = useRouter();
  const recipeId =
    typeof router.query.recipeId === "string" ? router.query.recipeId : "";

  const [{ data: recipeData, fetching: recipeFetching }] =
    useGetRecipeByIdQuery({
      variables: {
        getRecipeId: recipeId,
      },
    });

  const [{ data: cookbookData, fetching: cookbookFetching }, reexecuteQuery] =
    useGetCookbooksQuery();

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [router, reexecuteQuery]);

  if (recipeFetching || cookbookFetching) {
    return <Load />;
  }

  if (!recipeData?.getRecipe || !cookbookData?.getCookbooks) {
    return <div>Error</div>;
  }

  return (
    <BaseLayout>
      <EditRecipeTemplate
        recipe={recipeData.getRecipe}
        cookbooks={cookbookData.getCookbooks}
      />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(EditRecipe);
