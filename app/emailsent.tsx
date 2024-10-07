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
  import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";


  const censorEmail = (email) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 3) {
      return email; // If the local part is very short, don't over-censor
    }
    const censoredLocal = `${localPart.slice(0, 3)}***`;
    return `${censoredLocal}@${domain}`;
  };


  export default function EmailSent({ route,navigation }) {
    const { email } = route.params;
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.background}>
            <View style={styles.greenbox}>
                <Text>An email has been sent to</Text>
                <Text style={styles.emailtext}>{censorEmail(email)}</Text>
            </View>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("signin")} // Navigate to Signin
             >
                <Text style={styles.buttonText}>Return To Login Page</Text>
          </Pressable>
        </SafeAreaView>
    </SafeAreaProvider>
    )
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
      width: Dimensions.get("window").width / 1.8,
      alignItems: "center",
      alignSelf:"center",
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
      justifyContent:"space-evenly",
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
    greenbox:{
        backgroundColor:"#D7ECD9",
        color:"#2D5356",
        width:Dimensions.get("window").width / 1.4 ,
        height:Dimensions.get("window").height / 3 ,
        borderRadius:25,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        
    },
    emailtext:{
        color:"#893F60",
        fontWeight:"800",
        alignSelf:"center",
        fontSize:26,
    }

  });
  