import CookbookValidator from "@contracts/validators/cookbook.validator";
import { Cookbook } from "@entities/cookbook.entity";
import { Recipe } from "@entities/recipe.entity";
import { User } from "@entities/user.entity";
import { isAuth } from "@middleware/isAuth";
import { MyContext } from "@utils/interfaces/context.interface";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@Resolver(() => Cookbook)
export class CookbookResolver {
  // Fetch All Cookbooks for User
  @Query(() => [Cookbook])
  public async getCookbooks(
    @Ctx() { em, req }: MyContext
  ): Promise<Cookbook[]> {
    const cookbookRepository = em.getRepository(Cookbook);
    const userRepository = em.getRepository(User);

    const creator = await userRepository.findOne({ id: req.session.userId });
    const cookbooks = await cookbookRepository.find(
      { creator },
      {
        populate: ["recipes.id"],
      }
    );

    return cookbooks;
  }

  // Fetch Cookbook by Id
  @Query(() => Cookbook)
  public async getCookbook(
    @Arg("id") id: string,
    @Ctx() { em }: MyContext
  ): Promise<Cookbook | null> {
    const cookbookRepository = em.getRepository(Cookbook);
    const cookbook = await cookbookRepository.findOne(
      { id },
      {
        populate: ["recipes.id"],
      }
    );

    return cookbook;
  }

  // Create Cookbook
  @Mutation(() => Cookbook)
  @UseMiddleware(isAuth)
  public async createCookbook(
    @Arg("input") input: CookbookValidator,
    @Ctx() { em, req }: MyContext
  ): Promise<Cookbook> {
    const userRepository = em.getRepository(User);

    const creator = await userRepository.findOneOrFail({
      id: req.session.userId,
    });

    const cookbook = em.create(Cookbook, {
      cookbookName: input.cookbookName,
      cookbookCoverId: input.cookbookCoverId,
      creator: creator,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // cookbook.creator = creator;

    await em.persistAndFlush(cookbook);

    return cookbook;
  }

  // Update Cookbook Name
  @Mutation(() => Cookbook)
  public async updateCookbook(
    @Arg("id") id: string,
    @Arg("input") input: CookbookValidator,
    @Ctx() { em }: MyContext
  ): Promise<Cookbook> {
    const cookbookRepository = em.getRepository(Cookbook);

    const cookbook = await cookbookRepository.findOneOrFail({ id });
    cookbook.assign({
      cookbookName: input.cookbookName,
      cookbookCoverId: input.cookbookCoverId,
    });
    await em.persistAndFlush(cookbook);

    return cookbook;
  }

  // Delete Cookbook
  @Mutation(() => Boolean)
  public async deleteCookbook(
    @Arg("id") id: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    const cookbookRepository = em.getRepository(Cookbook);
    const recipeRepository = em.getRepository(Recipe);

    const cookbook = await cookbookRepository.findOneOrFail(
      { id },
      { populate: ["recipes"] }
    );
    let cookbookRecipes = cookbook.recipes;
    await cookbookRepository.remove(cookbook).flush();

    // Clean Up
    // If the recipe has no more associated cookbooks, it'll delete the recipe entity itself
    for (const recipe of cookbookRecipes) {
      const recipeEntity = await recipeRepository.findOneOrFail(
        { id: recipe.id },
        { populate: ["cookbooks"] }
      );

      let cookbookIds = recipeEntity.cookbooks.getIdentifiers("id");
      cookbookIds = cookbookIds.filter((item) => item !== id);

      if (cookbookIds.length === 0) {
        await recipeRepository.remove(recipeEntity).flush();
      }
    }

    return true;
  }
}
