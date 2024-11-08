import LocationSearchInterface from '@/components/LocationSearchInterface';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useMemo } from "react";
import CarparkSummary from '../../components/carparkSummary';
import FAB from '../../components/FAB';
import PolylineComponent from '@/components/Polyline';

export default function Homepage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(null);

  const carparkLocations = [
    { id: 1, latitude: 1.3521, longitude: 103.8100, title: 'JM23',rate:1.22,capacity:80 },
    { id: 2, latitude: 1.3531, longitude: 103.8200, title: 'Y24',rate:1.23,capacity:50},
    { id: 3, latitude: 1.3541, longitude: 103.8300, title: 'SK71',rate:1.24,capacity:20},
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
    const idx = carparkLocations.findIndex((location) => location.title === markerCode);
    handleMarkerPress(carparkLocations[idx]);
  }

  return (
    <View style={styles.container}>
      <LocationSearchInterface style={styles.search} onClickBookmark={handleBookmarkPress} />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {carparkLocations.map((location) => {
            //const imageSource = useMemo(() => getMarkerImage(location.capacity), [location.capacity]);
        
          return(
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
            onPress={() => handleMarkerPress(location)}
            pinColor={getPinColor(location.capacity)}  // Set pinColor based on capacity
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
