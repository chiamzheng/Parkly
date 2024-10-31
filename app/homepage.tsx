import LocationSearchInterface from '@/components/LocationSearchInterface';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import CarparkSummary from '../components/carparkSummary';
import React from "react";
import FAB from '../components/FAB'



export default function Homepage({ navigation }) {
  

  return (
    <View style={styles.container}>
      <LocationSearchInterface style={styles.search} />

      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 1.3521, // Center on Singapore
          longitude: 103.8198,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <UrlTile
          urlTemplate="https://www.onemap.gov.sg/maps/tiles/Default_HD/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
        />
      </MapView>

      <FAB/>

      <View style={styles.carpark}>
        <CarparkSummary />
      </View>

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
    width: '100%',
    height: '100%',
  },
  search: {
    position: 'absolute',
    top: 20,
    elevation: 1,
    zIndex:1,
  },
  carpark: {
    position: 'absolute',
    top: 500,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
