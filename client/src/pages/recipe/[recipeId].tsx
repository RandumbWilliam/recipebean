import BaseLayout from "@components/layouts/Base";
import { useRouter } from "next/router";
import React from "react";

const Recipe = () => {
  const router = useRouter();
  const { recipeId } = router.query;

  return (
    <BaseLayout>
      <div>{recipeId}</div>
    </BaseLayout>
  );
};

export default Recipe;
