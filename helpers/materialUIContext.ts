import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";
import {
  createGenerateClassName,
  createMuiTheme,
} from "@material-ui/core/styles";
import { SheetsRegistry } from "jss";
import { MaterialUIContext } from "../interfaces";

// This pattern is brought from
// https://github.com/mui-org/material-ui/tree/master/examples/nextjs

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blue,
    secondary: orange,
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export function getMaterialUIContext(): MaterialUIContext {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!globalThis.__INIT_MATERIAL_UI__) {
    globalThis.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return globalThis.__INIT_MATERIAL_UI__;
}
