import { Loading } from '@components/loading';
import { NunitoSans_400Regular, NunitoSans_700Bold, useFonts } from '@expo-google-fonts/nunito-sans';
import { StatisticsScreen } from '@screens/statistics';
import { StatusBar } from 'react-native';
import { theme } from 'src/theme';
import { ThemeProvider } from 'styled-components';

export default function App() {

  const [fonstLoaded] = useFonts({
    NunitoSans_400Regular, NunitoSans_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent
      />
      {
        fonstLoaded ? <StatisticsScreen /> : <Loading />
      }
      
    </ThemeProvider>
  );
}


