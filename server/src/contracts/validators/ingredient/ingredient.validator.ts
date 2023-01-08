import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class IngredientValidator {
  @Field()
  @IsString()
  ingredient: string;
}

export default IngredientValidator;
