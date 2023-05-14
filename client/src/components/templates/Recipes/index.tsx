import { Grid, Input } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../../components/elements/Button";
import { useCreateCookbookMutation } from "../../../generated/graphql";
import Icon from "../../elements/Icon";
import {
  CloseButton,
  Content,
  Header,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  SectionTitle,
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledModal,
} from "./styles";

interface RecipesProps {
  header: string;
  children: JSX.Element | null;
}

const initialForm = {
  cookbookName: "",
};

const RecipesTemplate: React.FC<RecipesProps> = ({ header, children }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [, createCookbook] = useCreateCookbookMutation();

  const handleRedirectCreateRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/create-recipe");
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

  return (
    <>
      <StyledContainer>
        <Header>
          <SectionTitle>{header}</SectionTitle>
          <Button onClick={handleRedirectCreateRecipe}>Add Recipe</Button>
        </Header>
        <Grid container spacing={2}>
          {children}
        </Grid>
      </StyledContainer>
      <StyledModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Add Cookbook</ModalTitle>
            <CloseButton onClick={() => setModalOpen(false)}>
              <Icon name="CloseOutline" size={24} color="#B9BDC3" />
            </CloseButton>
          </ModalHeader>
          <StyledInput placeholder="Cookbook name" onChange={handleChange} />
          <StyledButton
            disabled={!formData.cookbookName}
            onClick={handleSubmit}
          >
            Confirm
          </StyledButton>
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default RecipesTemplate;
