import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import TextButton from "@components/elements/TextButton";
import {
  RecipeHeaderIngredientResponseFragment,
  RecipeIngredientResponseFragment,
  useParseIngredientMutation,
} from "@generated/graphql";
import { ONYX_20, WHITE_COLOUR } from "@styles/base/colours";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import {
  DragHandler,
  IngredientComments,
  IngredientItem,
  IngredientText,
  InputContainer,
  InputForm,
  InputHeader,
  InputHeaderContainer,
  Item,
  ItemList,
  StyledButton,
  StyledInput,
  SubHeader,
  SubItem,
} from "./styles";
import { IngredientHeaderUnion, UnionType } from "./types";

interface IngredientsProps {
  ingredients: IngredientHeaderUnion[];
  setIngredients: React.Dispatch<SetStateAction<IngredientHeaderUnion[]>>;
}

const Ingredients: React.FC<IngredientsProps> = ({
  ingredients,
  setIngredients,
}) => {
  const editInputRef = useRef<HTMLFormElement>(null);

  const [, parseIngredient] = useParseIngredientMutation();

  const [currentOrder, setCurrentOrder] = useState(0);
  const [ingredientValue, setIngredientValue] = useState("");
  const [headerValue, setHeaderValue] = useState("");

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string | null>(null);

  const [reorder, setReorder] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        editInputRef.current &&
        event.target.classList.contains("ingredientValue")
      )
        return;

      if (
        editInputRef.current &&
        !editInputRef.current.contains(event.target)
      ) {
        setEditIndex(null);
        setEditValue(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addIngredient = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const response = await parseIngredient({ strIngredient: ingredientValue });
    if (response.data?.parseIngredient) {
      let parsed = response.data.parseIngredient;
      console.log(parsed);
      let updateVal: RecipeIngredientResponseFragment = {
        order: currentOrder,
        ingredient: parsed.ingredient,
        unit: parsed.unit,
        quantity: parsed.quantity,
        comments: parsed.comments,
      };

      let ingredientItem: IngredientHeaderUnion = {
        type: UnionType.VALUE,
        value: updateVal,
      };

      setIngredients((oldIngredient) => [...oldIngredient, ingredientItem]);
      setCurrentOrder(currentOrder + 1);
      setIngredientValue("");
    } else {
      console.log("ERROR");
    }
  };

  const addHeader = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    let headerInput: RecipeHeaderIngredientResponseFragment = {
      order: currentOrder,
      header: headerValue,
    };

    let headerItem: IngredientHeaderUnion = {
      type: UnionType.HEADER,
      value: headerInput,
    };

    setIngredients((oldIngredients) => [...oldIngredients, headerItem]);
    setCurrentOrder(currentOrder + 1);
    setHeaderValue("");
    setShowHeader(false);
  };

  const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIngredientValue(e.target.value);
  };

  const handleHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setHeaderValue(e.target.value);
  };

  const handleEditIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditValue(e.target.value);
  };

  const updateIngredients = async (
    ingredient: IngredientHeaderUnion,
    index: number,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    if (editValue !== null) {
      const { type, value } = ingredient;
      const newIngredients = [...ingredients];

      if (type === UnionType.HEADER) {
        let headerInput: RecipeHeaderIngredientResponseFragment = {
          order: value.order,
          header: editValue,
        };

        let headerItem: IngredientHeaderUnion = {
          type: UnionType.HEADER,
          value: headerInput,
        };

        newIngredients[index] = headerItem;
        setIngredients(newIngredients);
      }

      if (type === UnionType.VALUE) {
        const response = await parseIngredient({
          strIngredient: editValue,
        });
        if (response.data?.parseIngredient) {
          let parsed = response.data.parseIngredient;
          let updateVal: RecipeIngredientResponseFragment = {
            order: value.order,
            ingredient: parsed.ingredient,
            unit: parsed.unit,
            quantity: parsed.quantity,
            comments: parsed.comments,
          };

          let ingredientItem: IngredientHeaderUnion = {
            type: UnionType.VALUE,
            value: updateVal,
          };

          newIngredients[index] = ingredientItem;
          setIngredients(newIngredients);
        }
      }
    }

    setEditIndex(null);
    setEditValue(null);
  };

  const editIngredientString = (ingredient: IngredientHeaderUnion) => {
    const { type, value } = ingredient;
    if (type === UnionType.HEADER) {
      const headerValue = value as RecipeHeaderIngredientResponseFragment;
      return headerValue.header;
    }

    if (type === UnionType.VALUE) {
      const ingredientValue = value as RecipeIngredientResponseFragment;
      if (ingredientValue.unit === null) {
        if (ingredientValue.quantity === null) {
          return `${ingredientValue.ingredient}${
            ingredientValue.comments && `, ${ingredientValue.comments}`
          }`;
        } else {
          return `${ingredientValue.quantity}${ingredientValue.ingredient} ${
            ingredientValue.comments && `, ${ingredientValue.comments}`
          }`;
        }
      }
      return `${ingredientValue.quantity} ${ingredientValue.unit} ${
        ingredientValue.ingredient
      }${ingredientValue.comments && `, ${ingredientValue.comments}`}`;
    }

    return "";
  };

  const deleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);

    for (var i = 0; i < newIngredients.length; i++) {
      newIngredients[i].value.order = i;
    }

    setCurrentOrder(currentOrder - 1);
    setIngredients(newIngredients);
  };

  const renderIngredient = (ingredient: IngredientHeaderUnion) => {
    const { type, value } = ingredient;
    switch (type) {
      case UnionType.HEADER:
        const headerValue = value as RecipeHeaderIngredientResponseFragment;
        return (
          <SubHeader className="ingredientValue">
            {headerValue.header}
          </SubHeader>
        );
      case UnionType.VALUE:
        const ingredientValue = value as RecipeIngredientResponseFragment;
        if (ingredientValue.unit === null) {
          if (ingredientValue.quantity === null) {
            return (
              <IngredientItem>
                <IngredientText className="ingredientValue">
                  {ingredientValue.ingredient}
                </IngredientText>
                {ingredientValue.comments && (
                  <IngredientComments>
                    {ingredientValue.comments}
                  </IngredientComments>
                )}
              </IngredientItem>
            );
          } else {
            return (
              <IngredientItem>
                <IngredientText className="ingredientValue">
                  {ingredientValue.quantity} {ingredientValue.ingredient}
                </IngredientText>
                {ingredientValue.comments && (
                  <IngredientComments>
                    {ingredientValue.comments}
                  </IngredientComments>
                )}
              </IngredientItem>
            );
          }
        }

        return (
          <IngredientItem>
            <IngredientText className="ingredientValue">
              {ingredientValue.quantity} {ingredientValue.unit}{" "}
              {ingredientValue.ingredient}
            </IngredientText>
            {ingredientValue.comments && (
              <IngredientComments>
                {ingredientValue.comments}
              </IngredientComments>
            )}
          </IngredientItem>
        );
      default:
        return <div className="ingredientValue">None</div>;
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newIngredients = Array.from(ingredients);
    const [newOrder] = newIngredients.splice(source.index, 1);
    newIngredients.splice(destination.index, 0, newOrder);

    for (var i = 0; i < newIngredients.length; i++) {
      newIngredients[i].value.order = i;
    }

    setIngredients(newIngredients);
  };

  return (
    <InputContainer>
      <InputHeaderContainer>
        <InputHeader>Ingredients</InputHeader>
        {ingredients.length !== 0 && (
          <>
            {reorder ? (
              <TextButton onClick={() => setReorder(false)}>Done</TextButton>
            ) : (
              <TextButton onClick={() => setReorder(true)}>Reorder</TextButton>
            )}
          </>
        )}
      </InputHeaderContainer>
      {ingredients.length !== 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="ingredients-droppable">
            {(provided) => (
              <ItemList
                className="ingredients-droppable"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {ingredients.map((ingredient, index) => {
                  if (index === editIndex) {
                    return (
                      <InputForm
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                          updateIngredients(ingredient, index, event)
                        }
                        autoComplete="off"
                        ref={editInputRef}
                      >
                        <StyledInput
                          multiline
                          type="text"
                          name="editIngredient"
                          value={
                            editValue !== null
                              ? editValue
                              : editIngredientString(ingredient)
                          }
                          onChange={handleEditIngredient}
                          adornment={
                            <button
                              type="button"
                              onClick={() => {
                                setEditIndex(null);
                                setEditValue(null);
                                deleteIngredient(index);
                              }}
                            >
                              <Icon name="Cross" color={ONYX_20} size={12} />
                            </button>
                          }
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>
                          ) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              updateIngredients(ingredient, index);
                            }
                          }}
                        />
                        <StyledButton disabled={editValue === ""} type="submit">
                          <Icon name="Check" color={WHITE_COLOUR} size={22} />
                        </StyledButton>
                      </InputForm>
                    );
                  } else {
                    return (
                      <Draggable
                        key={`ingredient-draggable_${index}`}
                        draggableId={`ingredient-draggable_${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            onClick={() => {
                              if (!reorder) {
                                setEditIndex(index);
                                setEditValue(editIngredientString(ingredient));
                              }
                            }}
                          >
                            <SubItem>
                              {reorder && (
                                <IconButton
                                  name="Cross"
                                  size={12}
                                  color={ONYX_20}
                                  onClick={() => deleteIngredient(index)}
                                />
                              )}
                              {renderIngredient(ingredient)}
                            </SubItem>
                            {reorder && (
                              <DragHandler
                                dragging={snapshot.isDragging}
                                {...provided.dragHandleProps}
                              >
                                <Icon name="Hamburger" color={ONYX_20} />
                              </DragHandler>
                            )}
                          </Item>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </ItemList>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      )}
      {showHeader && (
        <InputForm onSubmit={addHeader} autoComplete="off">
          <StyledInput
            multiline
            type="text"
            name="ingredientHeader"
            value={headerValue}
            placeholder="Add a header"
            onChange={handleHeader}
            adornment={
              <button type="button" onClick={() => setShowHeader(false)}>
                <Icon name="Cross" color={ONYX_20} size={12} />
              </button>
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addHeader();
              }
            }}
          />
          <StyledButton disabled={!headerValue} type="submit">
            <Icon name="Plus" color={WHITE_COLOUR} size={22} />
          </StyledButton>
        </InputForm>
      )}
      <InputForm onSubmit={addIngredient} autoComplete="off">
        <StyledInput
          multiline
          type="text"
          name="ingredient"
          value={ingredientValue}
          placeholder="Add one or paste multiple items"
          onChange={handleIngredient}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addIngredient();
            }
          }}
        />
        <StyledButton disabled={!ingredientValue} type="submit">
          <Icon name="Plus" color={WHITE_COLOUR} size={22} />
        </StyledButton>
      </InputForm>
      <TextButton onClick={() => setShowHeader(!showHeader)}>
        + Header
      </TextButton>
    </InputContainer>
  );
};

export default Ingredients;
