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
import CarparkSummary from './carparkSummary';
import React from "react";

const OFFSET = 60; // Distance to move FABs when expanded

const FloatingActionButton = ({ isExpanded, index, imgsrc }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const translateY = isExpanded.value ? -OFFSET * index : 0; // Move FAB up when expanded
    const opacity = isExpanded.value ? 1 : 0; // Fully visible when expanded

    return {
      transform: [{ translateY: withSpring(translateY) }],
      opacity: withTiming(opacity, { duration: 200 }), // Smooth opacity transition
    };
  });

  return (
    <Animated.View style={[animatedStyles, styles.fabButton]}>
      <Image source={imgsrc} />
    </Animated.View>
  );
};

export default function Homepage({ navigation }) {
  const isExpanded = useSharedValue(false); // State to track if FAB is expanded
  const containerHeight = useSharedValue(60); // Initial height of the FAB container

  const handlePress = () => {
    isExpanded.value = !isExpanded.value; // Toggle the expanded state
    containerHeight.value = isExpanded.value ? 60 : 245; // Update the height based on expanded state
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(containerHeight.value, { duration: 300 }), // Smooth height transition
    };
  });

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

      {/* FAB Container */}
      <Animated.View style={[styles.FABContainer, animatedContainerStyle]}>
        <Pressable
          onPress={handlePress}
          style={[styles.shadow, styles.mainFAB]}>
          <Image source={require('../assets/images/Sliders.png')} />
        </Pressable>

        <FloatingActionButton
          isExpanded={isExpanded}
          index={1}
          imgsrc={require('../assets/images/Star.png')}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={2}
          imgsrc={require('../assets/images/price.png')}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={3}
          imgsrc={require('../assets/images/Target.png')}
        />
      </Animated.View>

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
  },
  carpark: {
    position: 'absolute',
    top: 500,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  mainFAB: {
    width: 60,
    height: 60,
    backgroundColor: '#6B5293',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    elevation: 2,
    zIndex: 2,
  },
  FABContainer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#CFC5DF',
    borderRadius: 30,
    elevation: 0,
    zIndex: 0,
  },
  fabButton: {
    width: 60,
    height: 60,
    backgroundColor: '#CFC5DF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60, // Adjust spacing between buttons
    elevation: 1,
    zIndex: 1,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
