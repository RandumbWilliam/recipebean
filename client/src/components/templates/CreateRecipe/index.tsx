import Button from "@components/elements/Button";
import TextFieldElement from "@components/elements/TextField";
import {
  RecipeHeaderIngredientResponseFragment,
  RecipeHeaderInstructionResponseFragment,
  RecipeIngredientResponseFragment,
  RecipeInstructionResponseFragment,
  useParseIngredientMutation,
} from "@generated/graphql";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import ButtonLink from "../../elements/ButtonLink";
import Counter from "../../elements/Counter";
import Dropzone from "../../elements/Dropzone";
import Icon from "../../elements/Icon";
import Section from "../../modules/Section";
import { StrictModeDroppable } from "./StrictModeDroppable";
import {
  AddHeader,
  Box,
  ColumnContainer,
  Filler,
  IngredientContainer,
  IngredientList,
  IngredientListItem,
  InputContainer,
  InstructionList,
  MiniHeader,
  NuritionText,
  RowContainer,
  RowGap,
  StyledButton,
  SubHeader,
  TimeInput,
} from "./styles";

const listItems = [
  {
    id: "1",
    name: "Study Spanish",
  },
  {
    id: "2",
    name: "Workout",
  },
  {
    id: "3",
    name: "Film Youtube",
  },
  {
    id: "4",
    name: "Grocery Shop",
  },
];

enum UnionType {
  HEADER = "header",
  VALUE = "value",
}

interface IngredientHeaderUnion {
  type: UnionType;
  value:
    | RecipeHeaderIngredientResponseFragment
    | RecipeIngredientResponseFragment;
}

interface InstructionHeaderUnion {
  type: UnionType;
  value:
    | RecipeHeaderInstructionResponseFragment
    | RecipeInstructionResponseFragment;
}

