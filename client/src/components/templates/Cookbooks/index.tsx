import Button from "@components/elements/Button";
import CookbookCard from "@components/elements/CookbookCard";
import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import Input from "@components/elements/Input";
import {
  CookbookResponseFragment,
  useCreateCookbookMutation,
} from "@generated/graphql";
import { Grid } from "@mui/material";
import { BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import { ONYX_10, WHITE_COLOUR } from "@styles/base/colours";
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
  CookbooksContainer,
  CookbooksHeader,
  CookbooksHeaderContainer,
  CookbooksText,
  CookbooksTitle,
  Embla,
  EmblaContainer,
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
  const isMobile = useMediaQuery(`(min-width: ${BREAKPOINT_TABLET})`);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [cookbookName, setcookbookName] = useState("");
  const [cookbookCoverId, setCookbookCoverId] = useState(CookbookCover[0].id);
  const [{ fetching }, createCookbook] = useCreateCookbookMutation();

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
        <Grid item xs={12}>
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
          <Grid key={cookbook.id} item xs={12} sm={6} md={4}>
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
          {isMobile ? (
            <Grid container columnSpacing={2} rowSpacing={2}>
              {CookbookCover.map((cover) => (
                <Grid key={cover.id} item xs={4}>
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
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={cookbookName === ""}
              fetching={fetching}
            >
              Confirm
            </Button>
          </ModalButtons>
        </ModalForm>
      </StyledModal>
    </>
  );
};

export default CookbooksTemplate;
