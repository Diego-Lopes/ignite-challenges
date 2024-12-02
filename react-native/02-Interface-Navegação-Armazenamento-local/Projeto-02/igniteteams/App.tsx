import { Groups } from "@screens/groups";
import { ThemeProvider } from "styled-components";
import { theme } from './src/theme';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { ActivityIndicator } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
     {fontsLoaded ? <Groups /> : <ActivityIndicator />}
    </ThemeProvider>
  )
}
