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
import { CheckBox } from "@rneui/themed";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import validator from "validator";
import React from "react";
import axios from "axios";
function extractEmailFront(email) {
  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }
  return email.split("@")[0];
}
export default function Signin({ navigation }: { navigation: any }) {
  const [username, onChangeUser] = React.useState("");
  const [password, onChangePass] = React.useState("");
  const [check1, setCheck1] = React.useState(false);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handlePassword = () => {
    if (validator.isEmpty(password)) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };
  const handleEmail = () => {
    if (validator.isEmail(username)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };
  const handleSignin = () => {
    if (!validator.isEmpty(password) && validator.isEmail(username)) {
      const value = axios
        .get(
          `http://192.168.1.143:8083/api/user_account/login/${username}/${password}`
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      console.log(value);
      navigation.navigate("HomepageUI/homepage", {
        username: extractEmailFront(username),
      });
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.background}>
        <ThemedView style={styles.titleContainer}>
          <Text style={styles.titletext}>Parkly</Text>
          {/*<HelloWave />*/}
        </ThemedView>

        <Text style={styles.title}>Login</Text>
        <ThemedView style={styles.stepContainer}>
          <TextInput
            style={validEmail ? styles.input : styles.invalidinput}
            onChangeText={onChangeUser}
            value={username}
            placeholder="Email"
            placeholderTextColor="#B9B7B7"
            inputMode="email"
          />
          <View style={styles.password}>
            <TextInput
              style={validPassword ? styles.input : styles.invalidinput}
              onChangeText={onChangePass}
              value={password}
              placeholder="Password"
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

          <View style={styles.bottomline}>
            <CheckBox
              containerStyle={styles.checkbox}
              title="Remember me"
              checked={check1}
              onPress={() => setCheck1(!check1)}
            />
            <Pressable onPress={() => navigation.navigate("LoginUI/forgot")}>
              <Text style={styles.guest}>Forgot Password</Text>
            </Pressable>
          </View>
        </ThemedView>

        <View>
          <Text style={validPassword ? styles.hide : styles.invalidmsg}>
            The username or password you entered is incorrect.
          </Text>
        </View>
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
            onPress={() => {
              handleEmail();
              handlePassword();
              handleSignin();
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
    gap: 8,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: "#DDD5D5",
    height: Dimensions.get("window").height / 4,
    //justifyContent: "space-between",
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
    marginBottom: 20,
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
    justifyContent: "space-between",
    paddingHorizontal: Dimensions.get("window").width / 12,
    paddingBottom: Dimensions.get("window").height / 12,
    width: Dimensions.get("window").width,
  },
  password: {
    flexDirection: "row",
    //alignItems:"center",
    justifyContent: "flex-end",
    paddingHorizontal: 14,
  },
  icon: {
    position: "absolute",
    marginTop: 14,
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
