import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { withUrqlClient } from "next-urql";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import { createGlobalStyle } from "styled-components";
import theme from "../styles/theme";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withAuth } from "../utils/withAuth";

const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
}

a {
    color: inherit;
    text-decoration: none;
}

* {
    box-sizing: border-box;
}
`;

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <GlobalStyles />
      <Head>
        <title>RecipeBean</title>
        <link href="/favicon.ico" rel="icon" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withUrqlClient(createUrqlClient)(withAuth(App));
