import { IsInt, IsNumber, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class RecipeIngredientValidator {
  @Field()
  @IsInt()
  order: number;

  @Field()
  @IsString()
  ingredient: string;

  @Field()
  @IsString()
  unit: string;

  @Field()
  @IsNumber()
  quantity: number;
}

export default RecipeIngredientValidator;
