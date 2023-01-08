import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import QuantityValidator from "contracts/validators/ingredient/quantity.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { RecipeIngredient } from "../recipe_ingredient.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class Quantity extends Base<Quantity> {
  @Field()
  @Property()
  @Unique()
  public quantity: string;

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, (r: RecipeIngredient) => r.quantities)
  public recipeIngredients = new Collection<RecipeIngredient>(this);

  constructor(body: QuantityValidator) {
    super(body);
  }
}
