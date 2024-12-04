import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "@screens/groups";
import { NewGroup } from "@screens/newGroup";
import { Players } from "@screens/players";

// estratégia de navegação, createNativeStackNavigator
const { Navigator, Screen } = createNativeStackNavigator() 

export function AppRoutes() {
  return (
    <Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="groups"
    >
      <Screen
        name="groups" // crio o nome da rota
        component={Groups} // chamo que vai ser renderizado na rota.
      />
      <Screen
        name="new" // crio o nome da rota
        component={NewGroup} // chamo que vai ser renderizado na rota.
      />
      <Screen
        name="players" // crio o nome da rota
        component={Players} // chamo que vai ser renderizado na rota.
      />
    </Navigator>
  )
}
