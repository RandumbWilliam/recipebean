import CookbookCard from "@components/elements/CookbookCard";
import Icon from "@components/elements/Icon";
import {
  CookbookResponseFragment,
  useCreateCookbookMutation,
} from "@generated/graphql";
import { Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  CloseButton,
  CookbooksButton,
  CookbooksContainer,
  CookbooksHeader,
  CookbooksHeaderContainer,
  CookbooksText,
  CookbooksTitle,
  ModalButton,
  ModalContainer,
  ModalHeader,
  ModalInput,
  ModalTitle,
  StyledModal,
} from "./styles";

const initialForm = {
  cookbookName: "",
};

interface CookbooksTemplateProps {
  cookbooks: CookbookResponseFragment[];
}

const CookbooksTemplate: React.FC<CookbooksTemplateProps> = ({ cookbooks }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [, createCookbook] = useCreateCookbookMutation();

  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, cookbookName: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createCookbook({ input: formData });
    if (response.data?.createCookbook) {
      router.push(`/cookbook/${response.data.createCookbook.id}`);
    } else {
      console.log("ERROR");
    }
  };

  const recipeCountText = (recipeCount: number) => {
    if (recipeCount > 1) {
      return `${recipeCount} recipes`;
    } else if (recipeCount === 1) {
      return `${recipeCount} recipe`;
    } else {
      return "no recipes";
    }
  };

  const cookbookCountText = (cookbookCount: number) => {
    if (cookbookCount > 1) {
      return `${cookbookCount} cookbooks`;
    } else if (cookbookCount === 1) {
      return `${cookbookCount} cookbook`;
    } else {
      return "no cookbooks";
    }
  };

  return (
    <>
      <CookbooksContainer>
        <CookbooksHeaderContainer>
          <CookbooksHeader>
            <CookbooksTitle>My Cookbooks</CookbooksTitle>
            <CookbooksButton onClick={handleOpenModal}>
              <Icon name="AddCookbook" size={20} color="#fff" />
              Add Cookbook
            </CookbooksButton>
          </CookbooksHeader>
          <CookbooksText>{cookbookCountText(cookbooks.length)}</CookbooksText>
        </CookbooksHeaderContainer>
        <Grid container columnSpacing={3} rowSpacing={3}>
          {cookbooks.map((cookbook) => (
            <Grid key={cookbook.id} item lg={4}>
              <Link href={`/cookbook/${cookbook.id}`}>
                <a>
                  <CookbookCard
                    cookbookName={cookbook.cookbookName}
                    recipeText={recipeCountText(cookbook.recipes.length)}
                  />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </CookbooksContainer>
      <StyledModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Add Cookbook</ModalTitle>
            <CloseButton onClick={() => setModalOpen(false)}>
              <Icon name="CloseOutline" size={24} color="#B9BDC3" />
            </CloseButton>
          </ModalHeader>
          <ModalInput
            placeholder="Cookbook name"
            value={formData.cookbookName}
            onChange={handleChange}
          />
          <ModalButton disabled={!formData.cookbookName} onClick={handleSubmit}>
            Confirm
          </ModalButton>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default CookbooksTemplate;
