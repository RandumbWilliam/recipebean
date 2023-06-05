import { parse } from "recipe-ingredient-parser-v3";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";

@ObjectType()
class ParsedIngredient {
  @Field()
  ingredient: string;

  @Field({ nullable: true })
  unit?: string;

  @Field({ nullable: true })
  quantity?: number;
}

@Resolver(() => ParsedIngredient)
export class IngredientResolver {
  @Mutation(() => ParsedIngredient)
  public async parseIngredient(
    @Arg("strIngredient") strIngredient: string
  ): Promise<ParsedIngredient | null> {
    let { quantity, symbol, ingredient } = parse(strIngredient, "eng");
    return {
      quantity,
      unit: symbol,
      ingredient,
    };
  }
}
