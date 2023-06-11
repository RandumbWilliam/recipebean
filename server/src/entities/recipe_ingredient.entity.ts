import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import RecipeIngredientValidator from "contracts/validators/recipe_ingredient.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Measurment } from "./measurement.entity";
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

  @Field(() => [String], { nullable: true })
  @Property({ nullable: true })
  public alternativeIngredients?: string[];

  @Field()
  @Property()
  public hasAlternativeIngredients: boolean;

  @Field()
  @Property()
  public hasAddedMeasurments: boolean;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public comments?: string;

  @Field(() => [Measurment], { nullable: true })
  @OneToMany(() => Measurment, (m: Measurment) => m.ingredients, {
    cascade: [Cascade.ALL],
  })
  public measurement = new Collection<Measurment>(this);

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipes: Recipe;

  constructor(body: RecipeIngredientValidator) {
    super(body);
  }
}
