import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import RecipeIngredientValidator from "contracts/validators/recipe_ingredient.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Ingredient } from "./ingredient/ingredient.entity";
import { Unit } from "./ingredient/unit.entity";
import { Quantity } from "./ingredient/quantity.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class RecipeIngredient extends Base<RecipeIngredient> {
  @Field()
  @Property()
  public order: number;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipes: Recipe;

  @Field(() => Ingredient)
  @ManyToOne(() => Ingredient, { onDelete: "cascade" })
  public ingredients: Ingredient;

  @Field(() => Unit)
  @ManyToOne(() => Unit, { onDelete: "cascade" })
  public units: Unit;

  @Field(() => Quantity)
  @ManyToOne(() => Quantity, { onDelete: "cascade" })
  public quantities: Quantity;

  constructor(body: RecipeIngredientValidator) {
    super(body);
  }
}
