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
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import * as Animatable from "react-native-animatable";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
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
            style={styles.input}
            onChangeText={onChangeUser}
            value={username}
            placeholder="you@example.com"
            placeholderTextColor="#B9B7B7"
            inputMode="email"
          />
          <Text style={styles.subtitle}>Enter New Password</Text>
          <View style={styles.password}>
            <TextInput
              style={styles.input}
              onChangeText={onChangePass}
              value={password}
              placeholder="Enter 6 characters or more"
              placeholderTextColor="#B9B7B7"
              inputMode="text"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.icon}>
              <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        
                        onPress={toggleShowPassword}
              />
            </TouchableOpacity>
            
          </View>
          
          <Text style={styles.subtitle}>Confirm Password</Text>
          <View style={styles.password}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeCfm}
              value={cfm}
              placeholder="Enter 6 characters or more"
              placeholderTextColor="#B9B7B7"
              inputMode="text"
              secureTextEntry={!showPassword1}
            />
            <TouchableOpacity style={styles.icon}>
              <MaterialCommunityIcons
                        name={showPassword1 ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        
                        onPress={toggleShowPassword1}
              />
            </TouchableOpacity>
          </View>
          
        </ThemedView>
        <View style={styles.buttoncontainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.goBack()} // go back to start page
          >
            <Image
              style={styles.img}
              source={require("../assets/images/back.png")}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => Alert.alert("Button with adjusted color pressed")} // Navigate to Signin
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
    fontFamily: "Erica",
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
    fontFamily: "Ubuntu",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.2,
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: "black",
    borderWidth: 2,
    fontWeight: "800",
    color: "black",
    marginBottom:8,
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
  password:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end",
    paddingHorizontal:14,
    
  },
  icon:{
    position:"absolute",
    paddingBottom:8,
    paddingRight:Dimensions.get("window").width / 14,
  }
});
