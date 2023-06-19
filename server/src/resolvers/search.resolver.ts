import { Recipe } from "entities/recipe.entity";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";

@Resolver(() => Recipe)
export class SearchResolver {
  @Mutation(() => [Recipe])
  public async searchRecipes(
    @Arg("query") query: string,
    @Ctx() { em, req }: MyContext
  ): Promise<Recipe[]> {
    const recipeRepository = em.getRepository(Recipe);
    const recipes = await recipeRepository.find({
      $or: [
        { recipeName: { $fulltext: query } },
        { recipeIngredient: { ingredient: { $fulltext: query } } },
      ],
    });

    return recipes;
  }
}
