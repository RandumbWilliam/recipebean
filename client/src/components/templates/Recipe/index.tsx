import Counter from "@components/elements/Counter";
import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import TextButton from "@components/elements/TextButton";
import {
  RecipeHeaderIngredientResponseFragment,
  RecipeHeaderInstructionResponseFragment,
  RecipeIngredientResponseFragment,
  RecipeInstructionResponseFragment,
  RecipeResponseFragment,
  useDeleteRecipeMutation,
} from "@generated/graphql";
import { Grid } from "@mui/material";
import { ONYX_20, WHITE_COLOUR } from "@styles/base/colours";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InstructionItem } from "../CreateRecipe/styles";
import {
  IngredientHeaderUnion,
  InstructionHeaderUnion,
  UnionType,
} from "../CreateRecipe/types";
import {
  CloseButton,
  CoverPhoto,
  Header,
  IngredientCard,
  IngredientContainer,
  IngredientText,
  InstructionContainer,
  InstructionStep,
  InstructionText,
  ModalActions,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  RecipeActions,
  RecipeContainer,
  RecipeHeader,
  RecipeHeaderContainer,
  RecipeTitle,
  StepContainer,
  StyledModal,
  SubHeader,
  TimeContainer,
  TimeText,
  TimeTextContainer,
  TimeTitle,
  WarningText,
} from "./styles";

interface RecipeTemplateProps {
  recipe: RecipeResponseFragment;
}

