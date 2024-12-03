import { Groups } from "@screens/groups";
import { ThemeProvider } from "styled-components";


import { Loading } from "@components/loading";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { StatusBar } from "react-native";
import { theme } from "src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
       barStyle={"default"}
       backgroundColor={"transparent"}
       translucent //começa no topo do dispositivo
      />
     {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
