import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class RecipeIngredientValidator {
  @Field()
  @IsInt()
  public order: number;

  @Field()
  @IsString()
  public ingredient: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public unit?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  public quantity?: number;
}

export default RecipeIngredientValidator;
