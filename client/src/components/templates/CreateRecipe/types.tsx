import {
  RecipeHeaderIngredientResponseFragment,
  RecipeHeaderInstructionResponseFragment,
  RecipeIngredientResponseFragment,
  RecipeInstructionResponseFragment,
} from "@generated/graphql";

export enum UnionType {
  HEADER = "header",
  VALUE = "value",
}

export interface InstructionHeaderUnion {
  type: UnionType;
  value:
    | RecipeHeaderInstructionResponseFragment
    | RecipeInstructionResponseFragment;
}

export interface IngredientHeaderUnion {
  type: UnionType;
  value:
    | RecipeHeaderIngredientResponseFragment
    | RecipeIngredientResponseFragment;
}
