import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useDeleteCookbookMutation,
  useUpdateCookbookMutation,
} from "../../../generated/graphql";
import Button from "../../elements/Button";
import ButtonLink from "../../elements/ButtonLink";
import Icon from "../../elements/Icon";
import RecipeCard from "../../elements/RecipeCard";
import {
  CloseButton,
  CookbookActions,
  CookbookContainer,
  CookbookEditActions,
  CookbookEditHeader,
  CookbookEditIcon,
  CookbookHeader,
  CookbookRecipes,
  CookbookTitle,
  EmptyContainer,
  EmptyText,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  RecipeContainer,
  StyledContainer,
  StyledModal,
  WarningText,
} from "./styles";

interface ResultsProps {
  cookbookId: string;
  cookbookName?: string;
  recipeCount?: number;
  recipes?: {
    id: string;
    prepTime: number;
    cookTime: number;
    recipeName: string;
  }[];
}

const CookbookTemplate: React.FC<ResultsProps> = ({
  cookbookId,
  cookbookName,
  recipeCount,
  recipes,
}) => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [, updateCookbook] = useUpdateCookbookMutation();
  const [, deleteCookbook] = useDeleteCookbookMutation();

  useEffect(() => {
    setTitle(cookbookName!);
  }, [cookbookName]);

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
      updateCookbookId: cookbookId,
    });

    setEditTitle(false);
  };

  const handleDeleteCookbook = async () => {
    const { data } = await deleteCookbook({ deleteCookbookId: cookbookId });

    if (data?.deleteCookbook) {
      router.push("/cookbooks");
    }
  };

  let recipeText = () => {
    if (!recipeCount) {
      return "No recipes";
    }

    if (recipeCount > 1) {
      return `${recipeCount} recipes`;
    } else if (recipeCount == 1) {
      return `${recipeCount} recipe`;
    } else {
      return "No recipes";
    }
  };

  let body = null;

  if (recipes?.length === 0) {
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
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipeName={recipe.recipeName}
            cookTime={recipe.cookTime}
            prepTime={recipe.prepTime}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <StyledContainer>
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
                    setTitle(cookbookName!);
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
          <CookbookRecipes>{recipeText()}</CookbookRecipes>
          <RecipeContainer>{body}</RecipeContainer>
        </CookbookContainer>
      </StyledContainer>
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
