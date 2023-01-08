import styled from "styled-components";
import Logo from "../../elements/Logo";

const OpenWidth = "300px";
const CloseWidth = "88px";

interface Props {
  active?: boolean;
}

export const StyledLogo = styled(Logo)`
  height: 40px;
  width: auto;
  transition: 0.3s;
  cursor: pointer;
  fill: #fff;
  margin-left: 30px;
`;

export const Items = styled.div`
  margin-top: 30px;
`;

export const IconContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 30px;
  flex-direction: column;
  background-color: ${(props) => (props.active ? "#ff95a2" : "none")};
  border-radius: 12px;
  height: 72px;
`;

export const IconMenuContainer = styled(IconContainer)`
  margin-bottom: 30px;
`;

export const IconLabel = styled.span`
  font-size: 10px;
  color: #fcfbfc;
  margin-top: 5px;
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${CloseWidth};
  height: 100%;
  background: #ff596d;
  position: relative;
  transition: width 0.25s ease-in-out;
  overflow: hidden;
  font-size: 10px;
  padding: 0 8px;
`;

export const OpenSidebarContainer = styled(SidebarContainer)`
  width: ${OpenWidth};
  padding: 0 18px;
`;

export const OpenIconContainer = styled(IconContainer)<Props>`
  flex-direction: row;
  justify-content: flex-start;
  padding: 12px;
  background-color: ${(props) => (props.active ? "#ff95a2" : "none")};
  border-radius: 12px;
  margin-bottom: 15px;
`;

export const OpenIconMenuContainer = styled(IconContainer)`
  display: flex;
  flex-direction: row;
  padding: 0 12px;
`;

export const OpenIconLabel = styled(IconLabel)`
  font-size: 18px;
  margin-left: 30px;
  margin-top: 0;
`;
