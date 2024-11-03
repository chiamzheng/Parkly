import LocationSearchInterface from '@/components/LocationSearchInterface';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from "react";
import CarparkSummary from '../../components/carparkSummary';
import FAB from '../../components/FAB';

export default function Homepage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(null);

  const carparkLocations = [
    { id: 1, latitude: 1.3521, longitude: 103.8100, title: 'JM23',capacity:88 },
    { id: 2, latitude: 1.3531, longitude: 103.8200, title: 'PT99',capacity:30 },
    { id: 3, latitude: 1.3541, longitude: 103.8300, title: 'LF28',capacity:20 },
  ];

  const handleMarkerPress = (carpark) => {
    setSelectedCarpark(carpark); // Pass carpark data to CarparkSummary
    setModalVisible(true); // Open modal
  };

  return (
    <View style={styles.container}>
      <LocationSearchInterface style={styles.search} />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {carparkLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
            onPress={() => handleMarkerPress(location)}
          />
        ))}
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
});
