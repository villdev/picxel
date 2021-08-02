import React from "react";
import { render } from "react-dom";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({ config });

const rootEl = document.getElementById("root");

render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  rootEl
);
