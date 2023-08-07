import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@styles/global";
import { theme } from "@styles/theme";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withAuth } from "@utils/withAuth";
import { withUrqlClient } from "next-urql";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";

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
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withUrqlClient(createUrqlClient)(withAuth(App));
