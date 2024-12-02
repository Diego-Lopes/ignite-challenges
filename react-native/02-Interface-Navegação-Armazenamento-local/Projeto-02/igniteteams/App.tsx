import { Groups } from "@screens/groups";
import { ThemeProvider } from "styled-components";
import defaultTheme from "./src/theme/index";

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Groups />
    </ThemeProvider>
  )
}
