import Icon from "@components/elements/Icon";
import IconButton from "@components/elements/IconButton";
import TextButton from "@components/elements/TextButton";
import {
  RecipeHeaderInstructionResponseFragment,
  RecipeInstructionResponseFragment,
} from "@generated/graphql";
import { ONYX_20, WHITE_COLOUR } from "@styles/base/colours";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import {
  DragHandler,
  InputContainer,
  InputForm,
  InputHeader,
  InputHeaderContainer,
  InstructionItem,
  InstructionStep,
  InstructionText,
  Item,
  ItemList,
  StyledButton,
  StyledInput,
  SubHeader,
  SubItem,
} from "./styles";
import { InstructionHeaderUnion, UnionType } from "./types";

interface InstructionProps {
  instructions: InstructionHeaderUnion[];
  setInstructions: React.Dispatch<SetStateAction<InstructionHeaderUnion[]>>;
}

const Instructions: React.FC<InstructionProps> = ({
  instructions,
  setInstructions,
}) => {
  const editInputRef = useRef<HTMLFormElement>(null);

  const [currentOrder, setCurrentOrder] = useState(0);
  const [step, setStep] = useState(1);
  const [instructionValue, setInstructionValue] = useState("");
  const [headerValue, setHeaderValue] = useState("");

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string | null>(null);

  const [reorder, setReorder] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        editInputRef.current &&
        event.target.classList.contains("instructionValue")
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

  const addInstruction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let instructionInput: RecipeInstructionResponseFragment = {
      order: currentOrder,
      step: step,
      instruction: instructionValue,
    };

    let instructionItem: InstructionHeaderUnion = {
      type: UnionType.VALUE,
      value: instructionInput,
    };

    setInstructions((oldInstruction) => [...oldInstruction, instructionItem]);
    setCurrentOrder(currentOrder + 1);
    setStep(step + 1);
    setInstructionValue("");
  };

  const addHeader = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let headerInput: RecipeHeaderInstructionResponseFragment = {
      order: currentOrder,
      header: headerValue,
    };

    let headerItem: InstructionHeaderUnion = {
      type: UnionType.HEADER,
      value: headerInput,
    };

    setInstructions((oldInstructions) => [...oldInstructions, headerItem]);
    setHeaderValue("");
    setShowHeader(false);
  };

  const handleInstruction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInstructionValue(e.target.value);
  };

  const handleHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setHeaderValue(e.target.value);
  };

  const handleEditInstruction = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditValue(e.target.value);
  };

  const updateInstructions = (
    e: React.FormEvent<HTMLFormElement>,
    instruction: InstructionHeaderUnion,
    index: number
  ) => {
    e.preventDefault();
    if (editValue === null) return;

    const { type, value } = instruction;
    const newInstructions = [...instructions];

    if (type === UnionType.HEADER) {
      let headerInput: RecipeHeaderInstructionResponseFragment = {
        order: value.order,
        header: editValue,
      };

      let headerItem: InstructionHeaderUnion = {
        type: UnionType.HEADER,
        value: headerInput,
      };

      newInstructions[index] = headerItem;
      setInstructions(newInstructions);
    }

    if (type === UnionType.VALUE) {
      let instructionValue = value as RecipeInstructionResponseFragment;

      let updateVal: RecipeInstructionResponseFragment = {
        order: value.order,
        step: instructionValue.step,
        instruction: editValue,
      };

      let instructionItem: InstructionHeaderUnion = {
        type: UnionType.VALUE,
        value: updateVal,
      };

      newInstructions[index] = instructionItem;
      setInstructions(newInstructions);
    }
    setEditIndex(null);
    setEditValue(null);
  };

  const editInstructionString = (instruction: InstructionHeaderUnion) => {
    const { type, value } = instruction;
    if (type === UnionType.HEADER) {
      const headerValue = value as RecipeHeaderInstructionResponseFragment;
      return headerValue.header;
    }

    if (type === UnionType.VALUE) {
      const instructionValue = value as RecipeInstructionResponseFragment;
      return instructionValue.instruction;
    }

    return "";
  };

  const deleteInstruction = (index: number, type: UnionType) => {
    const newInstructions = instructions.filter((_, i) => i !== index);

    if (type === UnionType.VALUE) {
      setStep(step - 1);
    }

    let j = 1;
    for (var i = 0; i < newInstructions.length; i++) {
      newInstructions[i].value.order = i;
      if (newInstructions[i].type === UnionType.VALUE) {
        let instructionItem = newInstructions[i]
          .value as RecipeInstructionResponseFragment;
        instructionItem.step = j;
        j += 1;
      }
    }

    setCurrentOrder(currentOrder - 1);
    setInstructions(newInstructions);
  };

  const renderInstruction = (instruction: InstructionHeaderUnion) => {
    const { type, value } = instruction;
    switch (type) {
      case UnionType.HEADER:
        const headerValue = value as RecipeHeaderInstructionResponseFragment;
        return (
          <SubHeader className="instructionValue">
            {headerValue.header}
          </SubHeader>
        );
      case UnionType.VALUE:
        const instructionValue = value as RecipeInstructionResponseFragment;
        return (
          <InstructionItem className="instructionValue">
            <InstructionStep>{`Step ${instructionValue.step}`}</InstructionStep>
            <InstructionText>{instructionValue.instruction}</InstructionText>
          </InstructionItem>
        );
      default:
        return <div>None</div>;
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newInstructions = Array.from(instructions);
    const [newOrder] = newInstructions.splice(source.index, 1);
    newInstructions.splice(destination.index, 0, newOrder);

    let j = 1;
    for (var i = 0; i < newInstructions.length; i++) {
      newInstructions[i].value.order = i;
      if (newInstructions[i].type === UnionType.VALUE) {
        let instructionItem = newInstructions[i]
          .value as RecipeInstructionResponseFragment;
        instructionItem.step = j;
        j += 1;
      }
    }

    setInstructions(newInstructions);
  };

  return (
    <InputContainer>
      <InputHeaderContainer>
        <InputHeader>Instructions</InputHeader>
        {instructions.length !== 0 && (
          <>
            {reorder ? (
              <TextButton onClick={() => setReorder(false)}>Done</TextButton>
            ) : (
              <TextButton onClick={() => setReorder(true)}>Reorder</TextButton>
            )}
          </>
        )}
      </InputHeaderContainer>
      {instructions.length !== 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="instructions-droppable">
            {(provided) => (
              <ItemList
                className="instructions-droppable"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {instructions.map((instruction, index) => {
                  if (index === editIndex) {
                    return (
                      <InputForm
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                          updateInstructions(event, instruction, index)
                        }
                        autoComplete="off"
                        ref={editInputRef}
                      >
                        <StyledInput
                          multiline
                          type="text"
                          name="editInstruction"
                          value={
                            editValue !== null
                              ? editValue
                              : editInstructionString(instruction)
                          }
                          onChange={handleEditInstruction}
                          adornment={
                            <button
                              type="button"
                              onClick={() => {
                                deleteInstruction(index, instruction.type);
                                setEditIndex(null);
                                setEditValue(null);
                              }}
                            >
                              <Icon name="Cross" color={ONYX_20} size={12} />
                            </button>
                          }
                        />
                        <StyledButton disabled={editValue === ""} type="submit">
                          <Icon name="Check" color={WHITE_COLOUR} size={22} />
                        </StyledButton>
                      </InputForm>
                    );
                  } else {
                    return (
                      <Draggable
                        key={`instruction-draggable_${index}`}
                        draggableId={`instruction-draggable_${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            onClick={() => {
                              if (!reorder) {
                                setEditIndex(index);
                                setEditValue(
                                  editInstructionString(instruction)
                                );
                              }
                            }}
                          >
                            <SubItem>
                              {reorder && (
                                <IconButton
                                  name="Cross"
                                  size={12}
                                  color={ONYX_20}
                                  onClick={() =>
                                    deleteInstruction(index, instruction.type)
                                  }
                                />
                              )}
                              {renderInstruction(instruction)}
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
            name="instructionHeader"
            value={headerValue}
            placeholder="Add a header"
            onChange={handleHeader}
            adornment={
              <button type="button" onClick={() => setShowHeader(false)}>
                <Icon name="Cross" color={ONYX_20} size={12} />
              </button>
            }
          />
          <StyledButton disabled={!headerValue} type="submit">
            <Icon name="Plus" color={WHITE_COLOUR} size={22} />
          </StyledButton>
        </InputForm>
      )}
      <InputForm onSubmit={addInstruction} autoComplete="off">
        <StyledInput
          multiline
          type="text"
          name="instruction"
          value={instructionValue}
          placeholder="Add one or paste multiple items"
          onChange={handleInstruction}
        />
        <StyledButton disabled={!instructionValue} type="submit">
          <Icon name="Plus" color={WHITE_COLOUR} size={22} />
        </StyledButton>
      </InputForm>
      <TextButton onClick={() => setShowHeader(!showHeader)}>
        + Header
      </TextButton>
    </InputContainer>
  );
};

export default Instructions;
