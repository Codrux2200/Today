import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Starter } from './pages/starter/starter';
import { StarterLogin } from './pages/starter/starterlogin';
import { Home } from './pages/home/home';
const Stack = createNativeStackNavigator();
export const orange = "#FE7A36";

export default function App() {
  return(
  
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Starter">
      <Stack.Screen name="Starter" options={{ headerShown: false }} component={Starter} />
      <Stack.Screen options={{ headerShown: false }}  name="Homeblogin" component={StarterLogin} />
      <Stack.Screen options={{ headerShown: false }}  name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>


);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
