import { IsInt, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class RecipeHeaderValidator {
  @Field()
  @IsInt()
  order: number;

  @Field()
  @IsString()
  headerTitle: string;
}

export default RecipeHeaderValidator;
