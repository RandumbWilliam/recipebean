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
  RecipeResponseFragment,
  useCreateCookbookMutation,
  useUpdateRecipeMutation,
} from "@generated/graphql";
import { Divider, SelectChangeEvent } from "@mui/material";
import { ERROR_COLOUR, WHITE_COLOUR } from "@styles/base/colours";
import { CookbookCover } from "@utils/cookbooks/cookbookImage";
import { formatIngredient } from "@utils/ingredient/formatIngredient";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import { IngredientHeaderSort, InstructionHeaderSort } from "./sorts";
import {
  AddCookbookButton,
  ConfirmButton,
  CreateRecipeActions,
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
  PreviewImage,
  PreviewImageChangeButton,
  PreviewImageDeleteButton,
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

const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6 MB

interface EditRecipeTemplateProps {
  cookbooks: CookbookResponseFragment[];
  recipe: RecipeResponseFragment;
}

const EditRecipeTemplate: React.FC<EditRecipeTemplateProps> = ({
  recipe,
  cookbooks,
}) => {
  let initialCurrentCookbooks: { id: string; cookbookName: string }[] = [];
  if (cookbooks.length !== 0) {
    initialCurrentCookbooks = cookbooks.map((item) => {
      return { id: item.id, cookbookName: item.cookbookName };
    });
  }

  let initialCookbookIds: string[] = [];
  if (recipe.cookbooks.length !== 0) {
    initialCookbookIds = recipe.cookbooks.map((item) => {
      return item.id;
    });
  }

  let initialIngredients = IngredientHeaderSort(
    recipe.recipeIngredient,
    recipe.recipeHeaderIngredient
  );

  let initialInstructions = InstructionHeaderSort(
    recipe.recipeInstruction,
    recipe.recipeHeaderInstruction
  );

  let initialIngredientOrder =
    initialIngredients[initialIngredients.length - 1]?.value.order;

  let initialInstructionOrder =
    initialInstructions[initialInstructions.length - 1]?.value.order;

  let initialOriginalIngredients = initialIngredients.map((item) => {
    if (item.type === UnionType.HEADER) {
      let headerItem = item.value as RecipeHeaderIngredientResponseFragment;
      return headerItem.header;
    }

    if (item.type === UnionType.VALUE) {
      let ingredientItem = item.value as RecipeIngredientResponseFragment;
      return formatIngredient(ingredientItem);
    }

    return "";
  });

  function initialStepInstruction() {
    for (var i = initialInstructions.length - 1; i >= 0; i--) {
      if (initialInstructions[i].type === UnionType.VALUE) {
        let instructionItem = initialInstructions[i]
          .value as RecipeInstructionResponseFragment;
        return instructionItem.step + 1;
      }
    }
  }

  const router = useRouter();
  const changeImageRef = useRef<HTMLInputElement>(null);
  const [, createCookbook] = useCreateCookbookMutation();

  const [recipeName, setRecipeName] = useState(recipe.recipeName);
  const [servingsString, setServingsString] = useState(
    recipe.servings.toString()
  );
  const [prepTimeString, setPrepTimeString] = useState(
    recipe.prepTime.toString()
  );
  const [cookTimeString, setCookTimeString] = useState(
    recipe.cookTime.toString()
  );

  const [coverImage, setCoverImage] = useState(recipe.coverImage);
  const [coverImageError, setCoverImageError] = useState(false);

  const [ingredients, setIngredients] =
    useState<IngredientHeaderUnion[]>(initialIngredients);
  const [instructions, setInstructions] =
    useState<InstructionHeaderUnion[]>(initialInstructions);

  const [, updateRecipe] = useUpdateRecipeMutation();
  const [fetching, setFetching] = useState(false);

  const [currentCookbooks, setCurrentCookbooks] = useState<
    { id: string; cookbookName: string }[]
  >(initialCurrentCookbooks);
  const [cookbookIds, setCookbookIds] = useState<string[]>(initialCookbookIds);

  const [addCookbookValue, setAddCookbookValue] = useState("");

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAddCookbook, setShowAddCookbook] = useState(false);

  const handleRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(e.target.value);
  };

  const handleCoverImage = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        setCoverImageError(true);
        if (readFile.size > MAX_FILE_SIZE) {
          reject(new Error("File size exceeds the maximum limit."));
          return;
        }
        setCoverImageError(false);
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file)
      .then((result: string) => setCoverImage(result))
      .catch((error: Error) => {
        console.log(error);
      });
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
    const random = Math.floor(Math.random() * CookbookCover.length);
    const randomCookbookCoverId = CookbookCover[random].id;
    const response = await createCookbook({
      input: {
        cookbookName: addCookbookValue,
        cookbookCoverId: randomCookbookCoverId,
      },
    });
    if (response.data?.createCookbook) {
      let { id, cookbookName } = response.data.createCookbook;
      let cookbookItem = { id: id, cookbookName: cookbookName };
      setCurrentCookbooks((oldCurrentCookbooks) => [
        ...oldCurrentCookbooks,
        cookbookItem,
      ]);
    } else {
      console.log("Error");
    }
    setAddCookbookValue("");
    setShowAddCookbook(false);
  };

  const deleteImage = () => {
    setCoverImage("");
  };

  const openChangeImage = () => {
    if (changeImageRef.current) {
      changeImageRef.current.click();
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.files) {
      var file = e.target.files[0];
      const reader = (readFile: File) =>
        new Promise<string>((resolve, reject) => {
          if (readFile.size > MAX_FILE_SIZE) {
            setCoverImageError(true);
            reject(new Error("File size exceeds the maximum limit."));
            return;
          }
          setCoverImageError(false);
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result as string);
          fileReader.readAsDataURL(readFile);
        });

      reader(file)
        .then((result: string) => setCoverImage(result))
        .catch((error: Error) => {
          console.log(error);
        });
      // setCoverImage(URL.createObjectURL(file));
      // URL.revokeObjectURL(coverImage);
    }
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
    setFetching(true);
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
      coverImage,
      servings,
      prepTime,
      cookTime,
      ingredientValues,
      instructionValues,
      ingredientHeaders,
      instructionHeaders,
    };

    const response = await updateRecipe({
      id: recipe.id,
      input: createRecipeForm,
      cookbookIds: cookbookIds,
    });

    if (response.data?.updateRecipe) {
      setFetching(false);
      router.push(`/recipe/${response.data.updateRecipe.id}`);
    } else {
      console.log(response);
    }
  };

  return (
    <>
      <CreateRecipeContainer>
        <CreateRecipeHeaderContainer>
          <CreateRecipeHeader>
            <CreateRecipeTitle>Edit Recipe</CreateRecipeTitle>
            <CreateRecipeActions>
              <Button
                onClick={() => setShowSaveModal(true)}
                disabled={disableSave()}
              >
                Save
              </Button>
              <Link href={`/recipe/${recipe.id}`}>
                <a>
                  <Button primary={false}>Cancel</Button>
                </a>
              </Link>
            </CreateRecipeActions>
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
            {coverImage !== "" ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  ref={changeImageRef}
                  style={{ display: "none" }}
                  onChange={handleChangeImage}
                />
                <PreviewImage imageUrl={coverImage}>
                  <PreviewImageDeleteButton onClick={deleteImage}>
                    <Icon name="TrashAlt" size={18} />
                  </PreviewImageDeleteButton>
                  <PreviewImageChangeButton onClick={openChangeImage}>
                    Change Image
                  </PreviewImageChangeButton>
                </PreviewImage>
              </>
            ) : (
              <Dropzone fileCallback={handleCoverImage} />
            )}
            {coverImageError && (
              <p style={{ color: ERROR_COLOUR }}>
                File size exceeds the maximum limit.
              </p>
            )}
          </InputContainer>
          <Ingredients
            ingredients={ingredients}
            setIngredients={setIngredients}
            initialOrder={initialIngredientOrder}
            initialOriginalString={initialOriginalIngredients}
          />
          <Instructions
            instructions={instructions}
            setInstructions={setInstructions}
            initialOrder={initialInstructionOrder}
            initialStep={initialStepInstruction()}
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
      <StyledModal
        open={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Add Cookbook"
      >
        <ModalContainer>
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
              {currentCookbooks.map((item) => (
                <StyledMenuItem value={item.id} key={item.id}>
                  {item.cookbookName}
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
          <ConfirmButton
            disabled={cookbookIds.length === 0}
            onClick={saveRecipe}
            fetching={fetching}
          >
            Confirm
          </ConfirmButton>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default EditRecipeTemplate;
