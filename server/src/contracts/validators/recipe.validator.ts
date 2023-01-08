import { IsString, IsNumber, IsArray } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Property } from "@mikro-orm/core";

@InputType()
class IngredientType {
  @Field()
  @Property()
  public type: "ingredient" | "header";

  @Field()
  @Property()
  public value: string;
}

@InputType()
class RecipeValidator {
  @Field()
  @IsString()
  public recipeName: string;

  @Field()
  @IsNumber()
  public servings: number;

  @Field()
  @IsNumber()
  public prepTime: number;

  @Field()
  @IsNumber()
  public cookTime: number;

  @Field(() => [IngredientType])
  @IsArray()
  public ingredients: IngredientType[];
}

export default RecipeValidator;
