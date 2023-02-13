import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { StorageContextProvider } from "./context/StorageContext";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/theme/default";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StorageContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <GlobalStyle />
      </StorageContextProvider>
    </ThemeProvider>
  );
}

export default App;
