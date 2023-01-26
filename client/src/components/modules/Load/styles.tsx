import styled from "styled-components";
import Logo from "../../elements/Logo";

export const Background = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledLogo = styled(Logo)`
  height: 45px;
  width: auto;
  fill: #ff596d;
`;
