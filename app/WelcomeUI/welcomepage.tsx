import {
  Image,
  StyleSheet,
  Platform,
  Button,
  Alert,
  Pressable,
  Text,
  View,
} from "react-native";
import { Dimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
export default function Login({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.background}>
        <ThemedView style={styles.titleContainer}>
          <Text style={styles.titletext}>Parkly</Text>
        </ThemedView>

        <View style={styles.imgcontainer}>
          <Image
            style={styles.cargif}
            source={require("../../assets/images/car.gif")}
          />
          <Image
            style={styles.locationgif}
            source={require("../../assets/images/nav.gif")}
          />
        </View>

        <ThemedView style={styles.stepContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("LoginUI/signin")} // Navigate to Signin
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("SignupUI/register")}
          >
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("HomepageUI/homepage")} // shiat how do you navigate,, am i supposed to edit a route TT
          >
            <Text style={styles.guest}>Continue as Guest</Text>
          </Pressable>
        </ThemedView>
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
  },
  stepContainer: {
    gap: 8,
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
    borderRadius: 25,
    flexDirection: "row",
    backgroundColor: "#65558F",
    justifyContent: "center",
    margin: 6,
    height: 50,
    width: Dimensions.get("window").width / 1.2,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
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
});
