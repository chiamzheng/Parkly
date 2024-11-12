import LocationSearchInterface from '@/components/LocationSearchInterface';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useState, useEffect } from "react";
import CarparkSummary from '../../components/carparkSummary';
import FAB from '../../components/FAB';
import carparkData from '../../CarparkInformation.json'; 
import { fetchLocation, fetchNearbyCarparks } from '@/components/Service/apiService';
import { Alert } from 'react-native';
import { getRoutePolyline, getRouteDetails } from '@/components/Service/locationService';
import { Text } from 'react-native';
import computeLatLon from '@/scripts/computeLatLon';

function extractEmailFront(email) {
  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }
  return email.split("@")[0];
}
export default function Homepage({ route }) {
  // The `route` prop is provided by the React Navigation library.
  // It contains parameters passed to this screen, such as `username` and `email`.
  const { email } = route.params || { email: "Guest@gmail.com" };
  const username = extractEmailFront(email);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [chosenCarpark, setChosenCarpark] = useState(null);
  const [capacity, setCapacity] = useState(60); // placeholder for actual capacity
  const [showMarkers, setShowMarkers] = useState(false); // track if markers should be visible
  const [destination, setDestination] = useState(null);
  const [nearbyCarparks, setNearbyCarparks] = useState({});
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [polylineCoords1, setPolylineCoords1] = useState([]);
  const [startpoint, setStartPoint] = useState(null);
  const [routeDetails, setRouteDetails] = useState('');
  const [radius, setRadius] = useState(1000); // default 1km - tweak this for filter
  const getPinColor = (capacity) => {
    if (capacity > 79) return 'red';
    if (capacity > 49) return 'orange';
    return 'green';
  };
  const getCarparkLocation = (chosenCarpark) => {
    // Find the carpark in carparkData that matches the chosenCarpark car_park_no
    const carpark = carparkData.find((data) => data.car_park_no === chosenCarpark);
    
    // If a match is found, return the latitude and longitude
    if (carpark) {  
      const { lat, lon } = computeLatLon(carpark.y_coord, carpark.x_coord);
      return { latitude: lat, longitude: lon };
    } else {
      return null; // If no match is found, return null
    }
  };
  useEffect(() => {
    const fetchCarparksByRadius = async () => {
      if (destination) {
        try {
          const carparkIds = await fetchNearbyCarparks(destination, radius);
          
          if (carparkIds.length === 0) {
            Alert.alert("No Carparks Nearby", "No carparks found within the selected radius.");
            setNearbyCarparks({}); // Clear previous markers when no carparks are found
          } else {
            const carparkDictionary = {};
            for (const carparkId of carparkIds) {
              const carparkLocation = await fetchLocation(carparkId);
              if (carparkLocation) {
                carparkDictionary[carparkId] = { latitude: carparkLocation.latitude, longitude: carparkLocation.longitude };
              }
            }
            setNearbyCarparks(carparkDictionary);
          }
        } catch (error) {
          console.error("Error fetching nearby carparks:", error);
        }
      }
    };
  
    fetchCarparksByRadius();
  }, [radius]);

  useEffect(() => {
    // Check if chosenCarpark has been updated and is not null
    if (chosenCarpark) {
      Alert.alert('Carpark Selected', `You have selected carpark: ${chosenCarpark}`);
      console.log("Chosen Carpark:", chosenCarpark);
      setNearbyCarparks({});
    }
  }, [chosenCarpark]);  // Dependency array with chosenCarpark

  // this poly line from start to destination, to create another for start to carpark when select carpark in carparkSUmmary is pressed
  const plotPolyline = async () => {
    const carparkLocation = getCarparkLocation(chosenCarpark)
    if (startpoint && destination && chosenCarpark) {
      try {
        const routeData = await getRouteDetails(startpoint,carparkLocation );
        const routeData1 = await getRouteDetails(carparkLocation, destination);
        console.log(routeData.data);
        console.log(routeData1.data);
        if (routeData&&routeData1) {
          setRouteDetails(`Start to Carpark\nDuration: ${routeData.totalTime} secs\nDistance: ${routeData.totalDistance} m\nCarpark to Destination\nDuration: ${routeData1.totalTime} secs\nDistance: ${routeData1.totalDistance} m`);
          
        }
        
        const coordinates = await getRoutePolyline(startpoint, carparkLocation);
        const coordinates1 = await getRoutePolyline(carparkLocation, destination);
        setPolylineCoords(coordinates);
        setPolylineCoords1(coordinates1);
      } catch (error) {
        console.error('Error plotting polyline:', error);
      }
    }

    else if (startpoint && destination) {
      try {
        const routeData = await getRouteDetails(startpoint, destination);
        console.log(routeData.data);
        if (routeData) {
          setRouteDetails(`Start to Destination\nDuration: ${routeData.totalTime} secs\nDistance: ${routeData.totalDistance} m`);
        }
        
        const coordinates = await getRoutePolyline(startpoint, destination);
        setPolylineCoords(coordinates);
      } catch (error) {
        console.error('Error plotting polyline:', error);
      }
    }

    else if (startpoint && chosenCarpark) {
      try {
        const routeData = await getRouteDetails(startpoint, carparkLocation);
        console.log(routeData.data);
        if (routeData) {
          setRouteDetails(`Start to Carpark\nDuration: ${routeData.totalTime} secs\nDistance: ${routeData.totalDistance} m`);
        }
        
        const coordinates = await getRoutePolyline(startpoint, carparkLocation);
        setPolylineCoords(coordinates);
      } catch (error) {
        console.error('Error plotting polyline:', error);
      }
    }
    else{
      Alert.alert("Missing Information", "Please ensure both start and destination are filled.");
    }
  };

  const handleStartPointSelection = async (startpoint) => {
    setStartPoint(startpoint); // just want to have destination marker, settle nearby carparks here ltr
    console.log('START:', startpoint);
  };

  const handleDestinationSelection = async (destination) => {
    setDestination(destination); // just want to have destination marker, settle nearby carparks here ltr
    console.log('END:', destination); // check
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
      <LocationSearchInterface style={styles.search} onClickBookmark={handleBookmarkPress} username={username} setDestination={handleDestinationSelection} setStartPoint={handleStartPointSelection} onPressGo={plotPolyline}/>

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
        {polylineCoords.length > 0 && (
          <Polyline coordinates={polylineCoords} strokeWidth={3} strokeColor="blue" />
        )}
        {polylineCoords1.length > 0 && (
          <Polyline coordinates={polylineCoords1} strokeWidth={3} strokeColor="yellow" />
        )}


        {/* Start point marker */}
        {startpoint && (
          <Marker
            coordinate={startpoint}
            title="Start Point"
            pinColor="blue"  // Blue marker for the start
          />
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
            pinColor="red"  // Blue marker for the destination
          />
        )}

         {/* Chosen Carpark Marker */}
         {chosenCarpark && (
          <Marker
            coordinate={getCarparkLocation(chosenCarpark)}
            title="Selected Carpark"
            pinColor="yellow"  // yellow marker for the carpark destination
            onPress={() => handleMarkerPress(chosenCarpark)}
          />
        )}

        {/* Nearby Carparks Markers */}
        {Object.entries(nearbyCarparks).map(([carparkKey, carpark], index) => (
          <Marker
            key={index}
            coordinate={{ latitude: carpark.latitude, longitude: carpark.longitude }}
            title={`Carpark ${carparkKey}`}  // key of dict is title
            onPress={() => handleMarkerPress(carparkKey)}
            pinColor="green"
          />
        ))}
        
        
        
        {showMarkers && carparkData.map((location) => {
          const { lat, lon } = computeLatLon(location.y_coord, location.x_coord);
          return (
            <Marker
            key={location.FIELD1}
            coordinate={{ latitude: lat, longitude: lon }}
            title={location.car_park_no}
            onPress={() => handleMarkerPress(location.car_park_no)}
            pinColor={getPinColor(capacity)} // Set pinColor based on capacity
          >
            {/* Optional: Use custom images instead of colors */}
            {/* <Image style={styles.marker} source={require('...path to marker image...')} /> */}
          </Marker>
        );
      })}

      </MapView>

      {/* Textbox for displaying route details */}
      <View style={styles.routeDetailsContainer}>
        <Text style={styles.routeDetailsText}>
          {routeDetails || 'Select a start point and destination\nto see the route details.'}
        </Text>
      </View>

      <FAB returnRadius={setRadius}/>

      <CarparkSummary
        visible={modalVisible}
        carparkData={selectedCarpark}
        onClose={() => setModalVisible(false)}
        email={email}  
        chooseCarpark={setChosenCarpark}
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
  routeDetailsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#7E5FCF',
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  routeDetailsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
