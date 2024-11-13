import LocationSearchInterface from '@/components/LocationSearchInterface';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import React, { useState, useEffect } from "react";
import CarparkSummary from '../../components/carparkSummary';
import FAB from '../../components/FAB';
import carparkData from '../../CarparkInformation.json'; 
import { fetchLocation, fetchNearbyCarparks, fetchCapacity } from '@/components/Service/apiService';
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
  const [nearbyCarparksFiltered, setNearbyCarparksFiltered] = useState({});
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [polylineCoords1, setPolylineCoords1] = useState([]);
  const [startpoint, setStartPoint] = useState(null);
  const [routeDetails, setRouteDetails] = useState('');
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedRate, setSelectedRate] = useState(2);
  const [zoomThreshold, setZoomThreshold] = useState(0.06);
  const [radius, setRadius] = useState(1000); // default 1km - tweak this for filter
  const [bookmarkUpdateAlert, setBookmarkUpdateAlert] = useState(false); // Observer Pattern !!
  const [selectedFeatures, setSelectedFeatures] = useState({
        carpark_type: false,
        carpark_system: false,
        carpark_night: false,
        carpark_basement: false,
        carpark_gantry: false,
        carpark_short: false,
        carpark_free: false,

  });
  const [selectedFilters, setSelectedFilters] = useState({
    car_park_type: null,
    type_of_parking_system: null,
    whole_day_parking: null,
    free_parking: null,
    night_parking: null,
    morningtoevening_0700to1700_motorcars_rate: null,
    eveningtomorning_1700to0700_motorcars_rate: null,
  });

  const getPinColor = (capacity) => {
    if (capacity > 79) return 'green';
    if (capacity > 49) return 'orange';
    return 'red';
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
  }, [radius]); //double setNearbyCarpark (required to update AFTER choosing location)

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
        setPolylineCoords1([]);
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
        setPolylineCoords1([]);
      } catch (error) {
        console.error('Error plotting polyline:', error);
      }
    }
    else{
      Alert.alert("Missing Information", "Please ensure both start and destination are filled.");
    }
  };
  // This function filters the carparkDictionary based on the selectedFilters
  const filterCarparks = (carparkDictionary, selectedFilters) => {
    const filteredCarparks = {};
  
    // Iterate over each carpark in the carparkDictionary
    for (const [carparkId, carparkInfo] of Object.entries(carparkDictionary)) {
      let isMatch = true;
  
      // Iterate over each filter in selectedFilters
      for (const [key, filterValue] of Object.entries(selectedFilters)) {
        // If the filter value is not null (i.e., it is active)
        if (filterValue !== null) {
          // Check for numeric fields
          if (typeof filterValue === 'number') {
            if (carparkInfo[key] > filterValue) {
              isMatch = false;
              break;
            }
          } 
          // Check for string fields
          else if (carparkInfo[key] !== filterValue) {
            isMatch = false;
            break;
          }
        }
      }
  
      // If the carpark matches all the selected filters, add it to the filteredCarparks
      if (isMatch) {
        filteredCarparks[carparkId] = carparkInfo;
      }
    }
  
    return filteredCarparks; // Return the filtered carpark dictionary
  };
  
  useEffect(() => {
    // Update selectedFilters based on selectedFeatures
    setSelectedFilters(prevState => {
      return {
        ...prevState,
        // Update selectedFilters if the corresponding feature is true
        car_park_type: selectedFeatures.carpark_type ? "MULTI-STOREY CAR PARK" : prevState.car_park_type,
        type_of_parking_system: selectedFeatures.carpark_system ? "ELECTRONIC PARKING" : prevState.type_of_parking_system,
        night_parking: selectedFeatures.carpark_night ? "YES" : prevState.night_parking,
        whole_day_parking: selectedFeatures.carpark_basement ? "YES" : prevState.whole_day_parking,
        short_term_parking: selectedFeatures.carpark_short ? "YES" : prevState.short_term_parking,
        free_parking: selectedFeatures.carpark_free ? "YES" : prevState.free_parking,
        // Keep rates as before
        morningtoevening_0700to1700_motorcars_rate: selectedRate,
        eveningtomorning_1700to0700_motorcars_rate: null, // or some default value
      };
    });
  
    // Apply the filter to the existing carpark data based on the updated selectedFilters
    setNearbyCarparksFiltered(filterCarparks(nearbyCarparks, selectedFilters));
  
    // Store the filtered carparks in the state
    setNearbyCarparks(nearbyCarparksFiltered);
  
    console.log('Filtered Carparks:', nearbyCarparksFiltered);  // Log the filtered result
    console.log('Filtered Carparks:', selectedFeatures);
  }, [selectedRate, selectedDuration, selectedFeatures]);
  
  
  

  const handleStartPointSelection = async (startpoint) => {
    setStartPoint(startpoint); // just want to have destination marker, settle nearby carparks here ltr
    console.log('START:', startpoint);
  };

  const handleDestinationSelection = async (destination) => {
    setDestination(destination); // just want to have destination marker, settle nearby carparks here ltr
    if(destination){
      setZoomThreshold(0);
    }else{
      setZoomThreshold(0.06);
      setNearbyCarparks({});
    }
    
    console.log('END:', destination); // check
    
    try {
        // Fetch nearby carparks based on the destination and radius
        const carparkIds = await fetchNearbyCarparks(destination, radius);

        //console.log(carparkIds);

        // Check if carparkIds is an empty array
        if (carparkIds.length === 0) {
            Alert.alert('No carparks nearby.');
            return; // Exit early if no nearby carparks are found
        }

        // Initialize the dictionary for storing carpark data
        const carparkDictionary = {};

        // Loop through the carparkIds and fetch details for each
        for (let i = 0; i < carparkIds.length; i++) {
            const carparkId = carparkIds[i];

            console.log(carparkId);

            // Fetch the carpark's location (latitude and longitude) using the carpark ID
            const carparkLocation = await fetchLocation(carparkId);
            if (!carparkLocation) {
                //console.warn(`No location data for carparkId: ${carparkId}`);
                continue; // Skip this carpark if location data is missing
            }

            // Fetch the carpark capacity
            const carparkCapacity = await fetchCapacity(carparkId);
            if (!carparkCapacity) { // some of the capacity cannot be found in API 
                //console.warn(`No capacity data for carparkId: ${carparkId}`);
                continue; // Skip this carpark if capacity data is missing
            }
            console.log(carparkCapacity);

            // fetch features
            const carparkInfo = carparkData.find(carpark => carpark.car_park_no === carparkId);
            
            // Store the carpark location and capacity in the dictionary
            carparkDictionary[carparkId] = {
              latitude: carparkLocation.latitude,
              longitude: carparkLocation.longitude,
              capacity: carparkCapacity.capacity,
              car_park_type: carparkInfo?.car_park_type,
              type_of_parking_system: carparkInfo?.type_of_parking_system,
              short_term_parking:  carparkInfo?.short_term_parking,
              whole_day_parking:  carparkInfo?.whole_day_parking,
              morningtoevening_0700_1900_parking:  carparkInfo?.['morningtoevening_0700-1900_parking'],
              morningtonight_0700_2230_parking:  carparkInfo?.['morningtonight_0700-2230_parking'],
              free_parking:  carparkInfo?.free_parking,
              night_parking:  carparkInfo?.night_parking,
              morningtoevening_0700to1700_motorcars_rate:  carparkInfo?.morningtoevening_0700to1700_motorcars_rate, // Use selectedRate if available
              eveningtomorning_1700to0700_motorcars_rate:  carparkInfo?.eveningtomorning_1700to0700_motorcars_rate,
              morningtonight_0700to2230_motorcycle_per_lot:  carparkInfo?.morningtonight_0700to2230_motorcycle_per_lot,
              nighttomorning_2230to0700_motorcycle_per_lot:  carparkInfo?.nighttomorning_2230to0700_motorcycle_per_lot,
          };
        }

        console.log(carparkDictionary);

        // Update the state with the nearby carparks
        setNearbyCarparks(carparkDictionary);

    } catch (error) {
        //console.error("Error fetching nearby carparks:", error);
        console.log(`Capacity not available for carpark`);
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
    setShowMarkers(region.latitudeDelta < zoomThreshold);// Set this based on when you want markers to show(higher number means can see from further away)
  };

  

  return (
    <View style={styles.container}>
      <LocationSearchInterface 
        style={styles.search} 
        onClickBookmark={handleBookmarkPress} 
        username={username} 
        setDestination={handleDestinationSelection} 
        setStartPoint={handleStartPointSelection} 
        onPressGo={plotPolyline}
        bookmarkUpdateAlert={bookmarkUpdateAlert}
        setBookmarkUpdateAlert={setBookmarkUpdateAlert}
        email={email}
      />

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
            pinColor="#7E5FCF"  // Blue marker for the destination
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
            pinColor={getPinColor(carpark.capacity || 0)}
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

      <FAB returnRadius={setRadius} returnDuration={setSelectedDuration} returnRate={setSelectedRate} returnFeature={setSelectedFeatures}/>

      <CarparkSummary
        visible={modalVisible}
        carparkData={selectedCarpark}
        onClose={() => setModalVisible(false)}
        email={email}  
        chooseCarpark={setChosenCarpark}
        setBookmarkUpdateAlert={setBookmarkUpdateAlert}
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
