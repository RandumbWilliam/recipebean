import styled, { keyframes } from "styled-components";

interface Props {
  color: string;
  size: number;
}

const rotate360 = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerFragment = styled.div<Props>`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border: ${(props) => `${props.size / 8}px`} solid ${(props) => props.color};
  border-radius: 50vh;
  animation: ${rotate360} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${(props) => props.color} transparent transparent transparent;
`;

export const Spinner = styled.div<Props>`
  display: inline-block;
  position: relative;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};

  ${SpinnerFragment}:nth-child(1) {
    animation-delay: -0.45s;
  }

  ${SpinnerFragment}:nth-child(2) {
    animation-delay: -0.3s;
  }
  ${SpinnerFragment}:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
