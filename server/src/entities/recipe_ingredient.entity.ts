import {
  Cascade,
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import RecipeIngredientValidator from "contracts/validators/recipe_ingredient.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Measurement } from "./measurement.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class RecipeIngredient extends Base<RecipeIngredient> {
  @Field()
  @Property()
  public order: number;

  @Field()
  @Index({ type: "fulltext" })
  @Property()
  public ingredient: string;

  @Field(() => [String], { nullable: true })
  @Property({ nullable: true })
  public alternativeIngredients?: string[];

  @Field()
  @Property()
  public hasAlternativeIngredients: boolean;

  @Field()
  @Property()
  public hasAddedMeasurements: boolean;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public comments?: string;

  @Field(() => [Measurement], { nullable: true })
  @OneToMany(() => Measurement, (m: Measurement) => m.ingredients, {
    cascade: [Cascade.ALL],
  })
  public measurements = new Collection<Measurement>(this);

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipes: Recipe;

  constructor(body: RecipeIngredientValidator) {
    super(body);
  }
}
