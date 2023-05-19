import Button from "@components/elements/Button";
import ButtonLink from "@components/elements/ButtonLink";
import Icon from "@components/elements/Icon";
import {
  CookbookResponseFragment,
  useDeleteCookbookMutation,
  useUpdateCookbookMutation,
} from "@generated/graphql";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  CloseButton,
  CookbookActions,
  CookbookContainer,
  CookbookEditActions,
  CookbookEditHeader,
  CookbookEditIcon,
  CookbookHeader,
  CookbookRecipeContainer,
  CookbookRecipeCountText,
  CookbookTitle,
  EmptyContainer,
  EmptyText,
  FavouriteButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  RecipeCard,
  RecipeCardContainer,
  RecipeHeader,
  RecipeName,
  StyledModal,
  TimeBanner,
  TimeText,
  WarningText,
} from "./styles";

interface CookbookTemplateProps {
  cookbook: CookbookResponseFragment;
}

const CookbookTemplate: React.FC<CookbookTemplateProps> = ({ cookbook }) => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(cookbook.cookbookName);
  const [, updateCookbook] = useUpdateCookbookMutation();
  const [, deleteCookbook] = useDeleteCookbookMutation();

  const handleDeleteOpenModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCookbook({
      cookbookName: title,
      updateCookbookId: cookbook.id,
    });

    setEditTitle(false);
  };

  const handleDeleteCookbook = async () => {
    const { data } = await deleteCookbook({ deleteCookbookId: cookbook.id });

    if (data?.deleteCookbook) {
      router.push("/cookbooks");
    }
  };

  const recipeCountText = (recipeCount: number) => {
    if (recipeCount > 1) {
      return `${recipeCount} recipes`;
    } else if (recipeCount == 1) {
      return `${recipeCount} recipe`;
    } else {
      return "No recipes";
    }
  };

  let body = null;

  if (cookbook.recipes?.length === 0) {
    body = (
      <EmptyContainer>
        <Icon name="Cookbook" size={102} color="#B9BDC3" />
        <EmptyText>Create a recipe</EmptyText>
        <Link href="/create-recipe">
          <Button>Add Recipe</Button>
        </Link>
      </EmptyContainer>
    );
  } else {
    body = (
      <>
        {cookbook.recipes?.map((recipe) => {
          const totalTime = recipe.cookTime + recipe.prepTime;
          const hours = Math.floor(totalTime / 60);
          const minutes = totalTime % 60;
          return (
            <RecipeCardContainer key={recipe.id}>
              <RecipeCard>
                <RecipeHeader>
                  <TimeBanner>
                    <Icon name="Stopwatch" size={18} color="#fff" />
                    <TimeText>
                      {hours} h {minutes !== 0 && `${minutes} m`}
                    </TimeText>
                  </TimeBanner>
                  <FavouriteButton>
                    <Icon name="HeartOutline" size={22} color="#fff" />
                  </FavouriteButton>
                </RecipeHeader>
              </RecipeCard>
              <RecipeName>{recipe.recipeName}</RecipeName>
            </RecipeCardContainer>
          );
        })}
      </>
    );
  }

  return (
    <>
      <CookbookContainer>
        {editTitle ? (
          <CookbookEditHeader>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue={title}
              variant="standard"
              size="small"
              onChange={handleTitleChange}
            />
            <CookbookEditActions>
              <ButtonLink color="#B9BDC3" onClick={() => setEditTitle(false)}>
                CANCEL
              </ButtonLink>
              <ButtonLink onClick={handleTitleSave}>SAVE</ButtonLink>
            </CookbookEditActions>
          </CookbookEditHeader>
        ) : (
          <CookbookHeader>
            <CookbookTitle>{title}</CookbookTitle>
            <CookbookActions>
              <CookbookEditIcon
                onClick={() => {
                  setEditTitle(true);
                  setTitle(cookbook.cookbookName!);
                }}
              >
                <Icon name="Pen" size={22} color="#ff596d" />
              </CookbookEditIcon>
              <CookbookEditIcon onClick={handleDeleteOpenModal}>
                <Icon name="Trash" size={22} color="#ff596d" />
              </CookbookEditIcon>
            </CookbookActions>
          </CookbookHeader>
        )}
        <CookbookRecipeCountText>
          {recipeCountText(cookbook.recipes.length)}
        </CookbookRecipeCountText>
        <CookbookRecipeContainer>{body}</CookbookRecipeContainer>
      </CookbookContainer>
      <StyledModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Delete Cookbook</ModalTitle>
            <CloseButton onClick={() => setDeleteModalOpen(false)}>
              <Icon name="CloseOutline" size={24} color="#B9BDC3" />
            </CloseButton>
          </ModalHeader>
          <p>
            Are you sure you want to delete <b>{title}</b>?
          </p>
          <WarningText>
            <Icon name="Warning" size={18} color="#000" />{" "}
            <span>
              Deleting a cookbook will remove all recipes in this cookbook and
              it is a permanent action and cannot be undone.
            </span>
          </WarningText>
          <CookbookEditActions>
            <ButtonLink
              color="#B9BDC3"
              onClick={() => setDeleteModalOpen(false)}
            >
              CANCEL
            </ButtonLink>
            <ButtonLink onClick={handleDeleteCookbook}>DELETE</ButtonLink>
          </CookbookEditActions>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default CookbookTemplate;
