import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class CookbookValidator {
  @Field()
  @IsString()
  cookbookName: string;
}

export default CookbookValidator;
