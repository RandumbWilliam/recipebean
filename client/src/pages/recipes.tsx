import { Grid } from "@mui/material";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import RecipeCard from "../components/elements/RecipeCard";
import BeanLayout from "../components/layouts/Bean";
import RecipesTemplate from "../components/templates/Recipes";
import { useGetRecipesQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Recipes = () => {
  const router = useRouter();
  const [{ data, fetching }, reexecuteQuery] = useGetRecipesQuery();

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [router]);

  let body = null;

  if (!fetching && data?.getRecipes) {
    body = (
      <>
        {data.getRecipes.map((recipe) => (
          <Grid key={recipe.id} item>
            <Link href="/recipe/[id]" as={`/recipe/${recipe.id}`}>
              <a>
                <RecipeCard
                  recipeName={recipe.recipeName}
                  cookTime={recipe.cookTime}
                  prepTime={recipe.prepTime}
                />
              </a>
            </Link>
          </Grid>
        ))}
      </>
    );
  }

  return (
    <BeanLayout>
      <RecipesTemplate header="Your Recipes">{body}</RecipesTemplate>
    </BeanLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Recipes);
