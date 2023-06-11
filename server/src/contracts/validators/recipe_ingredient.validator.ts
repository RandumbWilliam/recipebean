import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Field, InputType } from "type-graphql";
import MeasurmentValidator from "./measurement.validator";

@InputType()
class RecipeIngredientValidator {
  @Field()
  @IsInt()
  public order: number;

  @Field()
  @IsString()
  public ingredient: string;

  @Field(() => [String], { nullable: true })
  @IsString()
  @IsOptional()
  public alternativeIngredients?: string[];

  @Field()
  @IsBoolean()
  public hasAlternativeIngredients: boolean;

  @Field()
  @IsBoolean()
  public hasAddedMeasurments: boolean;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  public comments?: string;

  @Field(() => [MeasurmentValidator], { nullable: true })
  @IsArray()
  public measurments?: MeasurmentValidator[];
}

export default RecipeIngredientValidator;
