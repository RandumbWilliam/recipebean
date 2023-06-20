import RecipeValidator from "@contracts/validators/recipe.validator";
import { Cookbook } from "@entities/cookbook.entity";
import { Measurement } from "@entities/measurement.entity";
import { Recipe } from "@entities/recipe.entity";
import { RecipeHeaderIngredient } from "@entities/recipe_header_ingredient.entity";
import { RecipeHeaderInstruction } from "@entities/recipe_header_instruction.entity";
import { RecipeIngredient } from "@entities/recipe_ingredient.entity";
import { RecipeInstruction } from "@entities/recipe_instruction.entity";
import { User } from "@entities/user.entity";
import { MyContext } from "@utils/interfaces/context.interface";
import { v2 as cloudinary } from "cloudinary";
import "dotenv-safe/config";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET,
});

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
          "recipeIngredient.measurements",
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
          "recipeIngredient.measurements",
          "recipeInstruction",
          "recipeHeaderIngredient",
          "recipeHeaderInstruction",
          "cookbooks",
        ],
      }
    );

    return recipe;
  }

  // Create Recipe
  @Mutation(() => Recipe)
  public async createRecipe(
    @Arg("input") input: RecipeValidator,
    @Arg("cookbookId", () => [String]) cookbookId: string[],
    @Ctx() { em, req }: MyContext
  ): Promise<Recipe> {
    const userRepository = em.getRepository(User);
    const cookbookRepository = em.getRepository(Cookbook);

    const creator = await userRepository.findOneOrFail({
      id: req.session.userId,
    });

    const coverImageUrl = await cloudinary.uploader.upload(input.coverImage, {
      folder: process.env.CLOUDINARY_FOLDER,
    });

    const recipe = em.create(Recipe, {
      recipeName: input.recipeName,
      servings: input.servings,
      prepTime: input.prepTime,
      cookTime: input.cookTime,
      coverImage: coverImageUrl.url,
      creator: creator,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // recipe.creator = creator;

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
        alternativeIngredients: ingredientItem.alternativeIngredients,
        hasAlternativeIngredients: ingredientItem.hasAlternativeIngredients,
        hasAddedMeasurements: ingredientItem.hasAddedMeasurements,
        comments: ingredientItem.comments,
        recipes: recipe,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // ingredientEntity.recipes = recipe;

      await em.persistAndFlush(ingredientEntity);

      if (ingredientItem.measurements) {
        for (const meas of ingredientItem.measurements) {
          const measurementEntity = em.create(Measurement, {
            quantity: meas?.quantity,
            quantityRange: meas?.quantityRange,
            isRange: meas.isRange,
            unit: meas?.unit,
            isConverted: meas.isConverted,
            ingredients: ingredientEntity,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          // measurementEntity.ingredients = ingredientEntity;

          await em.persistAndFlush(measurementEntity);
        }
      }
    }

    for (const ingredientHeaderItem of input.ingredientHeaders) {
      const ingredientHeaderEntity = em.create(RecipeHeaderIngredient, {
        order: ingredientHeaderItem.order,
        header: ingredientHeaderItem.header,
        recipes: recipe,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // ingredientHeaderEntity.recipes = recipe;

      await em.persistAndFlush(ingredientHeaderEntity);
    }

    for (const instructionItem of input.instructionValues) {
      const instructionEntity = em.create(RecipeInstruction, {
        order: instructionItem.order,
        instruction: instructionItem.instruction,
        step: instructionItem.step,
        recipes: recipe,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // instructionEntity.recipes = recipe;

      await em.persistAndFlush(instructionEntity);
    }

    for (const instructionHeaderItem of input.instructionHeaders) {
      const instructionHeaderEntity = em.create(RecipeHeaderInstruction, {
        order: instructionHeaderItem.order,
        header: instructionHeaderItem.header,
        recipes: recipe,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // instructionHeaderEntity.recipes = recipe;

      await em.persistAndFlush(instructionHeaderEntity);
    }

    return recipe;
  }

  // Update Recipe
  @Mutation(() => Recipe)
  public async updateRecipe(
    @Arg("input") input: RecipeValidator,
    @Arg("cookbookIds", () => [String]) cookbookIds: string[],
    @Arg("id") id: string,
    @Ctx() { em }: MyContext
  ): Promise<Recipe> {
    const recipeRepository = em.getRepository(Recipe);
    const cookbookRepository = em.getRepository(Cookbook);

    const recipe = await recipeRepository.findOneOrFail(
      { id },
      {
        populate: [
          "recipeIngredient",
          "recipeInstruction",
          "recipeHeaderIngredient",
          "recipeHeaderInstruction",
          "cookbooks",
        ],
      }
    );

    // Remove current ingredients, insturctions, and headers
    recipe.recipeIngredient.removeAll();
    recipe.recipeInstruction.removeAll();
    recipe.recipeHeaderIngredient.removeAll();
    recipe.recipeHeaderInstruction.removeAll();

    // Update recipe properties
    recipe.assign({
      recipeName: input.recipeName,
      servings: input.servings,
      prepTime: input.prepTime,
      cookTime: input.cookTime,
    });

    // Remove all current cookbooks associated with Recipe
    const currentCookbookIds = recipe.cookbooks.getIdentifiers("id");
    for (const id of currentCookbookIds) {
      const cookbook = await cookbookRepository.findOneOrFail(
        {
          id,
        },
        { populate: ["recipes"] }
      );

      recipe.cookbooks.remove(cookbook);
    }

    // Add new cookbooks to recipe
    for (const id of cookbookIds) {
      const cookbook = await cookbookRepository.findOneOrFail({
        id,
      });

      recipe.cookbooks.add(cookbook);
    }

    await em.persistAndFlush(recipe);

    // Add new ingredients, instructions, and headers
    for (const ingredientItem of input.ingredientValues) {
      const ingredientEntity = em.create(RecipeIngredient, {
        order: ingredientItem.order,
        ingredient: ingredientItem.ingredient,
        alternativeIngredients: ingredientItem.alternativeIngredients,
        hasAlternativeIngredients: ingredientItem.hasAlternativeIngredients,
        hasAddedMeasurements: ingredientItem.hasAddedMeasurements,
        comments: ingredientItem.comments,
        recipes: recipe,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // ingredientEntity.recipes = recipe;

      await em.persistAndFlush(ingredientEntity);

      if (ingredientItem.measurements) {
        for (const meas of ingredientItem.measurements) {
          const measurementEntity = em.create(Measurement, {
            quantity: meas?.quantity,
            quantityRange: meas?.quantityRange,
            isRange: meas.isRange,
            unit: meas?.unit,
            isConverted: meas.isConverted,
            ingredients: ingredientEntity,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          measurementEntity.ingredients = ingredientEntity;

          await em.persistAndFlush(measurementEntity);
        }
      }
    }

    for (const ingredientHeaderItem of input.ingredientHeaders) {
      const ingredientHeaderEntity = em.create(RecipeHeaderIngredient, {
        order: ingredientHeaderItem.order,
        header: ingredientHeaderItem.header,
        recipes: recipe,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // ingredientHeaderEntity.recipes = recipe;

      await em.persistAndFlush(ingredientHeaderEntity);
    }

    for (const instructionItem of input.instructionValues) {
      const instructionEntity = em.create(RecipeInstruction, {
        order: instructionItem.order,
        instruction: instructionItem.instruction,
        step: instructionItem.step,
        recipes: recipe,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // instructionEntity.recipes = recipe;

      await em.persistAndFlush(instructionEntity);
    }

    for (const instructionHeaderItem of input.instructionHeaders) {
      const instructionHeaderEntity = em.create(RecipeHeaderInstruction, {
        order: instructionHeaderItem.order,
        header: instructionHeaderItem.header,
        recipes: recipe,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // instructionHeaderEntity.recipes = recipe;

      await em.persistAndFlush(instructionHeaderEntity);
    }

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
