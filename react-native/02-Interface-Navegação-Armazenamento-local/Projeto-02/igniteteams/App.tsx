import { Groups } from "@screens/groups";
import { ThemeProvider } from "styled-components";


import { Loading } from "@components/loading";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { theme } from "src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
     {!fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
