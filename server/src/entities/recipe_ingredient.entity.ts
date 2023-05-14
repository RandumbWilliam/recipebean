import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import RecipeIngredientValidator from "contracts/validators/recipe_ingredient.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class RecipeIngredient extends Base<RecipeIngredient> {
  @Field()
  @Property()
  public order: number;

  @Field()
  @Property()
  public ingredient: string;

  @Field()
  @Property()
  public unit: string;

  @Field()
  @Property()
  public quantity: number;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipes: Recipe;

  constructor(body: RecipeIngredientValidator) {
    super(body);
  }
}
