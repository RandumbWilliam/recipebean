import { IsArray, IsInt, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import RecipeHeaderValidator from "./recipe_header.validator";
import RecipeIngredientValidator from "./recipe_ingredient.validator";
import RecipeInstructionValidator from "./recipe_instruction.validator";

@InputType()
class RecipeValidator {
  @Field()
  @IsString()
  public recipeName: string;

  @Field()
  @IsInt()
  public servings: number;

  @Field()
  @IsInt()
  public prepTime: number;

  @Field()
  @IsInt()
  public cookTime: number;

  @Field(() => [RecipeIngredientValidator])
  @IsArray()
  public ingredientValues: RecipeIngredientValidator[];

  @Field(() => [RecipeInstructionValidator])
  @IsArray()
  public instructionValues: RecipeInstructionValidator[];

  @Field(() => [RecipeHeaderValidator])
  @IsArray()
  public ingredientHeaders: RecipeHeaderValidator[];

  @Field(() => [RecipeHeaderValidator])
  @IsArray()
  public instructionHeaders: RecipeHeaderValidator[];
}

export default RecipeValidator;