const CreateRecipeTemplate = () => {
  const [todo, setTodo] = useState(listItems);
  const [recipeName, setRecipeName] = useState("");
  const [servings, setServings] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);

  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [ingredientValue, setIngredientValue] = useState("");
  const [ingredientDisplay, setIngredientDisplay] = useState<
    IngredientHeaderUnion[]
  >([]);
  const [ingredientCurrOrder, setIngredientCurrOrder] = useState(0);
  const [showIngredientHeader, setShowIngredientHeader] = useState(false);

  const [instructionValue, setInstructionValue] = useState("");
  const [instructionDisplay, setInstructionDisplay] = useState<
    InstructionHeaderUnion[]
  >([]);
  const [instructionCurrOrder, setInstructionCurrOder] = useState(0);
  const [instructionStep, setInstructionStep] = useState(1);
  const [showInstructionHeader, setShowInstructionHeader] = useState(false);

  const [ingredientHeader, setIngredientHeader] = useState("");
  const [instructionHeader, setInstructionHeader] = useState("");
  const [, parseIngredient] = useParseIngredientMutation();

  const handleRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(e.target.value);
  };

  const handleCoverImage = (file: File) => {
    setCoverImage(file);
  };

  const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIngredientValue(e.target.value);
  };

  const handleInstruction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInstructionValue(e.target.value);
  };

  const addIngredient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await parseIngredient({ strIngredient: ingredientValue });
    if (response.data?.parseIngredient) {
      let parsed = response.data.parseIngredient;
      let updateVal: RecipeIngredientResponseFragment = {
        order: ingredientCurrOrder,
        ingredient: parsed.ingredient,
        unit: parsed.unit,
        quantity: parsed.quantity,
      };

      let ingredientDisplayItem: IngredientHeaderUnion = {
        type: UnionType.VALUE,
        value: updateVal,
      };

      setIngredientDisplay((old) => [...old, ingredientDisplayItem]);
      setIngredientCurrOrder(ingredientCurrOrder + 1);
      setIngredientValue("");
    } else {
      console.log("ERROR");
    }
  };

  const addInstruction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let instructionInput: RecipeInstructionResponseFragment = {
      order: instructionCurrOrder,
      step: instructionStep,
      instruction: instructionValue,
    };

    let instructionDisplayItem: InstructionHeaderUnion = {
      type: UnionType.VALUE,
      value: instructionInput,
    };

    setInstructionDisplay((old) => [...old, instructionDisplayItem]);
    setInstructionCurrOder(instructionCurrOrder + 1);
    setInstructionStep(instructionStep + 1);
    setInstructionValue("");
  };

  const handlePrepTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPrepTime(parseInt(e.target.value));
  };

  const handleCookTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCookTime(parseInt(e.target.value));
  };

  const handleIngredientHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIngredientHeader(e.target.value);
  };

  const handleInstructionHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInstructionHeader(e.target.value);
  };

  const addIngredientHeader = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let headerInput: RecipeHeaderIngredientResponseFragment = {
      order: ingredientCurrOrder,
      header: ingredientHeader,
    };

    let headerDisplayItem: IngredientHeaderUnion = {
      type: UnionType.HEADER,
      value: headerInput,
    };

    setIngredientDisplay((old) => [...old, headerDisplayItem]);
    setIngredientHeader("");
    setShowIngredientHeader(false);
  };

  const addInstructionHeader = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let headerInput: RecipeHeaderInstructionResponseFragment = {
      order: instructionCurrOrder,
      header: instructionHeader,
    };

    let headerDisplayItem: InstructionHeaderUnion = {
      type: UnionType.HEADER,
      value: headerInput,
    };

    setInstructionDisplay((old) => [...old, headerDisplayItem]);
    setInstructionHeader("");
    setShowInstructionHeader(false);
  };

  const onDragEndInstruction = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const instructionItems = Array.from(instructionDisplay);
    const [newOrder] = instructionItems.splice(source.index, 1);
    instructionItems.splice(destination.index, 0, newOrder);

    let j = 1;
    for (var i = 0; i < instructionItems.length; i++) {
      instructionItems[i].value.order = i;
      if (instructionItems[i].type === UnionType.VALUE) {
        let item = instructionItems[i]
          .value as RecipeInstructionResponseFragment;
        item.step = j;
        j += 1;
      }
    }

    setInstructionDisplay(instructionItems);
  };

  const onDragEndIngredient = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const ingredientItems = Array.from(ingredientDisplay);
    const [newOrder] = ingredientItems.splice(source.index, 1);
    ingredientItems.splice(destination.index, 0, newOrder);

    for (var i = 0; i < ingredientItems.length; i++) {
      ingredientItems[i].value.order = i;
    }

    setIngredientDisplay(ingredientItems);
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 10,
    margin: `0 50px 15px 50px`,
    background: isDragging ? "#4a2975" : "white",
    color: isDragging ? "white" : "black",
    border: `1px solid black`,
    fontSize: `20px`,
    borderRadius: `5px`,

    ...draggableStyle,
  });

  const save = () => {
    console.log(recipeName);
    console.log(ingredientDisplay);
    console.log(instructionDisplay);
    console.log(prepTime);
    console.log(cookTime);
  };

  const headerActions = (
    <Button onClick={save} disabled={recipeName === ""}>
      Save
    </Button>
  );

  return (
    <Section header="Create a Recipe" actions={headerActions}>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <ColumnContainer>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Recipe Name"
              variant="standard"
              size="small"
              onChange={handleRecipeName}
              fullWidth
              inputProps={{ style: { fontSize: 30, fontWeight: 500 } }}
              InputLabelProps={{ style: { fontSize: 30, fontWeight: 500 } }}
            />
          </ColumnContainer>
          <ColumnContainer>
            <Dropzone fileCallback={handleCoverImage} />
          </ColumnContainer>
          <ColumnContainer>
            <SubHeader>Nutrition</SubHeader>
            {ingredientDisplay.filter((item) => item.type === UnionType.VALUE)
              .length === 0 ? (
              <NuritionText>
                <Icon name="Ingredient" size={30} color="#B9BDC3" />
                <span>
                  Start adding ingredients to get nutrition information
                </span>
              </NuritionText>
            ) : (
              <div>NUT</div>
            )}
          </ColumnContainer>
          <ColumnContainer>
            <SubHeader>Instructions</SubHeader>
            {instructionDisplay.length !== 0 && (
              <DragDropContext onDragEnd={onDragEndInstruction}>
                <StrictModeDroppable droppableId="instruction-droppable">
                  {(provided) => (
                    <div
                      className="instruction-droppable"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {instructionDisplay.map(({ type, value }, index) => {
                        if (type === UnionType.HEADER) {
                          const headerValue =
                            value as RecipeHeaderIngredientResponseFragment;
                          return (
                            <Draggable
                              key={`instruction-draggable_${index}`}
                              draggableId={`instruction-draggable_${index}`}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  {headerValue.header}
                                </div>
                              )}
                            </Draggable>
                          );
                        } else if (type === UnionType.VALUE) {
                          const instructionValue =
                            value as RecipeInstructionResponseFragment;
                          return (
                            <Draggable
                              key={`instruction-draggable_${index}`}
                              draggableId={`instruction-draggable_${index}`}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <span>
                                    {instructionValue.step}{" "}
                                    {instructionValue.instruction}
                                  </span>
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </DragDropContext>
            )}
            {showInstructionHeader && (
              <form onSubmit={addInstructionHeader} autoComplete="off">
                <span>Header</span>
                <InputContainer>
                  <TextFieldElement
                    value={instructionHeader}
                    type="text"
                    placeholder={`"Example "For the sauce"`}
                    name="instruction"
                    adornment={
                      <ButtonLink
                        onClick={() => setShowInstructionHeader(false)}
                      >
                        <Icon name="Cross" size={14} color="#B9BDC3" />
                      </ButtonLink>
                    }
                    onChange={handleInstructionHeader}
                  />
                  <StyledButton disabled={!instructionHeader} type="submit">
                    +
                  </StyledButton>
                </InputContainer>
              </form>
            )}
            <form onSubmit={addInstruction} autoComplete="off">
              <InputContainer>
                <TextFieldElement
                  value={instructionValue}
                  type="text"
                  placeholder="Add one or paste multiple ingredients"
                  name="ingredient"
                  onChange={handleInstruction}
                />
                <StyledButton disabled={!instructionValue} type="submit">
                  +
                </StyledButton>
              </InputContainer>
              <AddHeader>
                <ButtonLink onClick={() => setShowInstructionHeader(true)}>
                  + Add Header
                </ButtonLink>
              </AddHeader>
            </form>
          </ColumnContainer>
        </Grid>
        <Grid item md={6}>
          <ColumnContainer>
            <Filler />
          </ColumnContainer>
          <Box>
            <ColumnContainer>
              <RowGap>
                <RowContainer>
                  <SubHeader>Servings</SubHeader>
                  <Counter value={servings} setValue={setServings} />
                </RowContainer>
                <RowContainer>
                  <SubHeader>Prep Time</SubHeader>
                  <TimeInput
                    value={prepTime}
                    type="number"
                    placeholder="Minutes"
                    name="ingredient"
                    adornment={<span>minutes</span>}
                    onChange={handlePrepTime}
                    min="0"
                  />
                </RowContainer>
                <RowContainer>
                  <SubHeader>Cook Time</SubHeader>
                  <TimeInput
                    value={cookTime}
                    type="number"
                    placeholder="Minutes"
                    name="cookTime"
                    adornment={<span>minutes</span>}
                    onChange={handleCookTime}
                    min="0"
                  />
                </RowContainer>
              </RowGap>
            </ColumnContainer>
            <ColumnContainer>
              <SubHeader>Ingredients</SubHeader>
              {ingredientDisplay.length !== 0 && (
                <DragDropContext onDragEnd={onDragEndIngredient}>
                  <StrictModeDroppable droppableId="ingredient-droppable">
                    {(provided) => (
                      <div
                        className="ingredient-droppable"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {ingredientDisplay.map(({ type, value }, index) => {
                          if (type === UnionType.HEADER) {
                            const headerValue =
                              value as RecipeHeaderIngredientResponseFragment;
                            return (
                              <Draggable
                                key={`instruction-draggable_${index}`}
                                draggableId={`instruction-draggable_${index}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    {headerValue.header}
                                  </div>
                                )}
                              </Draggable>
                            );
                          } else if (type === UnionType.VALUE) {
                            const ingredientValue =
                              value as RecipeIngredientResponseFragment;
                            return (
                              <Draggable
                                key={`instruction-draggable_${index}`}
                                draggableId={`instruction-draggable_${index}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <span>
                                      <b>
                                        {ingredientValue.quantity}{" "}
                                        {ingredientValue.unit}
                                      </b>{" "}
                                      {ingredientValue.ingredient}
                                    </span>
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </StrictModeDroppable>
                </DragDropContext>
              )}
              {showIngredientHeader && (
                <form onSubmit={addIngredientHeader} autoComplete="off">
                  <span>Header</span>
                  <InputContainer>
                    <TextFieldElement
                      value={ingredientHeader}
                      type="text"
                      placeholder={`"Example "For the sauce"`}
                      name="ingredient"
                      adornment={
                        <ButtonLink
                          onClick={() => setShowIngredientHeader(false)}
                        >
                          <Icon name="Cross" size={14} color="#B9BDC3" />
                        </ButtonLink>
                      }
                      onChange={handleIngredientHeader}
                    />
                    <StyledButton disabled={!ingredientHeader} type="submit">
                      +
                    </StyledButton>
                  </InputContainer>
                </form>
              )}
              <form onSubmit={addIngredient} autoComplete="off">
                <InputContainer>
                  <TextFieldElement
                    value={ingredientValue}
                    type="text"
                    placeholder="Add one or paste multiple ingredients"
                    name="ingredient"
                    onChange={handleIngredient}
                  />
                  <StyledButton disabled={!ingredientValue} type="submit">
                    +
                  </StyledButton>
                </InputContainer>
                <AddHeader>
                  <ButtonLink onClick={() => setShowIngredientHeader(true)}>
                    + Add Header
                  </ButtonLink>
                </AddHeader>
              </form>
            </ColumnContainer>
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};

export default CreateRecipeTemplate;
