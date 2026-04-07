import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: { main: "#1565c0" },
    secondary: { main: "#f57c00" },
    background: { default: "#f5f7fa" },
  },
  shape: { borderRadius: 8 },
});

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
});
