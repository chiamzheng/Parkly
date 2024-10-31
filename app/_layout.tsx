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
import Login from "./LoginUI/login";
import Signin from "./LoginUI/signin";
import Register from "./register";
import Forgot from "./LoginUI/forgot";
import EmailSent from "./LoginUI/emailsent";
import Settings from "./SettingsUI/settings";
import ChangeUsername from "./SettingsUI/change_username";
import ChangePassword from "./SettingsUI/change_password";
import SignOut from "./SettingsUI/sign_out";
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
        name="LoginUI/login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginUI/signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginUI/forgot"
        component={Forgot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginUI/emailsent"
        component={EmailSent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsUI/settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsUI/change_username"
        component={ChangeUsername}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsUI/change_password"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsUI/sign_out"
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
