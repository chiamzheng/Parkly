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
import { Dimensions, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import validator from "validator";
import React from "react";
import axios from "axios";
// import { SERVER_IP, PORT } from "../../backend/APIServer/server";
// import { register } from "@/components/Service/dbUserAccount"; for the function
import Constants from 'expo-constants';

export default function Register({ navigation }) {
  const [username, onChangeUser] = React.useState("");
  const [password, onChangePass] = React.useState("");
  const [cfm, onChangeCfm] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword1, setShowPassword1] = React.useState(false);
  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [validcfm, setValidcfm] = React.useState(true);
  const [registered, setRegistered] = React.useState(1);

  const URL = Constants.expoConfig?.extra?.SERVER_IP;

  // const [registerValue, setRegisterValue] = React.useState(null);

  // React.useEffect(() => {
  //   const fetch_carparks = async () => {
  // axios
  //   .get(
  //     "http://192.168.0.218:8083/api/carpark/fetch_carparks_within_radius/1.321572,103.884496/2000"
  //   )
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data:", error);
  //   });
  // };

  // fetch_carparks();
  // }, []); // Empty array ensures this runs once when the component mounts

  const registerUser = async () => {};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.background}>
        <ThemedView style={styles.titleContainer}>
          <Text style={styles.titletext}>Parkly</Text>
          {/*<HelloWave />*/}
        </ThemedView>

        <Text style={styles.title}>Register</Text>
        <ThemedView style={styles.stepContainer}>
          <Text style={styles.subtitle}>Enter Email</Text>
          <TextInput
            style={validEmail ? styles.input : styles.invalidinput}
            onChangeText={onChangeUser}
            value={username}
            placeholder="you@example.com"
            placeholderTextColor="#B9B7B7"
            inputMode="email"
          />
          <Text style={styles.subtitle}>Enter New Password</Text>
          <View style={styles.password}>
            <TextInput
              style={validPassword ? styles.input : styles.invalidinput}
              onChangeText={onChangePass}
              value={password}
              placeholder="Enter 6 characters or more"
              placeholderTextColor="#B9B7B7"
              inputMode="text"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.icon}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                onPress={toggleShowPassword}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Confirm Password</Text>
          <View style={styles.password}>
            <TextInput
              style={validcfm ? styles.input : styles.invalidinput}
              onChangeText={onChangeCfm}
              value={cfm}
              placeholder="Enter 6 characters or more"
              placeholderTextColor="#B9B7B7"
              inputMode="text"
              secureTextEntry={!showPassword1}
            />
            <TouchableOpacity style={styles.icon}>
              <MaterialCommunityIcons
                name={showPassword1 ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                onPress={toggleShowPassword1}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={validcfm ? styles.hide : styles.invalidmsg}>
              The passwords do not match.
            </Text>
            <Text style={!(registered == -2) ? styles.hide : styles.invalidmsg}>
              The password is too weak.
            </Text>
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
            onPress={async () => {
              if (validator.isEmail(username)) {
                setValidEmail(true);
              } else {
                setValidEmail(false);
              }
              if (validator.isEmpty(password)) {
                setValidPassword(false);
              } else {
                setValidPassword(true);
              }
              if (password == cfm) {
                setValidcfm(true);
              } else {
                setValidcfm(false);
              }
              if (
                validator.isEmail(username) &&
                !validator.isEmpty(password) &&
                password == cfm
              ) {
                // reference of how to call an API
                axios
                  .get(
                    `${URL}/api/user_account/register/${username}/${password}`
                  )
                  .then((response) => {
                    const result = response.data;
                    console.log(result);

                    // Handle different cases based on the response
                    if (result === -1) {
                      Alert.alert("Error", "Email already exists.");
                    } else if (result === 0) {
                      Alert.alert("Error", "Password is too weak.");
                    } else if (result === 1) {
                      Alert.alert("Success", "Registration successful.");
                      navigation.goBack(); // Navigate back to previous screen
                    }
                  })
                  .catch((error) => {
                    console.error("Error fetching data:", error);
                  });
              }
            }}
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
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: "#DDD5D5",
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
    fontSize: 20,
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
    marginBottom: 8,
  },
  img: {
    height: 30,
    width: 30,
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    marginLeft: Dimensions.get("window").width / 12,
    margin: 10,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontWeight: "500",
    fontSize: 14,
    marginLeft: Dimensions.get("window").width / 12,
    alignSelf: "flex-start",
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 14,
  },
  icon: {
    position: "absolute",
    paddingBottom: 8,
    paddingRight: Dimensions.get("window").width / 14,
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
    marginBottom: 20,
  },
  hide: {
    display: "none",
  },
  invalidmsg: {
    color: "red",
    fontWeight: "800",
    alignSelf: "center",
  },
});

