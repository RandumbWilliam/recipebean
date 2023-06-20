import Button from "@components/elements/Button";
import Icon from "@components/elements/Icon";
import Input from "@components/elements/Input";
import RecipeCard from "@components/elements/RecipeCard";
import {
  RecipeCardResponseFragment,
  useSearchRecipesMutation,
} from "@generated/graphql";
import { Grid } from "@mui/material";
import { ONYX_20 } from "@styles/base/colours";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  SearchContainer,
  SearchForm,
  SearchHeader,
  SearchRecipeText,
  SearchTitle,
} from "./styles";

const SearchTemplate = () => {
  const router = useRouter();
  const query =
    typeof router.query.query === "string" ? router.query.query : "";
  //   const { searchValue, setSearchValue } = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState(query);
  const [recipes, setRecipes] = useState<RecipeCardResponseFragment[]>([]);
  const [, searchRecipes] = useSearchRecipesMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue !== "") {
      router.push(`?query=${searchValue}`);
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      const response = await searchRecipes({ query });
      if (response.data?.searchRecipes) {
        setRecipes(response.data.searchRecipes);
      } else {
        console.log("No results");
      }
    };

    handleSearch();
    setSearchValue(query);
  }, [query, searchRecipes]);

  const recipeCountText = (recipeCount: number) => {
    if (recipeCount > 1) {
      return `${recipeCount} recipes`;
    } else if (recipeCount == 1) {
      return `${recipeCount} recipe`;
    } else {
      return "No recipes";
    }
  };

  let body = null;

  if (recipes.length === 0) {
    body = (
      <Grid item lg={12}>
        <p>No results</p>
      </Grid>
    );
  } else {
    body = (
      <>
        {recipes.map((recipe) => {
          const timeString = (totalTime: number) => {
            const hours = Math.floor(totalTime / 60);
            const minutes = totalTime % 60;

            let result = [];
            if (hours !== 0) {
              result.push(`${hours}h`);
            }

            if (minutes !== 0) {
              result.push(`${minutes}m`);
            }

            return result.join(" ");
          };
          return (
            <Grid key={recipe.id} item lg={4}>
              <Link href={`/recipe/${recipe.id}`}>
                <a>
                  <RecipeCard
                    key={recipe.id}
                    reicpeName={recipe.recipeName}
                    time={timeString(recipe.prepTime + recipe.cookTime)}
                    imageUrl={recipe.coverImage}
                  />
                </a>
              </Link>
            </Grid>
          );
        })}
      </>
    );
  }

  return (
    <SearchContainer>
      <SearchTitle>Search Recipes</SearchTitle>
      <SearchHeader>
        <SearchForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="search"
            placeholder="Search for recipe names or ingredients"
            value={searchValue}
            onChange={handleChange}
            adornment={
              <button
                type="button"
                onClick={() => {
                  setSearchValue("");
                }}
              >
                <Icon name="Cross" color={ONYX_20} size={12} />
              </button>
            }
          />
          <Button type="submit">Search</Button>
        </SearchForm>
        <SearchRecipeText>{recipeCountText(recipes.length)}</SearchRecipeText>
      </SearchHeader>
      <Grid container columnSpacing={3} rowSpacing={3}>
        {body}
      </Grid>
    </SearchContainer>
  );
};

export default SearchTemplate;
