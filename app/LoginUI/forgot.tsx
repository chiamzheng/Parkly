import {
  Image,
  StyleSheet,
  Platform,
  Button,
  Alert,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";
import { Dimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import validator from 'validator';
import React from "react";
import axios from 'axios';
import Constants from 'expo-constants';
const URL = Constants.expoConfig?.extra?.SERVER_IP;

export default function Forgot({ navigation }) {
  const [email, onChangeEmail] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(true);

  const handlePasswordReset = async () => {
    if (validator.isEmail(email)) {
      setValidEmail(true);
      try {
        await axios.get(`${URL}/api/user_account/send_password/${email}`);
        navigation.navigate('LoginUI/emailsent', { email: email });
        console.log('An email with your new password has been sent.');
      } catch (error) {
        Alert.alert('Error', 'Failed to send password reset email.');
      }
    } else {
      setValidEmail(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.background}>
        <ThemedView style={styles.titleContainer}>
          <Text style={styles.titletext}>Parkly</Text>
          {/*<HelloWave />*/}
        </ThemedView>

        <Text style={styles.title}>Forgot your Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email to reset your password:
        </Text>
        <ThemedView style={styles.stepContainer}>
          <TextInput
            style={validEmail?styles.input:styles.invalidinput}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#B9B7B7"
            inputMode='email'
          />
          <View>
            <Text style={validEmail?styles.hide:styles.invalidmsg}>Invalid Email</Text>
          </View>
        </ThemedView>
        <View style={styles.buttoncontainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.goBack()} // go back to start page
          >
            <Image
              style={styles.img}
              source={require("../../assets/images/back.png")}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handlePasswordReset}
          >
            <Text style={styles.buttonText}>Let's Go!</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 5,
    justifyContent: "center",
    margin: 20,

    backgroundColor: "#EEE6D3",
    borderRadius: 25,
    padding: 20,
    marginTop: 140,
    marginBottom: 50,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: "#DDD5D5",
    height: 120,
    justifyContent: "space-between",
  },
  reactLogo: {
    height: 50,
    width: 50,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titletext: {
    fontSize: Dimensions.get("window").width / 6,
    fontWeight: "800",
    //fontFamily: "Erica",
  },
  button: {
    borderRadius: 40,
    flexDirection: "row",
    backgroundColor: "#65558F",
    justifyContent: "center",
    margin: 6,
    height: 80,
    width: 80,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 19,
    fontWeight: "500",
    color: "white",
    flexDirection: "row",
  },
  guest: {
    textDecorationLine: "underline",
    color: "#893F60",
    textDecorationColor: "#893F60",
    fontWeight: "700",
    fontSize: 15,
  },
  background: {
    backgroundColor: "#DDD5D5",
    flex: 1,
  },
  imgcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 30,
    marginStart: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  cargif: {
    width: 140,
    height: 140,
  },
  locationgif: {
    width: 100,
    height: 100,
  },
  input: {
    //fontFamily: "Ubuntu",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.2,
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: "black",
    borderWidth: 2,
    fontWeight: "800",
    color: "black",
  },
  img: {
    height: 30,
    width: 30,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    marginLeft: Dimensions.get("window").width / 12 ,
    margin: 10,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    margin: 20,
  },
  checkbox: {
    backgroundColor: "#DDD5D5",
    padding: 0,
    margin: 0,
  },
  bottomline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  subtitle: {
    fontWeight: "500",
    fontSize: 14,
    alignSelf: "flex-start",
    marginTop: 40,
    marginLeft: Dimensions.get("window").width / 12 ,
  },
  invalidinput: {
    //fontFamily: "Ubuntu",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.2,
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: "red",
    borderWidth: 2,
    fontWeight: "800",
    color: "black",
    marginBottom:20,
  },
  hide:{
    display:'none',
  },
  invalidmsg:{
    color:'red',
    fontWeight:'800',
    alignSelf:"center",
  }
});
