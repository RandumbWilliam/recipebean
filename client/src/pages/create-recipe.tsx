import { useGetCookbooksQuery } from "@generated/graphql";
import React, { useState } from "react";
import BeanLayout from "../components/layouts/Bean";
import CreateRecipeTemplate from "../components/templates/CreateRecipe";

const CreateRecipe = () => {
  const [{ data, fetching }] = useGetCookbooksQuery();

  if (fetching) {
    return <div>Loading</div>;
  }

  if (!fetching && data?.getCookbooks) {
    return (
      <BeanLayout>
        <CreateRecipeTemplate cookbooks={data.getCookbooks} />
      </BeanLayout>
    );
  }

  return <div>Error</div>;
};

export default CreateRecipe;
