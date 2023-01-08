import styled from "styled-components";

interface Props {
  primary: boolean;
  pill: boolean;
  disabled: boolean;
}

export const StyledButton = styled.button<Props>`
  background-color: ${(props) => (props.primary ? "#ff596d" : "transparent")};
  border-radius: ${(props) => (props.pill ? "50vh" : "8px")};
  border: ${(props) => (props.primary ? "none" : "2px solid #ff596d")};
  box-sizing: border-box;
  color: ${(props) => (props.primary ? "#ffffff" : "#ff596d")};
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: ${(props) => (props.primary ? "#E55062" : "#ff596d")};
    ${(props) =>
      !props.primary &&
      `
        color: #ffffff;
    `}
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: #B9BDC3;
    cursor: default;

    &:hover {
      background-color: #B9BDC3;
    }
  `}
`;
