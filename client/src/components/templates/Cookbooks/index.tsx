import Button from "@components/elements/Button";
import CookbookCard from "@components/elements/CookbookCard";
import Icon from "@components/elements/Icon";
import Input from "@components/elements/Input";
import {
  CookbookResponseFragment,
  useCreateCookbookMutation,
} from "@generated/graphql";
import { Grid } from "@mui/material";
import { ONYX_10, WHITE_COLOUR } from "@styles/base/colours";
import { CookbookCover } from "@utils/cookbooks/cookbookImage";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  CookbooksContainer,
  CookbooksHeader,
  CookbooksHeaderContainer,
  CookbooksText,
  CookbooksTitle,
  EmptyContainer,
  ModalButtons,
  ModalCard,
  ModalCheckmark,
  ModalForm,
  StyledModal,
} from "./styles";

interface CookbooksTemplateProps {
  cookbooks: CookbookResponseFragment[];
}

const CookbooksTemplate: React.FC<CookbooksTemplateProps> = ({ cookbooks }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [cookbookName, setcookbookName] = useState("");
  const [cookbookCoverId, setCookbookCoverId] = useState(CookbookCover[0].id);
  const [, createCookbook] = useCreateCookbookMutation();

  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcookbookName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createCookbook({
      input: { cookbookName, cookbookCoverId },
    });
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
      return "No recipes";
    }
  };

  const cookbookCountText = (cookbookCount: number) => {
    if (cookbookCount > 1) {
      return `${cookbookCount} cookbooks`;
    } else if (cookbookCount === 1) {
      return `${cookbookCount} cookbook`;
    } else {
      return "No cookbooks";
    }
  };

  const renderBody = () => {
    if (cookbooks.length === 0) {
      return (
        <Grid item lg={12}>
          <EmptyContainer>
            <Icon name="Cookbook" size={100} color={ONYX_10} />
            <p>No Cookbooks</p>
            <Button onClick={handleOpenModal}>Add Cookbook</Button>
          </EmptyContainer>
        </Grid>
      );
    }

    return (
      <>
        {cookbooks.map((cookbook) => (
          <Grid key={cookbook.id} item lg={4}>
            <Link href={`/cookbook/${cookbook.id}`}>
              <a>
                <CookbookCard
                  cookbookName={cookbook.cookbookName}
                  cookbookCoverId={cookbook.cookbookCoverId}
                  recipeText={recipeCountText(cookbook.recipes.length)}
                />
              </a>
            </Link>
          </Grid>
        ))}
      </>
    );
  };

  return (
    <>
      <CookbooksContainer>
        <CookbooksHeaderContainer>
          <CookbooksHeader>
            <CookbooksTitle>My Cookbooks</CookbooksTitle>
            <Button onClick={handleOpenModal}>Add Cookbook</Button>
          </CookbooksHeader>
          <CookbooksText>{cookbookCountText(cookbooks.length)}</CookbooksText>
        </CookbooksHeaderContainer>
        <Grid container columnSpacing={3} rowSpacing={3}>
          {renderBody()}
        </Grid>
      </CookbooksContainer>
      <StyledModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Cookbook"
      >
        <ModalForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="cookbookName"
            value={cookbookName}
            placeholder="Cookbook Name"
            onChange={handleChange}
          />
          <Grid container columnSpacing={2} rowSpacing={2}>
            {CookbookCover.map((cover) => (
              <Grid key={cover.id} item lg={4}>
                <ModalCard
                  imageUrl={cover.src}
                  selected={cover.id === cookbookCoverId}
                  onClick={() => setCookbookCoverId(cover.id)}
                >
                  {cover.id === cookbookCoverId && (
                    <ModalCheckmark>
                      <Icon name="CheckAlt" size={12} color={WHITE_COLOUR} />
                    </ModalCheckmark>
                  )}
                </ModalCard>
              </Grid>
            ))}
          </Grid>
          <ModalButtons>
            <Button
              type="button"
              primary={false}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={cookbookName === ""}>
              Confirm
            </Button>
          </ModalButtons>
        </ModalForm>
      </StyledModal>
    </>
  );
};

export default CookbooksTemplate;
