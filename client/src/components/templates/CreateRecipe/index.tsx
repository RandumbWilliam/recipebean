import React, { useState } from "react";
import Section from "../../modules/Section";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dropzone from "../../elements/Dropzone";
import Counter from "../../elements/Counter";
import {
  SubHeader,
  ColumnContainer,
  RowContainer,
  IngredientContainer,
  StyledInput,
  StyledButton,
  AddHeader,
  IngredientList,
  IngredientListItem,
  MiniHeader,
  TimerContainer,
  TimerWrapper,
  Timer,
  NuritionText,
} from "./styles";
import ButtonLink from "../../elements/ButtonLink";
import { flexbox } from "@mui/system";
import Icon from "../../elements/Icon";

const CreateRecipeTemplate = () => {
  const [recipeName, setRecipeName] = useState("");
  const [servings, setServings] = useState(0);
  const [ingredientValue, setIngredientValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instructionValue, setInstructionValue] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

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

  const addIngredient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIngredients((oldIngredient) => [...oldIngredient, ingredientValue]);
    setIngredientValue("");
  };

  const addInstruction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInstructions((oldInstruction) => [...oldInstruction, instructionValue]);
    setInstructionValue("");
  };

  return (
    <Section header="Create a Recipe">
      <Grid container spacing={12}>
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
            <SubHeader>Servings</SubHeader>
            <Counter value={servings} setValue={setServings} />
          </ColumnContainer>
          <ColumnContainer>
            <SubHeader>Ingredients</SubHeader>
            {ingredients.length !== 0 && (
              <IngredientContainer>
                <IngredientList>
                  {ingredients.map((ingredient) => (
                    <IngredientListItem>{ingredient}</IngredientListItem>
                  ))}
                </IngredientList>
              </IngredientContainer>
            )}
            <form onSubmit={addIngredient}>
              <IngredientContainer>
                <StyledInput
                  value={ingredientValue}
                  type="text"
                  placeholder="Add one or paste multiple ingredients"
                  name="ingredient"
                  onChange={handleIngredient}
                />
                <StyledButton disabled={!ingredientValue} type="submit">
                  +
                </StyledButton>
              </IngredientContainer>
              <AddHeader>
                <ButtonLink>+ Add Header</ButtonLink>
              </AddHeader>
            </form>
          </ColumnContainer>
          <ColumnContainer>
            <SubHeader>Nutrition</SubHeader>
            {ingredients.length === 0 ? (
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
        </Grid>
        <Grid item md={6}>
          <ColumnContainer>
            <Dropzone fileCallback={handleCoverImage} />
          </ColumnContainer>
          <RowContainer>
            <TimerContainer>
              <SubHeader>Prep Time</SubHeader>
              <TimerWrapper>
                <Timer>
                  <MiniHeader>Hours</MiniHeader>
                  <Counter
                    vertical={true}
                    value={servings}
                    setValue={setServings}
                  />
                </Timer>
                <Timer>
                  <MiniHeader>Minutes</MiniHeader>
                  <Counter
                    vertical={true}
                    value={servings}
                    setValue={setServings}
                  />
                </Timer>
              </TimerWrapper>
            </TimerContainer>
            <TimerContainer>
              <SubHeader>Cook Time</SubHeader>
              <TimerWrapper>
                <Timer>
                  <MiniHeader>Hours</MiniHeader>
                  <Counter
                    vertical={true}
                    value={servings}
                    setValue={setServings}
                  />
                </Timer>
                <Timer>
                  <MiniHeader>Minutes</MiniHeader>
                  <Counter
                    vertical={true}
                    value={servings}
                    setValue={setServings}
                  />
                </Timer>
              </TimerWrapper>
            </TimerContainer>
          </RowContainer>
          <ColumnContainer>
            <SubHeader>Instructions</SubHeader>
            {instructions.length !== 0 && (
              <IngredientContainer>
                <IngredientList>
                  {instructions.map((instruction) => (
                    <IngredientListItem>{instruction}</IngredientListItem>
                  ))}
                </IngredientList>
              </IngredientContainer>
            )}
            <form onSubmit={addInstruction}>
              <IngredientContainer>
                <StyledInput
                  value={instructionValue}
                  type="text"
                  placeholder="Add one or paste multiple ingredients"
                  name="ingredient"
                  onChange={handleInstruction}
                />
                <StyledButton disabled={!instructionValue} type="submit">
                  +
                </StyledButton>
              </IngredientContainer>
              <AddHeader>
                <ButtonLink>+ Add Header</ButtonLink>
              </AddHeader>
            </form>
          </ColumnContainer>
        </Grid>
      </Grid>
    </Section>
  );
};

export default CreateRecipeTemplate;
