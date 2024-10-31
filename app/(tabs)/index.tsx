import { Image, StyleSheet, Platform,Button,Alert, Pressable,Text,View } from 'react-native';
import { Dimensions } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import * as Animatable from 'react-native-animatable';
import Signin from '../LoginUI/signin';

export default function HomeScreen({ navigation}) {
  return (
    <View style={styles.background}>
      <ThemedView style={styles.titleContainer}>
        <Text style={styles.titletext}>Parkly</Text>
        {/*<HelloWave />*/}
      </ThemedView>
      <View style={styles.imgcontainer}>
        <Image style={styles.cargif} source={require('../../assets/images/car.gif')} />
        <Image style={styles.locationgif} source={require('../../assets/images/nav.gif')} />
      </View>
      
      <ThemedView style={styles.stepContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate(Signin)}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert('Button with adjusted color pressed')}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>
        <Pressable
          onPress={() => Alert.alert('Button with adjusted color pressed')}
        >
          <Text style={styles.guest}>Continue as Guest</Text>
        </Pressable>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:5,
    justifyContent:'center',
    margin:20,
    
    backgroundColor:'#EEE6D3',
    borderRadius:25,
    padding:20,
    marginTop:140,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems:'center',
    backgroundColor:'#DDD5D5',
  },
  reactLogo: {
    height: 50,
    width: 50,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titletext:{
    fontSize:Dimensions.get('window').width/6,
    fontWeight:'800',
    fontFamily:'Erica'
  },
  button:{
    borderRadius:25,
    flexDirection: 'row',
    backgroundColor:"#65558F",
    justifyContent:'center',
    margin:6,
    height:50,
    width:Dimensions.get('window').width/1.2,
    alignItems:'center',
  },
  buttonText:{
    fontSize:25,
    fontWeight:'500',
    color:'white',
  },
  guest:{
    textDecorationLine:'underline',
    color:'#893F60',
    textDecorationColor:'#893F60',
    fontWeight:'700',
    fontSize:20,
  },
  background:{
    backgroundColor:'#DDD5D5',
  },
  imgcontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginEnd:30,
    marginStart:30,
    marginTop:80,
    marginBottom:80,
  },
  cargif:{
    width:140,
    height:140,
  },
  locationgif:{
    width:100,
    height:100,
  }
});
