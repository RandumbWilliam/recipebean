import { ONYX_20, PRIMARY_COLOUR } from "@styles/base/colours";
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
  border: 2px ${(props) => (props.active ? `solid` : `dashed`)} ${ONYX_20};
  border-radius: 10px;
  height: 220px;
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
`;

export const DropzoneInput = styled.input`
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
`;

export const ClickText = styled.span`
  color: ${PRIMARY_COLOUR};
`;

export const AdditionalText = styled.p`
  color: ${ONYX_20};
`;
