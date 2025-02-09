import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';
import { CustomText } from './utils/text/text';
import { CustomButton } from './utils/button/TodayButton';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { HelloPage } from './pages/home_disconected';
import { SignInPage } from './pages/signIn';
import { SignUpPage } from './pages/signup';
import { VerifyCodePage } from './pages/login_process/verifyCode';
import { PasswordGestionPage } from './pages/login_process/AddPassword';
import { Home } from "./pages/home";
import { NavBarPages } from './pages/navbarPages';
import FilterPage from './pages/FilterPage';
import { ProfilPage } from './pages/Profil';

enableScreens();

const loadFonts = async () => {
  await Font.loadAsync({
    'FigTree': require('./assets/fonts/Figtree-Regular.ttf'),
    'FigTree-Bold': require('./assets/fonts/Figtree-Bold.ttf'),
  });
};



const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <CustomText>This is the Schedule Screen</CustomText>
      <StatusBar style="auto" />
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch(console.error);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HelloPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="SignInVerifyCode" component={VerifyCodePage} />
        <Stack.Screen name="SignInVerifyPassword" component={PasswordGestionPage} />
        <Stack.Screen name="LogHome" component={NavBarPages} options={{ headerShown: false }} />
        <Stack.Screen name="FilterPage" component={FilterPage} options={{ headerShown: false }} />
        <Stack.Screen name="Profil" component={ProfilPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
