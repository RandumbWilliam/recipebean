import { WHITE_COLOUR } from "@styles/base/colours";
import React from "react";
import Icon from "../Icon";
import { CounterButton, CounterContainer, CounterDisplay } from "./styles";

interface CounterProps {
  value: number;
  setValue: (value: number | ((prevVar: number) => number)) => void;
  min: number;
  max: number;
}

const Counter: React.FC<CounterProps> = ({ value, setValue, min, max }) => {
  const handleIncrement = () => {
    setValue((value: number) => value + 1);
  };

  const handleDecrement = () => {
    setValue((value: number) => value - 1);
  };

  const servingsText = () => {
    if (value === 1) {
      return `${value} serving`;
    } else {
      return `${value} servings`;
    }
  };

  return (
    <CounterContainer>
      <CounterButton disabled={value === min} onClick={handleDecrement}>
        <Icon name="Minus" size={12} color={WHITE_COLOUR} />
      </CounterButton>
      <CounterDisplay>{servingsText()}</CounterDisplay>
      <CounterButton disabled={value === max} onClick={handleIncrement}>
        <Icon name="Plus" size={12} color={WHITE_COLOUR} />
      </CounterButton>
    </CounterContainer>
  );
};

export default Counter;
