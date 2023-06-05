import Button from "@components/elements/Button";
import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import RecipeCard from "@components/elements/RecipeCard";
import TextButton from "@components/elements/TextButton";
import TextField from "@components/elements/TextField";
import {
  CookbookResponseFragment,
  useDeleteCookbookMutation,
  useUpdateCookbookMutation,
} from "@generated/graphql";
import { Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  CloseButton,
  CookbookContainer,
  CookbookEditActions,
  CookbookEditHeader,
  CookbookHeader,
  CookbookHeaderContainer,
  CookbookSubheader,
  CookbookText,
  CookbookTitle,
  EmptyContainer,
  EmptyText,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  StyledModal,
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
      <Grid item lg={12}>
        <EmptyContainer>
          <Icon name="Cookbook" size={102} color="#B9BDC3" />
          <EmptyText>Create a recipe</EmptyText>
          <Link href="/create-recipe">
            <Button>Add Recipe</Button>
          </Link>
        </EmptyContainer>
      </Grid>
    );
  } else {
    body = (
      <>
        {cookbook.recipes?.map((recipe) => {
          const timeString = (totalTime: number) => {
            const hours = Math.floor(totalTime / 60);
            const minutes = totalTime % 60;

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
            <Grid key={cookbook.id} item lg={4}>
              <Link href={`/recipe/${recipe.id}`}>
                <a>
                  <RecipeCard
                    key={recipe.id}
                    reicpeName={recipe.recipeName}
                    time={timeString(recipe.prepTime + recipe.cookTime)}
                  />
                </a>
              </Link>
            </Grid>
          );
        })}
      </>
    );
  }

  return (
    <>
      <CookbookContainer>
        <CookbookHeaderContainer>
          {editTitle ? (
            <CookbookEditHeader>
              <TextField value={title} onChange={handleTitleChange} />
              <CookbookEditActions>
                <TextButton onClick={() => setEditTitle(false)}>
                  Cancel
                </TextButton>
                <TextButton onClick={handleTitleSave}>Save</TextButton>
              </CookbookEditActions>
            </CookbookEditHeader>
          ) : (
            <>
              <CookbookHeader>
                <CookbookTitle>{title}</CookbookTitle>
                <Link href="/create-recipe">
                  <a>
                    <Button>Add Recipe</Button>
                  </a>
                </Link>
              </CookbookHeader>
              <CookbookSubheader>
                <CookbookText>
                  {recipeCountText(cookbook.recipes.length)}
                </CookbookText>
                <IconButton
                  name="Pen"
                  onClick={() => {
                    setEditTitle(true);
                    setTitle(cookbook.cookbookName!);
                  }}
                />
                <IconButton name="Trash" onClick={handleDeleteOpenModal} />
              </CookbookSubheader>
            </>
          )}
        </CookbookHeaderContainer>
        <Grid container columnSpacing={3} rowSpacing={3}>
          {body}
        </Grid>
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
            <TextButton onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </TextButton>
            <TextButton onClick={handleDeleteCookbook}>Delete</TextButton>
          </CookbookEditActions>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default CookbookTemplate;
