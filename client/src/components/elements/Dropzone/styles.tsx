import styled from "styled-components";

interface Props {
  active: boolean;
}

export const DropzoneWrapper = styled.div<Props>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px ${(props) => (props.active ? `solid` : `dashed`)} #b9bdc3;
  border-radius: 10px;
  height: 280px;
  width: 100%;
  cursor: pointer;
  ${(props) => props.active && `background-color: rgba(255, 89, 109, 0.1);`}
  &:hover {
    background-color: rgba(255, 89, 109, 0.1);
  }
`;

export const DropzoneMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ff596d;
`;

export const DropzoneInput = styled.input`
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
`;
