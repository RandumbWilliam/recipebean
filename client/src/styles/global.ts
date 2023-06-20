import {
  FONT_SIZE_16,
  FONT_SIZE_18,
  FONT_SIZE_24,
  FONT_SIZE_30,
  FONT_SIZE_36,
  FONT_SIZE_48,
  FONT_SIZE_60,
  FONT_SIZE_72,
} from "@styles/base/typography";
import { createGlobalStyle } from "styled-components";
import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_TABLET,
} from "./base/breakpoints";
import { SECONDARY_COLOUR } from "./base/colours";

export const GlobalStyles = createGlobalStyle`
    *,
    *:after,
    *:before {
        box-sizing: inherit;
        padding: 0;
        margin: 0;
    }

    html {
        font-size: 62.5%;
    }

    body {
        box-sizing: border-box;
        font-family: 'Outfit', sans-serif;
        font-size: ${FONT_SIZE_16};
        line-height: 28px;
        color: ${SECONDARY_COLOUR};

        @media (min-width: ${BREAKPOINT_TABLET}) {
            font-size: ${FONT_SIZE_18};
            line-height: 32px;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
        line-height: normal;
    }

    button, input[type="submit"], input[type="reset"] {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        line-height: 100%;
    }

    h1 {
        font-size: ${FONT_SIZE_36};
        font-weight: 600;
        line-height: 100%;

        @media (min-width: ${BREAKPOINT_TABLET}) {
            font-size: ${FONT_SIZE_48};
        }

        @media (min-width: ${BREAKPOINT_LAPTOP}) {
            font-size: ${FONT_SIZE_60};
        }

        @media (min-width: ${BREAKPOINT_DESKTOP}) {
            font-size: ${FONT_SIZE_72};
        }
    }

    h2 {
        font-size: ${FONT_SIZE_36};
        font-weight: 600;
        line-height: 100%;

        @media (min-width: ${BREAKPOINT_TABLET}) {
            font-size: ${FONT_SIZE_48};
        }
    }

    h3 {
        font-size: ${FONT_SIZE_30};
        font-weight: 600;
        line-height: 130%;
    }

    h4 {
        font-size: ${FONT_SIZE_30};
        font-weight: 500;
        line-height: 100%;
    }

    h5 {
        font-size: ${FONT_SIZE_24};
        font-weight: 500;
        line-height: 100%;
    }

    h6 {
        font-size: ${FONT_SIZE_18};
        font-weight: 500;
        line-height: 100%;
    }
`;
