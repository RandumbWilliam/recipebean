import BeanLayout from "@components/layouts/Bean";
import CreateRecipeTemplate from "@components/templates/CreateRecipe";
import { useGetCookbooksQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";

const CreateRecipe = () => {
  const [{ data, fetching }] = useGetCookbooksQuery();

  if (!fetching && data?.getCookbooks) {
    return (
      <BeanLayout>
        <CreateRecipeTemplate cookbooks={data.getCookbooks} />
      </BeanLayout>
    );
  }

  return <div>Error</div>;
};

export default withUrqlClient(createUrqlClient)(CreateRecipe);
