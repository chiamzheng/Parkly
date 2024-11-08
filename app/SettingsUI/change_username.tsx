import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';

export default function ChangeUsername({ navigation }: { navigation: any }) {
  const [newUsername, setNewUsername] = useState('');

  const handleConfirm = () => {
    // Here you would typically handle the username change logic
    Alert.alert('Username changed', `New username: ${newUsername}`);
    // After changing the username, navigate back to homepage
    navigation.navigate('HomepageUI/homepage');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.background}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/settings.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.titletext}>Change Username</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter new Username</Text>
          <TextInput
            style={styles.input}
            value={newUsername}
            onChangeText={setNewUsername}
            placeholder="Enter 6 characters or more"
          />
        </View>


        <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate('SettingsUI/settingspage')}>
            <Image
              source={require('../../assets/images/return.png')}
              style={styles.returnButton}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButton}>Confirm</Text>
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
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  titletext: {
    fontSize: Dimensions.get('window').width / 16,
    fontWeight: '800',
    marginLeft: 10,
  },
  settingsIcon: {   
    width: Dimensions.get('window').width / 8,
    height: Dimensions.get('window').width / 8,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 40,
    justifyContent: 'space-between', // Ensure buttons are spaced evenly
    paddingHorizontal: 30,
  },
  button: {
    borderRadius: 25,
    backgroundColor: '#65558F',
    justifyContent: 'center',
    height: 50,
    width: (Dimensions.get('window').width / 1.2) / 2 - 10, // Adjust width to fit two buttons side by side with some margin
    alignItems: 'center',
    marginHorizontal: 5, // Add horizontal margin between buttons
  },
  confirmButton: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  returnButton: {
    width: 50,
    height: 50,
  },
});
