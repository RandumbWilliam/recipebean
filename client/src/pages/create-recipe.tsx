import BaseLayout from "@components/layouts/Base";
import CreateRecipeTemplate from "@components/templates/CreateRecipe";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";

const CreateRecipe = () => {
  const router = useRouter();

  return (
    <BaseLayout>
      <CreateRecipeTemplate />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateRecipe);
