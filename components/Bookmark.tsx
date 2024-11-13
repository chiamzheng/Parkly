import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateBookmark, fetchBookmark } from './Service/dbUserAccount';
import CarparkIcons from './carparkIcons';

export const BookmarkList = ({
  onPress,
  onPressGo,
  onClickBookmark,
  bookmarkUpdateAlert,
  setBookmarkUpdateAlert,
  email,
}) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const fetchData = async () => {
    const data = await fetchBookmark(email);
    setBookmarks(data || []);
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

  const handleMarkerPress = (markerCode) => {
    onPressGo;
    onClickBookmark(markerCode);
  };

  const handleDelete = async (carparkID) => {
    await updateBookmark(email, carparkID);
    const newBookmarks = bookmarks.filter(item => item !== carparkID);
    setBookmarks(newBookmarks);
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.bookmarkRow} onPress={() => handleMarkerPress(item)}>
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

