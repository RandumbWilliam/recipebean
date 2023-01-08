import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";
import theme from "../styles/theme";
import Auth from "../utils/auth";

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
        <title>Next App</title>
        <link href="/favicon.ico" rel="icon" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth
          pageProps={pageProps}
          excludedRoutes={["/login", "/", "register"]}
        >
          <Component {...pageProps} />
        </Auth>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
