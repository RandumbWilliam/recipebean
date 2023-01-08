import React from "react";
import { useRouter } from "next/router";
import BeanLayout from "../../components/layouts/Bean";

const Recipe = () => {
  const router = useRouter();
  const { recipeId } = router.query;

  console.log(recipeId);

  return (
    <BeanLayout>
      <div>help</div>
    </BeanLayout>
  );
};

export default Recipe;
