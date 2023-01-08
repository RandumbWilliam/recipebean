import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Recipe } from "./recipe.entity";
import RecipeHeaderValidator from "contracts/validators/recipe_header.validator";

@ObjectType()
@Entity({ schema: "recipes" })
export class RecipeHeader extends Base<RecipeHeader> {
  @Field()
  @Property()
  public order: number;

  @Field()
  @Property()
  public headerName: string;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipes: Recipe;

  constructor(body: RecipeHeaderValidator) {
    super(body);
  }
}
