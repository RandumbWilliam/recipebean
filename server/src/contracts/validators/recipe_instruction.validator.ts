import { IsInt, IsNumber, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class RecipeInstructionValidator {
  @Field()
  @IsInt()
  order: number;

  @Field()
  @IsString()
  instruction: string;

  @Field()
  @IsInt()
  step: number;
}

export default RecipeInstructionValidator;
