import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import RecipeHeaderValidator from "contracts/validators/recipe_header.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class RecipeHeaderIngredient extends Base<RecipeHeaderIngredient> {
  @Field()
  @Property()
  public order: number;

  @Field()
  @Property()
  public header: string;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipes: Recipe;

  constructor(body: RecipeHeaderValidator) {
    super(body);
  }
}
