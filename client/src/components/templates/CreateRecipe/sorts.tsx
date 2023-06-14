import {
  RecipeHeaderIngredientResponseFragment,
  RecipeHeaderInstructionResponseFragment,
  RecipeIngredientResponseFragment,
  RecipeInstructionResponseFragment,
} from "@generated/graphql";
import {
  IngredientHeaderUnion,
  InstructionHeaderUnion,
  UnionType,
} from "./types";

export const InstructionHeaderSort = (
  instructionValues: RecipeInstructionResponseFragment[],
  instructionHeaders: RecipeHeaderInstructionResponseFragment[]
) => {
  let instructions: InstructionHeaderUnion[] = [];

  let instructionIndex = 0;
  let headerIndex = 0;

  let sortedInstructionValues = instructionValues.sort((a, b) =>
    a.order < b.order ? -1 : 1
  );
  let sortedInstructionHeaders = instructionHeaders.sort((a, b) =>
    a.order < b.order ? -1 : 1
  );

  while (
    instructionIndex < sortedInstructionValues.length &&
    headerIndex < sortedInstructionHeaders.length
  ) {
    if (
      sortedInstructionValues[instructionIndex].order <
      sortedInstructionHeaders[headerIndex].order
    ) {
      const { __typename, ...restSortedInstructionValues } =
        sortedInstructionValues[instructionIndex];

      let instructionItem: InstructionHeaderUnion = {
        type: UnionType.VALUE,
        value: restSortedInstructionValues,
      };
      instructions.push(instructionItem);
      instructionIndex += 1;
    } else {
      const { __typename, ...restSortedInstructionHeaders } =
        sortedInstructionHeaders[headerIndex];

      let headerItem: InstructionHeaderUnion = {
        type: UnionType.HEADER,
        value: restSortedInstructionHeaders,
      };
      instructions.push(headerItem);
      headerIndex += 1;
    }
  }

  if (instructionIndex < sortedInstructionValues.length) {
    let remainingInstructionValues: InstructionHeaderUnion[] =
      sortedInstructionValues.slice(instructionIndex).map((value) => {
        const { __typename, ...restValue } = value;

        return {
          type: UnionType.VALUE,
          value: restValue,
        };
      });
    instructions = [...instructions, ...remainingInstructionValues];
  }

  if (headerIndex < sortedInstructionHeaders.length) {
    let remainingInstructionHeaders: InstructionHeaderUnion[] =
      sortedInstructionHeaders.slice(headerIndex).map((header) => {
        const { __typename, ...restHeader } = header;

        return {
          type: UnionType.HEADER,
          value: restHeader,
        };
      });
    instructions = [...instructions, ...remainingInstructionHeaders];
  }

  return instructions;
};

export const IngredientHeaderSort = (
  ingredientValues: RecipeIngredientResponseFragment[],
  ingredientHeaders: RecipeHeaderIngredientResponseFragment[]
) => {
  let ingredients: IngredientHeaderUnion[] = [];

  let ingredientIndex = 0;
  let headerIndex = 0;

  let sortedIngredientValues = ingredientValues.sort((a, b) =>
    a.order < b.order ? -1 : 1
  );
  let sortedIngredientHeaders = ingredientHeaders.sort((a, b) =>
    a.order < b.order ? -1 : 1
  );

  while (
    ingredientIndex < sortedIngredientValues.length &&
    headerIndex < sortedIngredientHeaders.length
  ) {
    if (
      sortedIngredientValues[ingredientIndex].order <
      sortedIngredientHeaders[headerIndex].order
    ) {
      const { __typename, ...restSortedIngredientValues } =
        sortedIngredientValues[ingredientIndex];

      restSortedIngredientValues.measurements?.forEach((meas) => {
        const { __typename, ...restMeasurment } = meas;
        return restMeasurment;
      });

      let ingredientItem: IngredientHeaderUnion = {
        type: UnionType.VALUE,
        value: restSortedIngredientValues,
      };
      ingredients.push(ingredientItem);
      ingredientIndex += 1;
    } else {
      const { __typename, ...restSortedIngredientHeaders } =
        sortedIngredientHeaders[headerIndex];

      let headerItem: IngredientHeaderUnion = {
        type: UnionType.HEADER,
        value: restSortedIngredientHeaders,
      };
      ingredients.push(headerItem);
      headerIndex += 1;
    }
  }

  if (ingredientIndex < sortedIngredientValues.length) {
    let remainingIngredientValues: IngredientHeaderUnion[] =
      sortedIngredientValues.slice(ingredientIndex).map((value) => {
        const { __typename, ...restValue } = value;

        restValue.measurements?.forEach((meas) => {
          delete meas.__typename;
        });

        return {
          type: UnionType.VALUE,
          value: restValue,
        };
      });
    ingredients = [...ingredients, ...remainingIngredientValues];
  }

  if (headerIndex < sortedIngredientHeaders.length) {
    let remainingIngredientHeaders: IngredientHeaderUnion[] =
      sortedIngredientHeaders.slice(headerIndex).map((header) => {
        const { __typename, ...restHeader } = header;

        return {
          type: UnionType.HEADER,
          value: restHeader,
        };
      });
    ingredients = [...ingredients, ...remainingIngredientHeaders];
  }

  return ingredients;
};
