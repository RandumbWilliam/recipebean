import { IsInt, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class RecipeInstructionValidator {
  @Field()
  @IsInt()
  public order: number;

  @Field()
  @IsString()
  public instruction: string;

  @Field()
  @IsInt()
  public step: number;
}

export default RecipeInstructionValidator;
