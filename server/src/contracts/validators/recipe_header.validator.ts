import { IsInt, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class RecipeHeaderValidator {
  @Field()
  @IsInt()
  public order: number;

  @Field()
  @IsString()
  public header: string;
}

export default RecipeHeaderValidator;
