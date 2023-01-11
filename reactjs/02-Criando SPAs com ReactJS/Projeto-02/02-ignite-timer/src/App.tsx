import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { AppContainer } from "./styles/App.style";
import { darkTheme } from "./styles/themes/dark";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/themes/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <Button variant="primary" />
        <Button variant="secondary" />
        <Button variant="danger" />
        <Button variant="success" />
        <Button />
        <GlobalStyle />
    </ThemeProvider>
  );
}
