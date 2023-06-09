import parser from "ingredientparserjs";
import { parse } from "recipe-ingredient-parser-v3";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { unitSymbol } from "utils/units";

@ObjectType()
class ParsedIngredient {
  @Field()
  ingredient: string;

  @Field({ nullable: true })
  unit?: string;

  @Field({ nullable: true })
  quantity?: number;

  @Field({ nullable: true })
  comments?: string;
}

@Resolver(() => ParsedIngredient)
export class IngredientResolver {
  @Mutation(() => ParsedIngredient)
  public async parseIngredient(
    @Arg("strIngredient") strIngredient: string
  ): Promise<ParsedIngredient | null> {
    let {
      name,
      measurement,
      convertedMeasurement,
      hasAlternativeIngerdients,
      hasAddedMeasurements,
      additional,
    } = parser.parse(strIngredient);

    let ingredient, unit, quantity, minQty, maxQty, comments;

    if (hasAlternativeIngerdients) {
      ingredient = name[0];
      comments = name[1];
    } else {
      ingredient = name;
    }

    if (measurement) {
      if (measurement.isRange) {
        minQty = measurement.quantity[0];
        maxQty = measurement.quantity[1];
      } else {
        quantity = measurement.quantity;
      }
      unit = unitSymbol[measurement.unit]
        ? unitSymbol[measurement.unit]
        : measurement.unit;
    }

    if (additional) {
      if (comments) {
        comments += `, ${additional}`;
      } else {
        comments = additional;
      }
    }

    return {
      ingredient,
      unit,
      quantity,
      comments,
    };
  }
}
