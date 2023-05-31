import Button from "@components/elements/Button";
import ButtonLink from "@components/elements/ButtonLink";
import Counter from "@components/elements/Counter";
import Dropzone from "@components/elements/Dropzone";
import Icon from "@components/elements/Icon";
import TextButton from "@components/elements/TextButton";
import TextFieldElement from "@components/elements/TextField";
import {
  CookbookResponseFragment,
  RecipeHeaderIngredientResponseFragment,
  RecipeHeaderInstructionResponseFragment,
  RecipeIngredientResponseFragment,
  RecipeInstructionResponseFragment,
  useCreateRecipeMutation,
  useParseIngredientMutation,
} from "@generated/graphql";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import {
  AddHeader,
  Box,
  CloseButton,
  ColumnContainer,
  ConfirmButton,
  CreateRecipeContainer,
  CreateRecipeHeader,
  CreateRecipeTitle,
  Filler,
  InputContainer,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  NuritionText,
  RowContainer,
  RowGap,
  StyledButton,
  StyledModal,
  SubHeader,
  TimeInput,
} from "./styles";

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

interface CreateRecipeTemplateProps {
  cookbooks: CookbookResponseFragment[];
}

const CreateRecipeTemplate: React.FC<CreateRecipeTemplateProps> = ({
  cookbooks,
}) => {
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

  const [, createRecipe] = useCreateRecipeMutation();
  const [cookbookIds, setCookbookIds] = useState<string[]>([]);

  const [showSaveModal, setShowSaveModal] = useState(false);

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

  const handleCookbookSelect = (e: SelectChangeEvent<typeof cookbookIds>) => {
    const {
      target: { value },
    } = e;
    setCookbookIds(typeof value === "string" ? value.split(",") : value);
  };

  const saveRecipe = async () => {
    const ingredients = ingredientDisplay
      .filter((item) => item.type === UnionType.VALUE)
      .map((item) => item.value as RecipeIngredientResponseFragment);
    const ingredientHeaders = ingredientDisplay
      .filter((item) => item.type === UnionType.HEADER)
      .map((item) => item.value as RecipeHeaderIngredientResponseFragment);
    const instructions = instructionDisplay
      .filter((item) => item.type === UnionType.VALUE)
      .map((item) => item.value as RecipeInstructionResponseFragment);
    const instructionHeaders = instructionDisplay
      .filter((item) => item.type === UnionType.HEADER)
      .map((item) => item.value as RecipeHeaderInstructionResponseFragment);

    const createRecipeForm = {
      recipeName,
      servings,
      prepTime,
      cookTime,
      ingredients,
      instructions,
      ingredientHeaders,
      instructionHeaders,
    };

    const response = await createRecipe({
      cookbookId: cookbookIds,
      input: createRecipeForm,
    });
    if (response.data?.createRecipe) {
      console.log(response.data.createRecipe.id);
    } else {
      console.log("ERRORS");
    }
  };

  return (
    <>
      <CreateRecipeContainer>
        <CreateRecipeHeader>
          <CreateRecipeTitle>Create a Recipe</CreateRecipeTitle>
          <Button
            onClick={() => setShowSaveModal(true)}
            disabled={recipeName === ""}
          >
            Save
          </Button>
        </CreateRecipeHeader>
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
                      // adornment={
                      //   <ButtonLink
                      //     onClick={() => setShowInstructionHeader(false)}
                      //   >
                      //     <Icon name="Cross" size={14} color="#B9BDC3" />
                      //   </ButtonLink>
                      // }
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
                  {/* <ButtonLink onClick={() => setShowInstructionHeader(true)}>
                    + Add Header
                  </ButtonLink> */}
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
                        // adornment={
                        //   <ButtonLink
                        //     onClick={() => setShowIngredientHeader(false)}
                        //   >
                        //     <Icon name="Cross" size={14} color="#B9BDC3" />
                        //   </ButtonLink>
                        // }
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
                    <TextButton onClick={() => setShowIngredientHeader(true)}>
                      + Header
                    </TextButton>
                  </AddHeader>
                </form>
              </ColumnContainer>
            </Box>
          </Grid>
        </Grid>
      </CreateRecipeContainer>
      <StyledModal open={showSaveModal} onClose={() => setShowSaveModal(false)}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Add Cookbook</ModalTitle>
            <CloseButton onClick={() => setShowSaveModal(false)}>
              <Icon name="CloseOutline" size={24} color="#B9BDC3" />
            </CloseButton>
          </ModalHeader>
          <FormControl size="small">
            <InputLabel>Cookbook</InputLabel>
            <Select
              multiple
              value={cookbookIds}
              onChange={handleCookbookSelect}
            >
              {cookbooks.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.cookbookName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ConfirmButton
            disabled={cookbookIds.length === 0}
            onClick={saveRecipe}
          >
            Confirm
          </ConfirmButton>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default CreateRecipeTemplate;
