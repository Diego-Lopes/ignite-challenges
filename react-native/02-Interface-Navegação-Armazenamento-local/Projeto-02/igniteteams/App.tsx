import { Groups } from "@screens/groups";
import { ThemeProvider } from "styled-components";
import { theme } from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  )
}
