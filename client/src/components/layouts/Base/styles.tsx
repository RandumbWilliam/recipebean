import { BREAKPOINT_TABLET } from "@styles/base/breakpoints";
import { PRIMARY_COLOUR } from "@styles/base/colours";
import styled from "styled-components";

export const Section = styled.section`
  padding-top: 120px;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    padding-top: 200px;
  }
`;

export const AlternateBackground = styled.div`
  width: 100%;
  height: 320px;
  background: ${PRIMARY_COLOUR};
  position: absolute;
  top: 0;
  z-index: -9999;

  @media (min-width: ${BREAKPOINT_TABLET}) {
    height: 480px;
  }
`;
