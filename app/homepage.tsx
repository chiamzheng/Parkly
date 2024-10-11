import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {UrlTile} from 'react-native-maps';

export default function Homepage({navigation}) {
  return (
    <View style={styles.container}>
      <MapView 
      style ={styles.map}
      initialRegion={{
        latitude: 1.3521, // Center on Singapore
        longitude: 103.8198,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >

      {/*Use OneMap*/}
      <UrlTile
          urlTemplate="https://www.onemap.gov.sg/maps/tiles/Default_HD/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
        />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    width:'100%',
    height:'100%'
  }
});