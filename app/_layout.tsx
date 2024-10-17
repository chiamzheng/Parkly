import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  NavigationContainer,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
//import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/useColorScheme";
import Login from "./login";
import Signin from "./signin";
import Register from "./register";
import Forgot from "./forgot";
import EmailSent from "./emailsent";
import Settings from "./settings";
import ChangeUsername from "./change_username";
import ChangePassword from "./change_password";
import SignOut from "./sign_out";
import Homepage from "./homepage";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forgot"
        component={Forgot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="emailsent"
        component={EmailSent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="change_username"
        component={ChangeUsername}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="change_password"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="sign_out"
        component={SignOut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homepage"
        component={Homepage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
