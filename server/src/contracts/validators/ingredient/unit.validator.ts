import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class UnitValidator {
  @Field()
  @IsString()
  unit: string;
}

export default UnitValidator;
