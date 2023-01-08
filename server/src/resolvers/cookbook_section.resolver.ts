import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";
import { CookbookSection } from "entities/cookbook_section.entity";
import { Cookbook } from "entities/cookbook.entity";
import CookbookSectionValidator from "contracts/validators/cookbook_section.validator";

@Resolver(() => CookbookSection)
export class CookbookSectionResolver {
  // Fetch All Sections for Cookbook
  @Query(() => [CookbookSection])
  public async getSections(
    @Arg("cookbookId") cookbookId: string,
    @Ctx() { em }: MyContext
  ): Promise<CookbookSection[]> {
    const cookbookRepository = em.getRepository(Cookbook);
    const sectionRepository = em.getRepository(CookbookSection);

    const cookbook = await cookbookRepository.findOne({
      id: cookbookId,
    });
    const sections = await sectionRepository.find({ cookbook });

    return sections;
  }

  // Fetch Section by Id
  @Query(() => CookbookSection)
  public async getSection(
    @Arg("id") id: string,
    @Ctx() { em }: MyContext
  ): Promise<CookbookSection | null> {
    const sectionRepository = em.getRepository(CookbookSection);
    const section = await sectionRepository.findOne(
      { id },
      {
        populate: [
          "recipes.id",
          "recipes.recipeName",
          "recipes.cookTime",
          "recipes.prepTime",
        ],
      }
    );

    return section;
  }

  // Create Section
  @Mutation(() => CookbookSection)
  public async createSection(
    @Arg("input") input: CookbookSectionValidator,
    @Arg("cookbookId") cookbookId: string,
    @Ctx() { em }: MyContext
  ): Promise<CookbookSection> {
    const cookbookRespository = em.getRepository(Cookbook);

    const cookbook = await cookbookRespository.findOneOrFail({
      id: cookbookId,
    });

    const section = em.create(CookbookSection, {
      sectionName: input.sectionName,
    });
    section.cookbook = cookbook;

    await em.persistAndFlush(section);

    return section;
  }
}
