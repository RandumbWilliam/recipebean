import RecipeValidator from "contracts/validators/recipe.validator";
import { Cookbook } from "entities/cookbook.entity";
import { Recipe } from "entities/recipe.entity";
import { RecipeHeaderIngredient } from "entities/recipe_header_ingredient.entity";
import { RecipeHeaderInstruction } from "entities/recipe_header_instruction.entity";
import { RecipeIngredient } from "entities/recipe_ingredient.entity";
import { RecipeInstruction } from "entities/recipe_instruction.entity";
import { User } from "entities/user.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";

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
          "recipeIngredient",
          "recipeInstruction",
          "recipeHeaderIngredient",
          "recipeHeaderInstruction",
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
          "recipeIngredient",
          "recipeInstruction",
          "recipeHeaderIngredient",
          "recipeHeaderInstruction",
        ],
      }
    );

    return recipe;
  }

  // Create Recipe
  @Mutation(() => Recipe)
  public async createRecipe(
    @Arg("input") input: RecipeValidator,
    @Arg("cookbookId", (type) => [String]) cookbookId: string[],
    @Ctx() { em, req }: MyContext
  ): Promise<Recipe> {
    const userRepository = em.getRepository(User);
    const cookbookRepository = em.getRepository(Cookbook);

    const creator = await userRepository.findOneOrFail({
      id: req.session.userId,
    });

    const recipe = em.create(Recipe, {
      recipeName: input.recipeName,
      servings: input.servings,
      prepTime: input.prepTime,
      cookTime: input.cookTime,
    });
    recipe.creator = creator;

    for (const id of cookbookId) {
      const cookbook = await cookbookRepository.findOneOrFail({
        id,
      });

      recipe.cookbooks.add(cookbook);
    }

    await em.persistAndFlush(recipe);

    for (const ingredientItem of input.ingredientValues) {
      const ingredientEntity = em.create(RecipeIngredient, {
        order: ingredientItem.order,
        ingredient: ingredientItem.ingredient,
        unit: ingredientItem.unit,
        quantity: ingredientItem.quantity,
      });
      ingredientEntity.recipes = recipe;

      await em.persistAndFlush(ingredientEntity);
    }

    for (const ingredientHeaderItem of input.ingredientHeaders) {
      const ingredientHeaderEntity = em.create(RecipeHeaderIngredient, {
        order: ingredientHeaderItem.order,
        header: ingredientHeaderItem.header,
      });
      ingredientHeaderEntity.recipes = recipe;

      await em.persistAndFlush(ingredientHeaderEntity);
    }

    for (const instructionItem of input.instructionValues) {
      const instructionEntity = em.create(RecipeInstruction, {
        order: instructionItem.order,
        instruction: instructionItem.instruction,
        step: instructionItem.step,
      });
      instructionEntity.recipes = recipe;

      await em.persistAndFlush(instructionEntity);
    }

    for (const instructionHeaderItem of input.instructionHeaders) {
      const instructionHeaderEntity = em.create(RecipeHeaderInstruction, {
        order: instructionHeaderItem.order,
        header: instructionHeaderItem.header,
      });
      instructionHeaderEntity.recipes = recipe;

      await em.persistAndFlush(instructionHeaderEntity);
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
