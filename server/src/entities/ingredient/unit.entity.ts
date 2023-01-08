import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import UnitValidator from "contracts/validators/ingredient/unit.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { RecipeIngredient } from "../recipe_ingredient.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class Unit extends Base<Unit> {
  @Field()
  @Property()
  @Unique()
  public unit: string;

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, (r: RecipeIngredient) => r.units)
  public recipeIngredients = new Collection<RecipeIngredient>(this);

  constructor(body: UnitValidator) {
    super(body);
  }
}
