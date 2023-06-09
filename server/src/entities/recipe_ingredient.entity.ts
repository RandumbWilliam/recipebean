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

  @Field({ nullable: true })
  @Property({ nullable: true })
  public unit?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public quantity?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public comments?: string;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipes: Recipe;

  constructor(body: RecipeIngredientValidator) {
    super(body);
  }
}
