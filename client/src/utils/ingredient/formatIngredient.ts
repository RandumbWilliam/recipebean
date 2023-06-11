import { RecipeIngredientResponseFragment } from "@generated/graphql";
import { quantityFractionMap } from "./quantityFraction";
import { unitSymbolMap } from "./unitSymbol";

const formatQuantity = (quantity: number | null | undefined) => {
  if (!quantity) return "";

  // If fraction is unconventional, return original quantity string
  if (quantityFractionMap[(quantity % 1).toFixed(3)] === undefined) {
    return quantity;
  }

  // Return mixed fraction
  if (Math.floor(quantity) === 0) {
    return `${quantityFractionMap[(quantity % 1).toFixed(3)]}`;
  } else {
    return `${Math.floor(quantity)} ${
      quantityFractionMap[(quantity % 1).toFixed(3)]
    }`;
  }
};

const formatUnit = (unit: string | null | undefined) => {
  if (!unit) return "";

  // If unit is unvoncentional, return original unit string
  if (unitSymbolMap[unit] === undefined) {
    return unit;
  }

  // Return the symbol version
  return unitSymbolMap[unit];
};

export const formatIngredient = (
  parsedIngredient: RecipeIngredientResponseFragment
) => {
  let {
    ingredient,
    alternativeIngredients,
    hasAlternativeIngredients,
    hasAddedMeasurements,
    measurement,
  } = parsedIngredient;
  if (hasAlternativeIngredients && alternativeIngredients) {
    ingredient = `${ingredient} or (${alternativeIngredients.join(", ")})`;
  }

  if (measurement) {
    let formated: string[] = [];
    let quantityUnitString;
    if (hasAddedMeasurements) {
      measurement.forEach((meas) => {
        if (!meas.isConverted) {
          let quantity;
          if (meas.isRange && meas.quantityRange) {
            quantity = `${formatQuantity(
              meas?.quantityRange[0]
            )} - ${formatQuantity(meas?.quantityRange[1])}`;
          } else {
            quantity = formatQuantity(meas.quantity);
          }

          let unit = formatUnit(meas?.unit);

          let value = `${quantity} ${unit}`;
          formated.push(value);
        }
      });
      quantityUnitString = formated.join(" + ");
    } else {
      let meas = measurement[0];
      if (!meas.isConverted) {
        let quantity;
        if (meas.isRange && meas.quantityRange) {
          quantity = `${formatQuantity(
            meas.quantityRange[0]
          )} - ${formatQuantity(meas.quantityRange[1])}`;
        } else {
          quantity = formatQuantity(meas.quantity);
        }

        let unit = formatUnit(meas.unit);

        quantityUnitString = `${quantity} ${unit}`;
      }
    }

    return `${quantityUnitString} ${ingredient}`;
  } else {
    return `${ingredient}`;
  }
};
