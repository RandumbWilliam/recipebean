import { Recipe } from "@entities/recipe.entity";
import { isAuth } from "@middleware/isAuth";
import { MyContext } from "@utils/interfaces/context.interface";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver(() => Recipe)
export class SearchResolver {
  @Mutation(() => [Recipe])
  @UseMiddleware(isAuth)
  public async searchRecipes(
    @Arg("query") query: string,
    @Ctx() { em }: MyContext
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
