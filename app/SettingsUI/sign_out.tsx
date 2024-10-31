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

export default function SignOut({ navigation }: { navigation: any }) {
  const handleSignOut = () => {
    // Implement sign out logic here
    Alert.alert('Signed Out', 'You have been signed out successfully');
    // Navigate to login screen or appropriate screen after sign out
    // navigation.navigate('Login');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.background}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/settings.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.titletext}>Sign Out</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.questionText}>Do you want to sign out?</Text>
          
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.signOutButton]}
              onPress={handleSignOut}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
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
    paddingHorizontal: 20,
  },
  titletext: {
    fontSize: Dimensions.get('window').width / 16,
    fontWeight: '800',
    marginLeft: 10,
  },
  settingsIcon: {   
    width: Dimensions.get('window').width / 16,
    height: Dimensions.get('window').width / 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: 'rgba(101, 85, 143, 0.7)', // Lower opacity
  },
  cancelButton: {
    backgroundColor: '#65558F',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
});

