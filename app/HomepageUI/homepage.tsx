import LocationSearchInterface from '@/components/LocationSearchInterface';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from "react";
import CarparkSummary from '../../components/carparkSummary';
import FAB from '../../components/FAB';
import PolylineComponent from '@/components/Polyline';
import carparkData from '../../CarparkInformation.json'; 
import { fetchLocation, fetchNearbyCarparks } from '@/components/Service/apiService';

export default function Homepage({ route }) {
  const { username } = route.params || { username: "Jackson Lim" };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [capacity, setCapacity] = useState(60); // placeholder for actual capacity
  const [showMarkers, setShowMarkers] = useState(false); // track if markers should be visible
  const [destination, setDestination] = useState(null);
  const [nearbyCarparks, setNearbyCarparks] = useState({});
  
  const [startpoint, setStartPoint] = useState(null);
  const getPinColor = (capacity) => {
    if (capacity > 79) return 'red';
    if (capacity > 49) return 'orange';
    return 'green';
  };

  const radius = 1000; // default 1km - tweak this for filter
  
  const handleStartPointSelection = async (startpoint) => {
    setStartPoint(startpoint); // just want to have destination marker, settle nearby carparks here ltr
    console.log(startpoint);
  };
  const handleDestinationSelection = async (destination) => {
    setDestination(destination); // just want to have destination marker, settle nearby carparks here ltr
    console.log(destination); // check
    try {

    
      const carparkIds = await fetchNearbyCarparks(destination, radius); //fetching correctly, need to handly empty array display alert no carpark nearby

      //initialise dict
      const carparkDictionary = {};
      // Map each carparkId to detailed carpark data with array of latitude and longitude
      const arrayLength = carparkIds.length;
      let i = 0;
      while (i < arrayLength)
      {
        const carparkId = carparkIds[i];

      // Fetch the carpark's location (latitude and longitude) using the carpark ID
      const carparkLocation = await fetchLocation(carparkId);
      
      // Store the carpark location in the dictionary
      if (carparkLocation) {
        carparkDictionary[carparkId] = { latitude: carparkLocation.latitude, longitude: carparkLocation.longitude };
      }
      i++;
      }
      console.log(carparkDictionary);

      setNearbyCarparks(carparkDictionary);
      // console.log(nearbyCarparks);
    } catch (error) {
      console.error("Error fetching nearby carparks:", error);
    }
  };
  const handleMarkerPress = (carpark) => {
    setSelectedCarpark(carpark); // Pass carpark data to CarparkSummary
    setModalVisible(true); // Open modal
  };

  const handleBookmarkPress = (markerCode) => {
    const idx = carparkData.findIndex((carparkData) => carparkData.car_park_no === markerCode);
    handleMarkerPress(carparkData[idx]);
  };

  // Update marker visibility based on zoom level
  const handleRegionChangeComplete = (region) => {
    const zoomThreshold = 0.08; // Set this based on when you want markers to show
    setShowMarkers(region.latitudeDelta < zoomThreshold);
  };

  return (
    <View style={styles.container}>
      <LocationSearchInterface style={styles.search} onClickBookmark={handleBookmarkPress} username={username} setDestination={handleDestinationSelection} setStartPoint={handleStartPointSelection}/>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onRegionChangeComplete={handleRegionChangeComplete} // track zoom level
      >
        {/* Destination Marker */}
        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
            pinColor="red"  // Blue marker for the destination
          />
        )}

        {/* Nearby Carparks Markers */}
        {Object.entries(nearbyCarparks).map(([carparkKey, carpark], index) => (
          <Marker
            key={index}
            coordinate={{ latitude: carpark.latitude, longitude: carpark.longitude }}
            title={`Carpark ${carparkKey}`}  // key of dict is title
            pinColor="green"
          />
        ))}
        
        {/* Start point marker */}
        {startpoint && (
          <Marker
            coordinate={startpoint}
            title="Start Point"
            pinColor="blue"  // Blue marker for the destination
          />
        )}
        
        {showMarkers && carparkData.map((location) => {
          const { lat, lon } = computeLatLon(location.y_coord, location.x_coord);
          return (
            <Marker
            key={location.FIELD1}
            coordinate={{ latitude: lat, longitude: lon }}
            title={location.car_park_no}
            onPress={() => handleMarkerPress(location)}
            pinColor={getPinColor(capacity)} // Set pinColor based on capacity
          >
            {/* Optional: Use custom images instead of colors */}
            {/* <Image style={styles.marker} source={require('...path to marker image...')} /> */}
          </Marker>
        );
      })}


        <PolylineComponent
          start={{ latitude: 1.304833, longitude: 103.831833 }} 
          end={{ latitude: 1.36310057764065, longitude: 103.962012302637 }}
        />
      </MapView>

      <FAB />

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
    width: 41,
    height: 50,
  },
});
