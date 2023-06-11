import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class MeasurmentValidator {
  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  public quantity?: number;

  @Field(() => [Number], { nullable: true })
  @IsArray()
  @IsOptional()
  public quantityRange?: number[];

  @Field()
  @IsBoolean()
  public isRange: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public unit?: string;

  @Field()
  @IsBoolean()
  public isConverted: boolean;
}

export default MeasurmentValidator;
