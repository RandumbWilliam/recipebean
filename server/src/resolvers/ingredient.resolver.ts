import parser from "ingredientparserjs";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";

@ObjectType()
class ParsedMeasurment {
  @Field({ nullable: true })
  quantity?: number;

  @Field(() => [Number], { nullable: true })
  quantityRange?: number[];

  @Field()
  isRange: boolean;

  @Field({ nullable: true })
  unit?: string;

  @Field()
  isConverted: boolean;
}

@ObjectType()
class ParsedIngredient {
  @Field()
  ingredient: string;

  @Field(() => [String], { nullable: true })
  alternativeIngredients?: string[];

  @Field()
  hasAlternativeIngredients: boolean;

  @Field()
  hasAddedMeasurements: boolean;

  @Field({ nullable: true })
  comments?: string;

  @Field(() => [ParsedMeasurment], { nullable: true })
  measurements?: ParsedMeasurment[];
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
      hasAlternativeIngredients,
      hasAddedMeasurements,
      additional,
    } = parser.parse(strIngredient);

    let measurements;

    if (measurement) {
      measurements = [];

      if (hasAddedMeasurements) {
        measurement.forEach((meas) => {
          let measurementEntity = {};
          measurementEntity["isRange"] = meas.isRange;
          measurementEntity["unit"] = meas?.unit;
          if (meas.isRange) {
            measurementEntity["quantityRange"] = meas?.quantity;
            measurementEntity["quantity"] = null;
          } else {
            measurementEntity["quantity"] = meas?.quantity;
            measurementEntity["quantityRange"] = null;
          }

          measurementEntity["isConverted"] = false;

          measurements.push(measurementEntity);
        });
      } else {
        let measurementEntity = {};
        measurementEntity["isRange"] = measurement.isRange;
        measurementEntity["unit"] = measurement?.unit;
        if (measurement.isRange) {
          measurementEntity["quantityRange"] = measurement?.quantity;
          measurementEntity["quantity"] = null;
        } else {
          measurementEntity["quantity"] = measurement?.quantity;
          measurementEntity["quantityRange"] = null;
        }

        measurementEntity["isConverted"] = false;

        measurements.push(measurementEntity);
      }

      if (convertedMeasurement) {
        let measurementEntity = {};
        measurementEntity["isRange"] = convertedMeasurement.isRange;
        measurementEntity["unit"] = convertedMeasurement?.unit;
        if (convertedMeasurement.isRange) {
          measurementEntity["quantityRange"] = convertedMeasurement?.quantity;
          measurementEntity["quantity"] = null;
        } else {
          measurementEntity["quantity"] = convertedMeasurement?.quantity;
          measurementEntity["quantityRange"] = null;
        }

        measurementEntity["isConverted"] = true;

        measurements.push(measurementEntity);
      }
    } else {
      measurements = null;
    }

    let ingredient;
    let alternativeIngredients;
    if (hasAlternativeIngredients) {
      ingredient = name[0];
      alternativeIngredients = name.slice(1);
    } else {
      ingredient = name;
      alternativeIngredients = null;
    }

    let comments = additional;

    return {
      ingredient,
      alternativeIngredients,
      hasAlternativeIngredients,
      hasAddedMeasurements,
      comments,
      measurements,
    };
  }
}
