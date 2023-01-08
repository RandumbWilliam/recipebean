import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class CookbookSectionValidator {
  @Field()
  @IsString()
  sectionName: string;
}

export default CookbookSectionValidator;
