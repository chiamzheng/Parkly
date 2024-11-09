import LocationSearchInterface from '@/components/LocationSearchInterface';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useMemo } from "react";
import CarparkSummary from '../../components/carparkSummary';
import FAB from '../../components/FAB';
import PolylineComponent from '@/components/Polyline';
import carparkData from '../../CarparkInformation.json'; 
import computeLatLon from '../../scripts/computeLatLon';

export default function Homepage({ route }) {
  const { username } = route.params || { username: "Jackson Lim" };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [capacity, setCapacity] = useState(60);// placeholder for actual capacity
  const carparkLocations = [
    { id: 1, title: 'JM23',latitude: 1.3521, longitude: 103.8100, rate:1.22,capacity:80,type:'ELECTRONIC PARKING' },
    { id: 2, title: 'Y24',latitude: 1.3531, longitude: 103.8200, rate:1.23,capacity:50, type:'COUPON PARKING'},
    { id: 3, title: 'SK71',latitude: 1.3541, longitude: 103.8300, rate:1.24,capacity:20,type:'ELECTRONIC PARKING' },
  ];
  //use below if want to use marker icons seen in figma 
  /*
  const getMarkerImage = (capacity) => {
    return capacity > 79
      ? require("../../assets/images/redcapacity.png")
      : capacity > 49
      ? require("../../assets/images/orangecapacity.png")
      : require("../../assets/images/greencapacity.png");
  };
  */
  const getPinColor = (capacity) => {
    if (capacity > 79) return 'red';
    if (capacity > 49) return 'orange';
    return 'green';
  };
  const handleMarkerPress = (carpark) => {
    setSelectedCarpark(carpark); // Pass carpark data to CarparkSummary
    setModalVisible(true); // Open modal
  };

  const handleBookmarkPress = (markerCode) => {
    const idx = carparkData.findIndex((carparkData) => carparkData.car_park_no === markerCode);
    handleMarkerPress(carparkData[idx]);
  }

  return (
    <View style={styles.container}>
      <LocationSearchInterface style={styles.search} onClickBookmark={handleBookmarkPress} username={username} />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {carparkData.map((location) => {
            //const imageSource = useMemo(() => getMarkerImage(location.capacity), [location.capacity]);
            const { lat, lon } = computeLatLon(location.y_coord, location.x_coord)
          return(
          <Marker
            key={location.FIELD1}
            coordinate={{ latitude:lat , longitude:lon }}
            title={location.car_park_no}
            onPress={() => handleMarkerPress(location)}
            pinColor={getPinColor(capacity)}  // Set pinColor based on capacity
          >
            {/*use below if want to use marker icons seen in figma*/}
            {/*
            <Image
              style={styles.marker}
              source={
                location.capacity > 80
                  ? require("../../assets/images/redcapacity.png")
                  : location.capacity > 49
                  ? require("../../assets/images/orangecapacity.png")
                  : require("../../assets/images/greencapacity.png")
              }
            />
        */}
          </Marker>
          );
        })}
        {/*testing polyline*/}
        {/*to get lat and long of starting position from GPS/manual input TYPE: number*/}
        {/*to convert the x and y coordinates of carparks to lat and long TYPE: number*/}
        <PolylineComponent
          start={{ latitude: 1.304833, longitude: 103.831833 }} 
          end={{ latitude: 1.36310057764065, longitude: 103.962012302637 }}
        />
      </MapView>

      <FAB />

      {/* Pass modalVisible, selectedCarpark, and setModalVisible as props to CarparkSummary */}
      <CarparkSummary
        visible={modalVisible}
        carparkData={selectedCarpark}
        onClose={() => setModalVisible(false)}
      />

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
    zIndex: 1,
  },
  marker:{
    width:41,
    height:50,
  },
});
