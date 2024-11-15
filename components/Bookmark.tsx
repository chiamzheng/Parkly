import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateBookmark, fetchBookmark } from './Service/dbUserAccount';
import carparkData from '../CarparkInformation.json'; 
import computeLatLon from '@/scripts/computeLatLon';
import MapView from 'react-native-maps';

export const BookmarkList = ({
  onPress,
  onPressGo,
  onClickBookmark,
  bookmarkUpdateAlert,
  setBookmarkUpdateAlert,
  email,
  mapRef,
  handleMarkerPress,
}) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const animateToCoordinate = (mapRef, coordinate: { latitude: number, longitude: number }) => {
    if (mapRef.current && coordinate) {
      console.log('Animating to coordinates:', coordinate);
      mapRef.current.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: 0.01, // Adjust zoom level
          longitudeDelta: 0.01,
        },
        1000 // Duration in milliseconds
      );
    } else {
      console.log('No map ref or invalid coordinates');
    }
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

  const fetchData = async () => {
    const data = await fetchBookmark(email);
    setBookmarks(data||[]);
  };

  useEffect(() => {
    fetchData();
  }, [email]);
  
  useEffect(() => {
    if (bookmarkUpdateAlert) {
      fetchData();
      setBookmarkUpdateAlert(false);
    }
  }, [bookmarkUpdateAlert]); 

  const handleMarkerPress2 = (carparkID) => {
    onPress();
    onClickBookmark(carparkID);
    const carparkLocation = getCarparkLocation(carparkID);
    if (carparkLocation) {
      animateToCoordinate(mapRef, carparkLocation); // Focus map on chosen carpark
    } else {
      Alert.alert("Carpark Not Found", "Unable to locate the selected carpark.");
    }
    
  };

  const handleDelete = async (carparkID) => {
    await updateBookmark(email, carparkID);
    const newBookmarks = bookmarks.filter(item => item !== carparkID);
    setBookmarks(newBookmarks);
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.bookmarkRow} onPress={() => {handleMarkerPress2(item); handleMarkerPress(item);}}>
      {/* Color marker */}
      <View style={styles.colorMarker} />

      {/* Text */}
      <Text style={styles.bookmarkText}>{item}</Text>

      {/* Delete button */}
      <TouchableOpacity onPress={() => handleDelete(item)}>
        <Icon name="trash-outline" size={24} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="bookmark" size={24} color="#000" />
        <Text style={styles.headerText}>Bookmarks</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onPress}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Bookmark list */}
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export const BookmarkButton = ({carparkID, email, setBookmarkUpdateAlert}) => {
  const [bookmarkedIDs, setBookmarkedIDs] = useState<string[]>([]);
  const [toggleBookmarked, setToggleBookmarked] = useState(false);

  const fetchData = async () => {
    const data = await fetchBookmark(email);
    setBookmarkedIDs(data || []);
    setToggleBookmarked(data?.includes(carparkID) || false); // Check if carparkID is in bookmarked list
  };

  useEffect(() => {
    fetchData();
  }, [carparkID]);

  const handleBookmarkToggle = async () => {
    setToggleBookmarked(!toggleBookmarked);
    setBookmarkUpdateAlert(true);
    await updateBookmark(email, carparkID);
  };

  return (
    <TouchableOpacity onPress={handleBookmarkToggle}>
      <Image
        source={
          toggleBookmarked
            ? require('../assets/images/bookmark_on.png') 
            : require('../assets/images/bookmark_off.png') 
        }
        style={{ width: 30, height: 30, marginRight: 10}}
      />
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#EDEDED',
    borderRadius: 15,
    width: 300,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  closeButton: {
    marginLeft: 'auto',
  },
  bookmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: 'black',
  },
  bookmarkText: {
    flex: 1,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC',
    marginVertical: 10,
  },
});