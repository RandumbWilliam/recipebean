import styled from "styled-components";

interface Props {
  vertical: boolean;
}

export const CounterWrapper = styled.div<Props>`
  display: grid;
  background-color: #eef1f7;
  border-radius: 10px;
  width: ${(props) => (props.vertical ? "70px" : "180px")};
  height: ${(props) => (props.vertical ? "150px" : "50px")};
  ${(props) =>
    props.vertical
      ? `
    grid-template-rows: 50px 50px 50px;
  `
      : `
    grid-template-columns: 60px 60px 60px;
  `}
`;

export const CounterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CounterDisplay = styled.div<Props>`
  display: flex;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  color: #ff596d;
  font-size: 24px;
  font-weight: 600;
  ${(props) =>
    props.vertical
      ? `
      width: 60px;
      height: 85%;
  `
      : `
      width: 100%;
  height: 40px;
  `}
`;

export const CounterButton = styled.button<Props>`
  background: none;
  color: #ff596d;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 40px;
  line-height: 10px;
  width: ${(props) => (props.vertical ? "60px" : "40px")};
  height: 40px;
  border-radius: 10px;
  &:hover:not([disabled]) {
    background-color: #dadde4;
  }
  &:disabled {
    cursor: default;
    color: #b9bdc3;
  }
`;
