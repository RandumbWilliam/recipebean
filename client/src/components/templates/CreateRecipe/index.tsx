import Button from "@components/elements/Button";
import Dropzone from "@components/elements/Dropzone";
import Icon from "@components/elements/Icon";
import TextButton from "@components/elements/TextButton";
import {
  CookbookResponseFragment,
  RecipeHeaderIngredientResponseFragment,
  RecipeHeaderInstructionResponseFragment,
  RecipeIngredientResponseFragment,
  RecipeInstructionResponseFragment,
  useCreateCookbookMutation,
  useCreateRecipeMutation,
  useGetCookbooksQuery,
} from "@generated/graphql";
import { Divider, SelectChangeEvent } from "@mui/material";
import { ONYX_20, PRIMARY_COLOUR, WHITE_COLOUR } from "@styles/base/colours";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { OperationContext } from "urql";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import {
  AddCookbookButton,
  CloseButton,
  ConfirmButton,
  CreateRecipeContainer,
  CreateRecipeHeader,
  CreateRecipeHeaderContainer,
  CreateRecipeTitle,
  FormContainer,
  InputContainer,
  InputDescription,
  InputHeader,
  InputHeaderDescriptionContainer,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  SelectInput,
  SelectItem,
  StyledFormControl,
  StyledInput,
  StyledMenuItem,
  StyledModal,
  StyledSelect,
} from "./styles";
import {
  IngredientHeaderUnion,
  InstructionHeaderUnion,
  UnionType,
} from "./types";

