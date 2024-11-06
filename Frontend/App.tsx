import { StyleSheet } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Starter } from './pages/starter/starter';
import { StarterLogin } from './pages/starter/starterlogin';
import { Home } from './pages/home/home';
import AbsolutMenu from './libs/AbsolutMenu';
import ProfilePage from './pages/profile/profile';
import { useEffect } from 'react';
import React from 'react';
const Stack = createNativeStackNavigator();
export const orange = "#FE7A36";

export default function App() {
  const routeNameRef = React.useRef<string | null>(null);
  const navigationRef = React.useRef<NavigationContainerRef<any> | null>(null);
  const [currentRoute, setCurrentRoute] = React.useState <any | null>("Starter");


  useEffect(() => {
    const state = navigationRef.current?.getRootState();
    const currentRouteName = state?.routes[state.index]?.name;
    routeNameRef.current = currentRouteName ?? null;
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          // Le hook est activé à chaque changement de page
          console.log('Page changed to', currentRouteName);
          setCurrentRoute(currentRouteName);
        }
        routeNameRef.current = currentRouteName ?? null;
      }}
    >
      {currentRoute != "Starter" && currentRoute != "Homeblogin"  ? <AbsolutMenu /> : null}
      <Stack.Navigator initialRouteName="Starter">
        <Stack.Screen name="Starter" options={{ headerShown: false }} component={Starter} />
        <Stack.Screen options={{ headerShown: false }} name="Homeblogin" component={StarterLogin} />
        <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="user" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Removed unused styles