const RecipeTemplate: React.FC<RecipeTemplateProps> = ({ recipe }) => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [servings, setServings] = useState(recipe.servings);
  const [, deleteRecipe] = useDeleteRecipeMutation();

  const handleDeleteRecipe = async () => {
    const { data } = await deleteRecipe({ deleteRecipeId: recipe.id });

    if (data?.deleteRecipe) {
      router.push(`/cookbooks`);
    }
  };

  const renderInstructions = () => {
    let instructions: InstructionHeaderUnion[] = [];

    let instructionIndex = 0;
    let headerIndex = 0;

    let sortedInstructionValues = recipe.recipeInstruction.sort((a, b) =>
      a.order < b.order ? -1 : 1
    );
    let sortedInstructionHeaders = recipe.recipeHeaderInstruction.sort((a, b) =>
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
        let instructionItem: InstructionHeaderUnion = {
          type: UnionType.VALUE,
          value: sortedInstructionValues[instructionIndex],
        };
        instructions.push(instructionItem);
        instructionIndex += 1;
      } else {
        let headerItem: InstructionHeaderUnion = {
          type: UnionType.HEADER,
          value: sortedInstructionHeaders[headerIndex],
        };
        instructions.push(headerItem);
        headerIndex += 1;
      }
    }

    while (instructionIndex < sortedInstructionValues.length) {
      let instructionItem: InstructionHeaderUnion = {
        type: UnionType.VALUE,
        value: sortedInstructionValues[instructionIndex],
      };
      instructions.push(instructionItem);
      instructionIndex += 1;
    }

    while (headerIndex < sortedInstructionHeaders.length) {
      let headerItem: InstructionHeaderUnion = {
        type: UnionType.HEADER,
        value: sortedInstructionHeaders[headerIndex],
      };
      instructions.push(headerItem);
      headerIndex += 1;
    }

    return (
      <>
        {instructions.map((instruction, index) => {
          const { type, value } = instruction;
          if (type === UnionType.HEADER) {
            const headerValue =
              value as RecipeHeaderInstructionResponseFragment;
            return <SubHeader>{headerValue.header}</SubHeader>;
          }

          if (type === UnionType.VALUE) {
            const instructionValue = value as RecipeInstructionResponseFragment;
            return (
              <InstructionItem>
                <InstructionStep>{`Step ${instructionValue.step}`}</InstructionStep>
                <InstructionText>
                  {instructionValue.instruction}
                </InstructionText>
              </InstructionItem>
            );
          }
        })}
      </>
    );
  };

  const renderIngredients = () => {
    let ingredients: IngredientHeaderUnion[] = [];

    let ingredientIndex = 0;
    let headerIndex = 0;

    let sortedIngredientValues = recipe.recipeIngredient.sort((a, b) =>
      a.order < b.order ? -1 : 1
    );
    let sortedIngredientHeaders = recipe.recipeHeaderIngredient.sort((a, b) =>
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
        let ingredientItem: IngredientHeaderUnion = {
          type: UnionType.VALUE,
          value: sortedIngredientValues[ingredientIndex],
        };
        ingredients.push(ingredientItem);
        ingredientIndex += 1;
      } else {
        let headerItem: IngredientHeaderUnion = {
          type: UnionType.HEADER,
          value: sortedIngredientHeaders[headerIndex],
        };
        ingredients.push(headerItem);
        headerIndex += 1;
      }
    }

    while (ingredientIndex < sortedIngredientValues.length) {
      let ingredientItem: IngredientHeaderUnion = {
        type: UnionType.VALUE,
        value: sortedIngredientValues[ingredientIndex],
      };
      ingredients.push(ingredientItem);
      ingredientIndex += 1;
    }

    while (headerIndex < sortedIngredientHeaders.length) {
      let headerItem: IngredientHeaderUnion = {
        type: UnionType.HEADER,
        value: sortedIngredientHeaders[headerIndex],
      };
      ingredients.push(headerItem);
      headerIndex += 1;
    }

    return (
      <>
        {ingredients.map((ingredient, index) => {
          const { type, value } = ingredient;
          if (type === UnionType.HEADER) {
            const headerValue = value as RecipeHeaderIngredientResponseFragment;
            return <SubHeader>{headerValue.header}</SubHeader>;
          }

          if (type === UnionType.VALUE) {
            const ingredientValue = value as RecipeIngredientResponseFragment;
            const multiplier = servings / recipe.servings;

            if (ingredientValue.unit === null) {
              if (ingredientValue.quantity === 0) {
                return (
                  <IngredientText>{ingredientValue.ingredient}</IngredientText>
                );
              } else {
                if (
                  ingredientValue.quantity !== null &&
                  ingredientValue.quantity !== undefined
                ) {
                  const quantity =
                    Math.round(ingredientValue.quantity * multiplier * 10) / 10;

                  return (
                    <IngredientText>
                      {quantity} {ingredientValue.ingredient}
                    </IngredientText>
                  );
                }
              }
            }

            if (
              ingredientValue.quantity !== null &&
              ingredientValue.quantity !== undefined
            ) {
              const quantity =
                Math.round(ingredientValue.quantity * multiplier * 10) / 10;

              return (
                <IngredientText>
                  {quantity} {ingredientValue.unit} {ingredientValue.ingredient}
                </IngredientText>
              );
            }

            return <div>Error</div>;
          }
        })}
      </>
    );
  };

  const timeText = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    let result = [];
    if (hours !== 0) {
      result.push(`${hours}h`);
    }

    if (minutes !== 0) {
      result.push(`${minutes}m`);
    }

    return result.join(" ");
  };

  return (
    <>
      <RecipeContainer>
        <RecipeHeaderContainer>
          <RecipeHeader>
            <RecipeTitle>{recipe.recipeName}</RecipeTitle>
            <RecipeActions>
              <IconButton name="Pen" color={WHITE_COLOUR} size={24} />
              <IconButton
                name="Trash"
                color={WHITE_COLOUR}
                size={24}
                onClick={() => setDeleteModalOpen(true)}
              />
            </RecipeActions>
          </RecipeHeader>
        </RecipeHeaderContainer>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item lg={6}>
            <CoverPhoto />
            <TimeContainer>
              <Icon name="Stopwatch" color={ONYX_20} size={22} />
              <TimeTextContainer>
                <TimeText>
                  <TimeTitle>Prep:</TimeTitle> {timeText(recipe.prepTime)}
                </TimeText>
                <TimeText>
                  <TimeTitle>Cook:</TimeTitle> {timeText(recipe.cookTime)}
                </TimeText>
              </TimeTextContainer>
            </TimeContainer>
            <InstructionContainer>
              <Header>Instructions</Header>
              <StepContainer>{renderInstructions()}</StepContainer>
            </InstructionContainer>
          </Grid>
          <Grid item lg={5}>
            <IngredientCard>
              <Header>Ingredients</Header>
              <Counter
                value={servings}
                setValue={setServings}
                min={1}
                max={99}
              />
              <IngredientContainer>{renderIngredients()}</IngredientContainer>
            </IngredientCard>
          </Grid>
        </Grid>
      </RecipeContainer>
      <StyledModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Delete Recipe</ModalTitle>
            <CloseButton onClick={() => setDeleteModalOpen(false)}>
              <Icon name="CloseOutline" size={24} color="#B9BDC3" />
            </CloseButton>
          </ModalHeader>
          <p>
            Are you sure you want to delete <b>{recipe.recipeName}</b>?
          </p>
          <WarningText>
            <Icon name="Warning" size={18} color="#000" />{" "}
            <span>
              Deleting a recipe is a permanent action and cannot be undone.
            </span>
          </WarningText>
          <ModalActions>
            <TextButton onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </TextButton>
            <TextButton onClick={handleDeleteRecipe}>Delete</TextButton>
          </ModalActions>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default RecipeTemplate;
