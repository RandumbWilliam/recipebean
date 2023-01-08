import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import IngredientValidator from "contracts/validators/ingredient/ingredient.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { RecipeIngredient } from "../recipe_ingredient.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class Ingredient extends Base<Ingredient> {
  @Field()
  @Property()
  @Unique()
  public ingredient: string;

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, (r: RecipeIngredient) => r.ingredients)
  public recipeIngredients = new Collection<RecipeIngredient>(this);

  constructor(body: IngredientValidator) {
    super(body);
  }
}
