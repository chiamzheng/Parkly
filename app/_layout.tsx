import { DarkTheme, DefaultTheme, ThemeProvider,NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
//import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useColorScheme } from '@/hooks/useColorScheme';
import Login from './login';
import Signin from './signin';
import Register from './register';
import Forgot from './forgot';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
          options={{headerShown:false,
          }}
        />
        <Stack.Screen
          name="signin"
          component={Signin}
          options={{headerShown:false,
          }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{headerShown:false,
          }}
        />
        <Stack.Screen
          name="forgot"
          component={Forgot}
          options={{headerShown:false,
          }}
        />
      </Stack.Navigator>
       
    
    
  );
}
