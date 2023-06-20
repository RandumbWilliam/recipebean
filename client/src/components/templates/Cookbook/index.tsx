import Button from "@components/elements/Button";
import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import Input from "@components/elements/Input";
import RecipeCard from "@components/elements/RecipeCard";
import TextButton from "@components/elements/TextButton";
import {
  CookbookResponseFragment,
  useDeleteCookbookMutation,
  useUpdateCookbookMutation,
} from "@generated/graphql";
import { Grid } from "@mui/material";
import { BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import { ONYX_20, WHITE_COLOUR } from "@styles/base/colours";
import { CookbookCover } from "@utils/cookbooks/cookbookImage";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  CarouselContainer,
  CarouselDot,
  CarouselDots,
  CookbookContainer,
  CookbookHeader,
  CookbookHeaderContainer,
  CookbookSubheader,
  CookbookText,
  CookbookTitle,
  DeleteModal,
  Embla,
  EmblaContainer,
  EmptyContainer,
  EmptyText,
  ModalButtons,
  ModalCard,
  ModalCheckmark,
  ModalForm,
  StyledModal,
  WarningText,
} from "./styles";

interface CookbookTemplateProps {
  cookbook: CookbookResponseFragment;
}

const CookbookTemplate: React.FC<CookbookTemplateProps> = ({ cookbook }) => {
  const router = useRouter();
  const isMobile = useMediaQuery(`(min-width: ${BREAKPOINT_TABLET})`);

  const startIndex = CookbookCover.findIndex((item) => {
    return item.id === cookbook.cookbookCoverId;
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: startIndex,
  });
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [cookbookName, setCookbookName] = useState(cookbook.cookbookName);
  const [cookbookCoverId, setCookbookCoverId] = useState(
    cookbook.cookbookCoverId
  );
  const [, updateCookbook] = useUpdateCookbookMutation();
  const [, deleteCookbook] = useDeleteCookbookMutation();

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCookbookCoverId(CookbookCover[emblaApi.selectedScrollSnap()].id);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const handleDeleteOpenModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleCookbookName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCookbookName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCookbook({
      input: {
        cookbookName,
        cookbookCoverId,
      },
      updateCookbookId: cookbook.id,
    });

    setEditModalOpen(false);
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
      <Grid item xs={12}>
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
                    imageUrl={recipe.coverImage}
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
          <CookbookHeader>
            <CookbookTitle>{cookbookName}</CookbookTitle>
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
                setEditModalOpen(true);
              }}
            />
            <IconButton name="Trash" onClick={handleDeleteOpenModal} />
          </CookbookSubheader>
        </CookbookHeaderContainer>
        <Grid container columnSpacing={3} rowSpacing={3}>
          {body}
        </Grid>
      </CookbookContainer>
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Cookbook"
      >
        <p>
          Are you sure you want to delete <b>{cookbookName}</b>?
        </p>
        <WarningText>
          <Icon name="Warning" size={18} />{" "}
          <span>
            Deleting a cookbook will remove all recipes in this cookbook and it
            is a permanent action and cannot be undone.
          </span>
        </WarningText>
        <ModalButtons>
          <TextButton onClick={() => setDeleteModalOpen(false)} color={ONYX_20}>
            Cancel
          </TextButton>
          <TextButton onClick={handleDeleteCookbook}>Delete</TextButton>
        </ModalButtons>
      </DeleteModal>
      <StyledModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Cookbook"
      >
        <ModalForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="cookbookName"
            value={cookbookName}
            placeholder="Cookbook Name"
            onChange={handleCookbookName}
          />
          {isMobile ? (
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
          ) : (
            <>
              <CarouselContainer>
                <IconButton
                  type="button"
                  name="ChevronLeft"
                  size={42}
                  onClick={scrollPrev}
                />
                <Embla ref={emblaRef}>
                  <EmblaContainer>
                    {CookbookCover.map((cover) => (
                      <ModalCard key={cover.id} imageUrl={cover.src} />
                    ))}
                  </EmblaContainer>
                </Embla>
                <IconButton
                  type="button"
                  name="ChevronRight"
                  size={42}
                  onClick={scrollNext}
                />
              </CarouselContainer>
              <CarouselDots>
                {scrollSnaps.map((_, index) => (
                  <CarouselDot
                    key={index}
                    selected={index === selectedIndex}
                    onClick={() => scrollTo(index)}
                  />
                ))}
              </CarouselDots>
            </>
          )}
          <ModalButtons>
            <Button
              type="button"
              primary={false}
              onClick={() => setEditModalOpen(false)}
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

export default CookbookTemplate;
