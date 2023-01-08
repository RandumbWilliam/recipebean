/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@mui/material",
  "@mui/system",
]); // pass the modules you would like to see transpiled

module.exports = withTM({
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };
    return config;
  },
});
