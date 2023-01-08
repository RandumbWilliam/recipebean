import { IsInt } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class RecipeIngredientValidator {
  @Field()
  @IsInt()
  order: number;
}

export default RecipeIngredientValidator;
