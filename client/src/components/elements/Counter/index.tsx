import React from "react";
import {
  CounterButton,
  CounterDisplay,
  CounterItem,
  CounterWrapper,
} from "./styles";

interface CounterProps {
  vertical?: boolean;
  value: number;
  setValue: (value: number | ((prevVar: number) => number)) => void;
}

const Counter: React.FC<CounterProps> = ({
  value,
  setValue,
  vertical = false,
}) => {
  const handleIncrement = () => {
    setValue((value: number) => value + 1);
  };

  const handleDecrement = () => {
    setValue((value: number) => value - 1);
  };

  return (
    <CounterWrapper vertical={vertical}>
      {vertical ? (
        <>
          <CounterItem>
            <CounterButton
              disabled={value === 99}
              onClick={handleDecrement}
              vertical={vertical}
            >
              +
            </CounterButton>
          </CounterItem>
          <CounterItem>
            <CounterDisplay vertical={vertical}>
              <span>{value}</span>
            </CounterDisplay>
          </CounterItem>
          <CounterItem>
            <CounterButton
              disabled={value === 0}
              onClick={handleIncrement}
              vertical={vertical}
            >
              -
            </CounterButton>
          </CounterItem>
        </>
      ) : (
        <>
          <CounterItem>
            <CounterButton
              disabled={value === 0}
              onClick={handleDecrement}
              vertical={vertical}
            >
              -
            </CounterButton>
          </CounterItem>
          <CounterItem>
            <CounterDisplay vertical={vertical}>
              <span>{value}</span>
            </CounterDisplay>
          </CounterItem>
          <CounterItem>
            <CounterButton
              disabled={value === 99}
              onClick={handleIncrement}
              vertical={vertical}
            >
              +
            </CounterButton>
          </CounterItem>
        </>
      )}
    </CounterWrapper>
  );
};

export default Counter;
