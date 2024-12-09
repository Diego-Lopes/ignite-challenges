import { HomeScreen } from '@screens/home';
import { StatusBar } from 'react-native';
import { theme } from 'src/theme';
import { ThemeProvider } from 'styled-components';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle={"default"}
        backgroundColor={"transparent"}
        translucent
      />
      <HomeScreen />
    </ThemeProvider>
  );
}


