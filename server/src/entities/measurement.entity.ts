import { Entity, FloatType, ManyToOne, Property } from "@mikro-orm/core";
import MeasurementValidator from "contracts/validators/measurement.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { RecipeIngredient } from "./recipe_ingredient.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class Measurement extends Base<Measurement> {
  @Field({ nullable: true })
  @Property({ type: FloatType, nullable: true })
  public quantity?: number;

  @Field(() => [Number], { nullable: true })
  @Property({ nullable: true })
  public quantityRange?: number[];

  @Field()
  @Property()
  public isRange: boolean;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public unit?: string;

  @Field()
  @Property()
  public isConverted: boolean;

  @Field(() => RecipeIngredient)
  @ManyToOne(() => RecipeIngredient, { onDelete: "cascade" })
  public ingredients: RecipeIngredient;

  constructor(body: MeasurementValidator) {
    super(body);
  }
}
