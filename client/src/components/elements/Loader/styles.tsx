import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerFragment = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #ff596d;
  border-radius: 50%;
  animation: ${rotate360} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #ff596d transparent transparent transparent;
`;

export const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

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
