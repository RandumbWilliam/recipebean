import CookbookValidator from "contracts/validators/cookbook.validator";
import { Cookbook } from "entities/cookbook.entity";
import { User } from "entities/user.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";

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
    });
    cookbook.creator = creator;

    await em.persistAndFlush(cookbook);

    return cookbook;
  }

  // Update Cookbook Name
  @Mutation(() => Cookbook)
  public async updateCookbook(
    @Arg("id") id: string,
    @Arg("cookbookName") cookbookName: string,
    @Ctx() { em }: MyContext
  ): Promise<Cookbook> {
    const cookbookRepository = em.getRepository(Cookbook);

    const cookbook = await cookbookRepository.findOneOrFail({ id });
    cookbook.assign({ cookbookName });
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

    const cookbook = await cookbookRepository.findOneOrFail({ id });
    await cookbookRepository.remove(cookbook).flush();

    return true;
  }
}
