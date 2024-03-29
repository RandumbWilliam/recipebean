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
import { BREAKPOINT_LAPTOP } from "@styles/base/breakpoints";
import { ONYX_20, WHITE_COLOUR } from "@styles/base/colours";
import { formatIngredient } from "@utils/ingredient/formatIngredient";
import { quantityFractionMap } from "@utils/ingredient/quantityFraction";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  IngredientHeaderSort,
  InstructionHeaderSort,
} from "../CreateRecipe/sorts";
import { InstructionItem } from "../CreateRecipe/styles";
import { UnionType } from "../CreateRecipe/types";
import {
  CloseButton,
  CounterContainer,
  CoverPhoto,
  Header,
  IngredientCard,
  IngredientCheckbox,
  IngredientCheckmarkIcon,
  IngredientComments,
  IngredientContainer,
  IngredientIndicator,
  IngredientInput,
  IngredientText,
  InstructionContainer,
  InstructionStep,
  InstructionText,
  MobileIngredientContainer,
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
  const initialChecklist: { [key: string]: boolean } =
    recipe.recipeIngredient.reduce(
      (dictionary: { [key: string]: boolean }, ingredient) => {
        dictionary[ingredient.order] = false;
        return dictionary;
      },
      {}
    );

  const router = useRouter();
  const isMobile = useMediaQuery(`(min-width: ${BREAKPOINT_LAPTOP})`);

  const [checkList, setCheckList] = useState<{ [key: string]: boolean }>(
    initialChecklist
  );
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
    let instructions = InstructionHeaderSort(
      recipe.recipeInstruction,
      recipe.recipeHeaderInstruction
    );

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
    let ingredients = IngredientHeaderSort(
      recipe.recipeIngredient,
      recipe.recipeHeaderIngredient
    );

    return (
      <>
        {ingredients.map((ingredient, index) => {
          const { type, value } = ingredient;
          switch (type) {
            case UnionType.HEADER:
              const headerValue =
                value as RecipeHeaderIngredientResponseFragment;
              return <SubHeader>{headerValue.header}</SubHeader>;

            case UnionType.VALUE:
              let originalIngredientValue =
                value as RecipeIngredientResponseFragment;
              let ingredientValue = {
                ...originalIngredientValue,
                measurements: originalIngredientValue.measurements?.map(
                  (meas: any) => {
                    return {
                      ...meas,
                      originalQuantity: meas.quantity,
                    };
                  }
                ),
              };
              const multiplier = servings / recipe.servings;

              const fractionStrings = [
                "0",
                ...Object.keys(quantityFractionMap),
              ];
              const fractionNumber = fractionStrings.map(Number);

              if (ingredientValue.measurements) {
                ingredientValue.measurements.forEach((meas) => {
                  if (meas.quantity) {
                    let originalFraction = parseFloat(
                      (meas.originalQuantity % 1).toFixed(3)
                    );
                    let multipliedValue = parseFloat(
                      (meas.originalQuantity * multiplier).toFixed(3)
                    );

                    if (fractionNumber.includes(originalFraction)) {
                      let multipliedFraction = parseFloat(
                        (multipliedValue % 1).toFixed(3)
                      );
                      let closestMultipliedFraction = fractionNumber.reduce(
                        function (prev, curr) {
                          return Math.abs(curr - multipliedFraction) <
                            Math.abs(prev - multipliedFraction)
                            ? curr
                            : prev;
                        }
                      );
                      meas.quantity =
                        Math.floor(multipliedValue) + closestMultipliedFraction;
                    } else {
                      meas.quantity = parseFloat(
                        (meas.originalQuantity * multiplier).toFixed(3)
                      );
                    }
                  }
                });
              }

              return (
                <IngredientCheckbox>
                  <IngredientInput
                    type="checkbox"
                    onChange={() => onCheck(ingredientValue.order)}
                  />
                  <IngredientIndicator
                    checked={checkList[ingredientValue.order]}
                  >
                    <IngredientCheckmarkIcon
                      name="CheckAlt"
                      size={10}
                      color={WHITE_COLOUR}
                      checked={checkList[ingredientValue.order]}
                    />
                  </IngredientIndicator>
                  <span>
                    <IngredientText>
                      {formatIngredient(ingredientValue)}
                    </IngredientText>
                    {ingredientValue.comments && (
                      <IngredientComments>
                        {ingredientValue.comments}
                      </IngredientComments>
                    )}
                  </span>
                </IngredientCheckbox>
              );
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

  const onCheck = (order: number) => {
    setCheckList((oldCheckList) => ({
      ...oldCheckList,
      [order]: !oldCheckList[order],
    }));
  };

  return (
    <>
      <RecipeContainer>
        <RecipeHeaderContainer>
          <RecipeHeader>
            <RecipeTitle>{recipe.recipeName}</RecipeTitle>
            <RecipeActions>
              <Link href={`/recipe/${recipe.id}/edit`}>
                <a style={{ display: "flex" }}>
                  <IconButton name="Pen" color={WHITE_COLOUR} size={24} />
                </a>
              </Link>
              <IconButton
                name="Trash"
                color={WHITE_COLOUR}
                size={24}
                onClick={() => setDeleteModalOpen(true)}
              />
            </RecipeActions>
          </RecipeHeader>
        </RecipeHeaderContainer>
        <Grid
          container
          spacing={{ xs: 3, md: 3, lg: 3 }}
          justifyContent="space-between"
        >
          <Grid item sm={12} md={6} lg={6}>
            <CoverPhoto imageUrl={recipe.coverImage} />
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
            {!isMobile && (
              <MobileIngredientContainer>
                <Header>Ingredients</Header>
                <IngredientContainer>{renderIngredients()}</IngredientContainer>
              </MobileIngredientContainer>
            )}
            <InstructionContainer>
              <Header>Instructions</Header>
              <StepContainer>{renderInstructions()}</StepContainer>
            </InstructionContainer>
          </Grid>
          {isMobile && (
            <Grid
              display="flex"
              justifyContent="flex-end"
              item
              xs={5}
              md={6}
              lg={5}
            >
              <IngredientCard>
                <Header>Ingredients</Header>
                <CounterContainer>
                  <Counter
                    value={servings}
                    setValue={setServings}
                    min={1}
                    max={99}
                  />
                  <TextButton
                    disabled={
                      recipe.servings < 2 ||
                      servings == Math.floor(recipe.servings / 2)
                    }
                    onClick={() => setServings(Math.floor(recipe.servings / 2))}
                  >
                    1/2
                  </TextButton>
                  <TextButton
                    disabled={
                      recipe.servings < 4 ||
                      servings == Math.floor(recipe.servings / 4)
                    }
                    onClick={() => setServings(Math.floor(recipe.servings / 4))}
                  >
                    1/4
                  </TextButton>
                </CounterContainer>
                <IngredientContainer>{renderIngredients()}</IngredientContainer>
              </IngredientCard>
            </Grid>
          )}
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
