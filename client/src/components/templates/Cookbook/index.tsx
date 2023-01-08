import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  useCreateSectionMutation,
  useDeleteCookbookMutation,
  useUpdateCookbookMutation,
} from "../../../generated/graphql";
import Button from "../../elements/Button";
import ButtonLink from "../../elements/ButtonLink";
import Icon from "../../elements/Icon";
import RecipeCard from "../../elements/RecipeCard";
import TextField from "@mui/material/TextField";
import {
  CloseButton,
  CookbookContainer,
  CookbookEditActions,
  CookbookEditHeader,
  CookbookEditIcon,
  CookbookButton,
  CookbookHeader,
  CookbookRecipes,
  CookbookSection,
  CookbookSections,
  CookbookTitle,
  EmptyContainer,
  EmptyText,
  Grid,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  RecipeContainer,
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledModal,
  WarningText,
} from "./styles";

interface ResultsProps {
  cookbookId: string;
  sectionId: string;
  cookbookName?: string;
  sections?: {
    id: string;
    sectionName: string;
  }[];
  recipeCount?: number;
  recipes?: {
    id: string;
    prepTime: number;
    cookTime: number;
    recipeName: string;
  }[];
}

const initialForm = {
  sectionName: "",
};

const CookbookTemplate: React.FC<ResultsProps> = ({
  cookbookId,
  sectionId,
  cookbookName,
  sections,
  recipeCount,
  recipes,
}) => {
  const router = useRouter();
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState(initialForm);
  const [, createSection] = useCreateSectionMutation();
  const [, updateCookbook] = useUpdateCookbookMutation();
  const [, deleteCookbook] = useDeleteCookbookMutation();

  useEffect(() => {
    setTitle(cookbookName!);
  }, [cookbookName]);

  // const cookbookId =
  //   typeof router.query.cookbookId === "string" ? router.query.cookbookId : "";

  const handleSectionOpenModal = () => {
    setSectionModalOpen(!sectionModalOpen);
  };

  const handleDeleteOpenModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, sectionName: e.target.value });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createSection({ cookbookId, input: formData });
    if (response.data?.createSection) {
      const sectionId = response.data.createSection.id;
      router.push(`/cookbook/${cookbookId}/${sectionId}`);
    } else {
      console.log("ERROR");
    }
    window.location.reload();
  };

  const handleChangeSection = (sectionId: string) => {
    if (router.query.section !== sectionId) {
      router.push(`/cookbook/${cookbookId}/${sectionId}`);
    }
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

  if (sections?.length === 0) {
    body = (
      <EmptyContainer>
        <Icon name="Cookbook" size={102} color="#B9BDC3" />
        <EmptyText>Create a section to start adding recipes!</EmptyText>
        <Button onClick={handleSectionOpenModal}>Add Section</Button>
      </EmptyContainer>
    );
  } else if (recipes?.length === 0) {
    body = (
      <EmptyContainer>
        <Icon name="Cookbook" size={102} color="#B9BDC3" />
        <EmptyText>No recipes for this section!</EmptyText>
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
        <Grid>
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
                  <ButtonLink
                    color="#B9BDC3"
                    onClick={() => setEditTitle(false)}
                  >
                    CANCEL
                  </ButtonLink>
                  <ButtonLink onClick={handleTitleSave}>SAVE</ButtonLink>
                </CookbookEditActions>
              </CookbookEditHeader>
            ) : (
              <CookbookHeader>
                <CookbookTitle>{title}</CookbookTitle>
                <CookbookEditIcon
                  onClick={() => {
                    setEditTitle(true);
                    setTitle(cookbookName!);
                  }}
                >
                  <Icon name="Pen" size={22} color="#ff596d" />
                </CookbookEditIcon>
              </CookbookHeader>
            )}
            <CookbookRecipes>{recipeText()}</CookbookRecipes>
            <CookbookButton onClick={handleDeleteOpenModal}>
              <Icon name="Trash" size={20} color="#ff596d" />
            </CookbookButton>
            {sections && (
              <CookbookSections>
                {sections.map((section) => (
                  <CookbookSection
                    key={section.id}
                    active={section.id === sectionId}
                    onClick={() => handleChangeSection(section.id)}
                  >
                    {section.sectionName}
                  </CookbookSection>
                ))}
              </CookbookSections>
            )}
            <ButtonLink onClick={handleSectionOpenModal}>+ Section</ButtonLink>
          </CookbookContainer>
          <RecipeContainer>{body}</RecipeContainer>
        </Grid>
      </StyledContainer>
      <StyledModal
        open={sectionModalOpen}
        onClose={() => setSectionModalOpen(false)}
      >
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Add Section</ModalTitle>
            <CloseButton onClick={() => setSectionModalOpen(false)}>
              <Icon name="CloseOutline" size={24} color="#B9BDC3" />
            </CloseButton>
          </ModalHeader>
          <StyledInput
            placeholder="Section name"
            value={formData.sectionName}
            onChange={handleChange}
          />
          <StyledButton disabled={!formData.sectionName} onClick={handleSubmit}>
            Confirm
          </StyledButton>
        </ModalContainer>
      </StyledModal>
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
