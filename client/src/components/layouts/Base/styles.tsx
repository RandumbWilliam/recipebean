import { PRIMARY_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

export const Section = styled.section`
  padding-top: 200px;
`;

export const AlternateBackground = styled.div`
  width: 100%;
  height: 480px;
  background: ${PRIMARY_COLOUR};
  position: absolute;
  top: 0;
  z-index: -9999;
`;
