import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import RecipeInstructionValidator from "contracts/validators/recipe_instruction.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class RecipeInstruction extends Base<RecipeInstruction> {
  @Field()
  @Property()
  public order: number;

  @Field()
  @Property()
  public instruction: string;

  @Field()
  @Property()
  public step: number;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, { onDelete: "cascade" })
  public recipes: Recipe;

  constructor(body: RecipeInstructionValidator) {
    super(body);
  }
}
