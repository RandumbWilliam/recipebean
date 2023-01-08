import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class QuantityValidator {
  @Field()
  @IsString()
  quantity: string;
}

export default QuantityValidator;