const CreateRecipeTemplate = () => {
  const router = useRouter();
  const [, createCookbook] = useCreateCookbookMutation();
  const [{ data, fetching }, reexecuteQuery] = useGetCookbooksQuery();

  const [recipeName, setRecipeName] = useState("");
  const [servingsString, setServingsString] = useState("");
  const [prepTimeString, setPrepTimeString] = useState("");
  const [cookTimeString, setCookTimeString] = useState("");

  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [ingredients, setIngredients] = useState<IngredientHeaderUnion[]>([]);
  const [instructions, setInstructions] = useState<InstructionHeaderUnion[]>(
    []
  );

  const [, createRecipe] = useCreateRecipeMutation();
  const [cookbookIds, setCookbookIds] = useState<string[]>([]);

  const [addCookbookValue, setAddCookbookValue] = useState("");

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAddCookbook, setShowAddCookbook] = useState(false);

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [router, reexecuteQuery]);

  const handleRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(e.target.value);
  };

  const handleCoverImage = (file: File) => {
    setCoverImage(file);
  };

  const handleServings = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setServingsString(e.target.value);
    }
  };

  const handlePrepTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPrepTimeString(e.target.value);
    }
  };

  const handleCookTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setCookTimeString(e.target.value);
    }
  };

  const handleCookbookSelect = (e: SelectChangeEvent<typeof cookbookIds>) => {
    const {
      target: { value },
    } = e;
    setCookbookIds(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddCookbook = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAddCookbookValue(e.target.value);
  };

  const addCookbook = async () => {
    const response = await createCookbook({
      input: { cookbookName: addCookbookValue },
    });
    if (response.data?.createCookbook) {
      // reexecuteFetch({ requestPolicy: "network-only" });
      reexecuteQuery({ requestPolicy: "network-only" });
      // console.log(response.data.createCookbook);
    } else {
      console.log("Error");
    }
    setAddCookbookValue("");
    setShowAddCookbook(false);
  };

  const disableSave = () => {
    if (recipeName === "") return true;

    if (ingredients.length === 0) return true;

    if (instructions.length === 0) return true;

    if (servingsString === "") return true;

    if (prepTimeString === "") return true;

    if (cookTimeString === "") return true;

    return false;
  };

  const saveRecipe = async () => {
    const ingredientValues = ingredients
      .filter((item) => item.type === UnionType.VALUE)
      .map((item) => item.value as RecipeIngredientResponseFragment);
    const ingredientHeaders = ingredients
      .filter((item) => item.type === UnionType.HEADER)
      .map((item) => item.value as RecipeHeaderIngredientResponseFragment);

    const instructionValues = instructions
      .filter((item) => item.type === UnionType.VALUE)
      .map((item) => item.value as RecipeInstructionResponseFragment);
    const instructionHeaders = instructions
      .filter((item) => item.type === UnionType.HEADER)
      .map((item) => item.value as RecipeHeaderInstructionResponseFragment);

    const servings = parseInt(servingsString);
    const prepTime = parseInt(prepTimeString);
    const cookTime = parseInt(cookTimeString);

    const createRecipeForm = {
      recipeName,
      servings,
      prepTime,
      cookTime,
      ingredientValues,
      instructionValues,
      ingredientHeaders,
      instructionHeaders,
    };

    const response = await createRecipe({
      cookbookId: cookbookIds,
      input: createRecipeForm,
    });

    if (response.data?.createRecipe) {
      console.log(response.data?.createRecipe);
      router.push(`/recipe/${response.data.createRecipe.id}`);
    } else {
      console.log("ERRORS");
    }
  };

  if (fetching) {
    return <div>Loading</div>;
  }

  if (!data?.getCookbooks) {
    return <div>Error</div>;
  }

  return (
    <>
      <CreateRecipeContainer>
        <CreateRecipeHeaderContainer>
          <CreateRecipeHeader>
            <CreateRecipeTitle>Create Recipe</CreateRecipeTitle>
            <Button
              onClick={() => setShowSaveModal(true)}
              disabled={!disableSave()}
            >
              Save
            </Button>
          </CreateRecipeHeader>
        </CreateRecipeHeaderContainer>
        <FormContainer>
          <InputContainer id="recipe_name_input_container">
            <InputHeader>Recipe Name</InputHeader>
            <StyledInput
              multiline
              type="text"
              name="recipeName"
              value={recipeName}
              placeholder={`e.g. "White Bean Soup"`}
              onChange={handleRecipeName}
            />
          </InputContainer>
          <InputContainer id="cover_photo_input_container">
            <InputHeader>Cover Photo</InputHeader>
            <Dropzone fileCallback={handleCoverImage} />
          </InputContainer>
          <Ingredients
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <Instructions
            instructions={instructions}
            setInstructions={setInstructions}
          />
          <InputContainer id="servings_input_container">
            <InputHeaderDescriptionContainer>
              <InputHeader>Servings</InputHeader>
              <InputDescription>
                How many portions does this recipe make?
              </InputDescription>
            </InputHeaderDescriptionContainer>
            <StyledInput
              type="text"
              name="servings"
              placeholder="#"
              value={servingsString}
              onChange={handleServings}
            />
          </InputContainer>
          <InputContainer id="prep_time_input_container">
            <InputHeaderDescriptionContainer>
              <InputHeader>Prep Time</InputHeader>
              <InputDescription>
                How long does it take to prepare this recipe?
              </InputDescription>
            </InputHeaderDescriptionContainer>
            <StyledInput
              type="text"
              name="prepTime"
              placeholder="Minutes"
              value={prepTimeString}
              onChange={handlePrepTime}
            />
          </InputContainer>
          <InputContainer id="cook_time_input_container">
            <InputHeaderDescriptionContainer>
              <InputHeader>Cook Time</InputHeader>
              <InputDescription>
                How long does it take to cook this recipe?
              </InputDescription>
            </InputHeaderDescriptionContainer>
            <StyledInput
              type="text"
              name="cookTime"
              placeholder="Minutes"
              value={cookTimeString}
              onChange={handleCookTime}
            />
          </InputContainer>
        </FormContainer>
      </CreateRecipeContainer>
      <StyledModal open={showSaveModal} onClose={() => setShowSaveModal(false)}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Add Cookbook</ModalTitle>
            <CloseButton onClick={() => setShowSaveModal(false)}>
              <Icon name="CloseOutline" size={24} color="#B9BDC3" />
            </CloseButton>
          </ModalHeader>
          <StyledFormControl>
            <StyledSelect
              multiple
              value={cookbookIds}
              onChange={handleCookbookSelect}
              input={<SelectInput />}
              onClose={() => {
                setTimeout(() => {
                  setAddCookbookValue("");
                  setShowAddCookbook(false);
                }, 500);
              }}
            >
              <SelectItem onKeyDown={(e) => e.stopPropagation()}>
                {showAddCookbook ? (
                  <StyledInput
                    type="text"
                    name="addCookbook"
                    value={addCookbookValue}
                    onChange={handleAddCookbook}
                    adornment={
                      <AddCookbookButton type="button" onClick={addCookbook}>
                        <Icon name="Check" color={WHITE_COLOUR} size={12} />
                      </AddCookbookButton>
                    }
                  />
                ) : (
                  <TextButton onClick={() => setShowAddCookbook(true)}>
                    + New Cookbook
                  </TextButton>
                )}
              </SelectItem>
              <Divider />
              {data.getCookbooks.map((item) => (
                <StyledMenuItem value={item.id} key={item.id}>
                  {item.cookbookName}
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
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
