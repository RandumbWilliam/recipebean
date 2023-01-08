import RecipeValidator from "contracts/validators/recipe.validator";
import { User } from "entities/user.entity";
import { Recipe } from "entities/recipe.entity";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";
import { parse } from "recipe-ingredient-parser-v3";
import { Ingredient } from "entities/ingredient/ingredient.entity";
import { RecipeIngredient } from "entities/recipe_ingredient.entity";
import { Quantity } from "entities/ingredient/quantity.entity";
import { Unit } from "entities/ingredient/unit.entity";
import { CookbookSection } from "entities/cookbook_section.entity";
import { RecipeHeader } from "entities/recipe_header.entity";
import { Cookbook } from "entities/cookbook.entity";

@Resolver(() => Recipe)
export class RecipeResolver {
  // Fetch All Recipes for User
  @Query(() => [Recipe])
  public async getRecipes(@Ctx() { em, req }: MyContext): Promise<Recipe[]> {
    const recipeRepository = em.getRepository(Recipe);
    const userRepository = em.getRepository(User);

    const creator = await userRepository.findOne({ id: req.session.userId });
    const recipes = await recipeRepository.find(
      { creator },
      {
        populate: [
          "recipeIngredient.ingredients",
          "recipeIngredient.units",
          "recipeIngredient.quantities",
          "recipeHeader.headerName",
        ],
      }
    );

    return recipes;
  }

  // Fetch Recipe by Id
  @Query(() => Recipe, { nullable: true })
  public async getRecipe(
    @Arg("id") id: string,
    @Ctx() { em }: MyContext
  ): Promise<Recipe | null> {
    const recipeRepository = em.getRepository(Recipe);
    const recipe = await recipeRepository.findOne(
      { id },
      {
        populate: [
          "recipeIngredient.ingredients",
          "recipeIngredient.units",
          "recipeIngredient.quantities",
          "recipeHeader.headerName",
        ],
      }
    );

    return recipe;
  }

  // Create Recipe
  @Mutation(() => Recipe)
  public async createRecipe(
    @Arg("input") input: RecipeValidator,
    @Arg("sectionId") sectionId: string,
    @Arg("cookbookId") cookbookId: string,
    @Ctx() { em, req }: MyContext
  ): Promise<Recipe> {
    const userRepository = em.getRepository(User);
    const cookbookRepository = em.getRepository(Cookbook);
    const sectionRepository = em.getRepository(CookbookSection);
    const ingredientRepository = em.getRepository(Ingredient);
    const quantityRepository = em.getRepository(Quantity);
    const unitRepository = em.getRepository(Unit);

    const creator = await userRepository.findOneOrFail({
      id: req.session.userId,
    });

    const section = await sectionRepository.findOneOrFail({
      id: sectionId,
    });

    const cookbook = await cookbookRepository.findOneOrFail({
      id: cookbookId,
    });

    const recipe = em.create(Recipe, {
      recipeName: input.recipeName,
      servings: input.servings,
      prepTime: input.prepTime,
      cookTime: input.cookTime,
    });
    recipe.creator = creator;
    recipe.section = section;
    recipe.cookbook = cookbook;

    await em.persistAndFlush(recipe);

    for (var i = 0; i < input.ingredients.length; i++) {
      let raw_ingredient = input.ingredients[i];

      if (raw_ingredient.type == "header") {
        const header = em.create(RecipeHeader, {
          order: i,
          headerName: raw_ingredient.value,
        });
        header.recipes = recipe;

        await em.persistAndFlush(header);
      } else if (raw_ingredient.type == "ingredient") {
        let { quantity, unit, ingredient } = parse(raw_ingredient.value, "eng");

        let ingredientValue = await ingredientRepository.findOne({
          ingredient,
        });

        let quantityValue = await quantityRepository.findOne({
          quantity: quantity.toString(),
        });

        let unitValue = await unitRepository.findOne({
          unit,
        });

        if (!ingredientValue) {
          ingredientValue = em.create(Ingredient, {
            ingredient,
          });

          await em.persistAndFlush(ingredientValue);
        }

        if (!quantityValue) {
          quantityValue = em.create(Quantity, {
            quantity: quantity.toString(),
          });

          await em.persistAndFlush(quantityValue);
        }

        if (!unitValue) {
          unitValue = em.create(Unit, {
            unit,
          });

          await em.persistAndFlush(unitValue);
        }

        const recipeIngredient = em.create(RecipeIngredient, {
          order: i,
        });
        recipeIngredient.recipes = recipe;
        recipeIngredient.ingredients = ingredientValue;
        recipeIngredient.quantities = quantityValue;
        recipeIngredient.units = unitValue;

        await em.persistAndFlush(recipeIngredient);
      }
    }

    return recipe;
  }

  // Update Recipe
  @Mutation(() => Recipe)
  public async updateRecipe(
    @Arg("input") input: RecipeValidator,
    @Arg("id") id: string,
    @Ctx() { em }: MyContext
  ): Promise<Recipe> {
    const recipeRepository = em.getRepository(Recipe);

    const recipe = await recipeRepository.findOneOrFail({ id });
    recipe.assign(input);
    await em.persistAndFlush(recipe);

    return recipe;
  }

  // Delete Recipe
  @Mutation(() => Boolean)
  public async deleteRecipe(
    @Arg("id") id: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    const recipeRepository = em.getRepository(Recipe);

    const recipe = await recipeRepository.findOneOrFail({ id });
    await recipeRepository.remove(recipe).flush();

    return true;
  }
}
