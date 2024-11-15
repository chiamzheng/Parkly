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
import Constants from 'expo-constants';
const URL = Constants.expoConfig?.extra?.SERVER_IP;
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

export default function ChangePassword({route}) {
  const navigation = useNavigation();
  const { email } = route.params || { email: "Guest@gmail.com" };
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.background}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/images/settings.png')}
            style={styles.settingsIcon}
          />
          <Text style={styles.titletext}>Change Password</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter new Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter 6 characters or more"
            secureTextEntry
          />
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Enter 6 characters or more"
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate('SettingsUI/settingspage', {email:email})}>
            <Image
              source={require('../../assets/images/return.png')}
              style={styles.returnButton}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={async() => {if (newPassword !== confirmPassword) {
              Alert.alert('Error', 'Passwords do not match');
              return;
            }
            axios
              .get(
                `${URL}/api/user_account/change_password/${email}/${newPassword}`
              )
              .then((response) => {
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
               
            Alert.alert('Password changed', 'Your password has been updated');
            
            // After changing the password, navigate back or to homepage
            navigation.navigate("HomepageUI/homepage", {
                      email: email,
                    });
                  }
            }>
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
    marginTop: 20,
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

