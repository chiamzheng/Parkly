import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

export default function Settings({route}) {
  const navigation = useNavigation();
  const { email } = route.params || { email: "Guest@gmail.com" };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.background}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/settings.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.titletext}>Settings</Text>
        </View>

        <ThemedView style={styles.settingsContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('SettingsUI/change_password',{
              email,
            })}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.signOutButton]}
            onPress={() => navigation.navigate('WelcomeUI/welcomepage')}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </ThemedView>
        <View style={styles.returnButtonContainer}>
          <Pressable onPress={() => navigation.navigate("HomepageUI/homepage", {
              email: email,
            })}>
            <Image
              source={require('../../assets/images/return.png')}
              style={styles.returnButton}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#DDD5D5',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  titletext: {
    fontSize: Dimensions.get('window').width / 16,
    fontWeight: '800',
    marginLeft: 10,
  },
  settingsIcon: {   
    width: Dimensions.get('window').width / 8,
    height: Dimensions.get('window').width / 8,
    marginLeft:30
  },
  settingsContainer: {
    gap: 16,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#DDD5D5',
  },
  button: {
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: '#65558F',
    justifyContent: 'center',
    margin: 6,
    height: 50,
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#893F60',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  returnButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 33,
  },
  returnButton: {
    width: 50,
    height: 50,
  },
});
