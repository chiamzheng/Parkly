import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BookmarkList = ({
  onPress,
  onClickBookmark,
}) => {
  const [bookmarks, setBookmarks] = useState([
    { id: '1', code: 'JM23', name: 'Boon Lay', color: 'green' },
    { id: '2', code: 'Y24', name: 'Woodlands', color: 'red' },
    { id: '3', code: 'SK71', name: 'Sengkang', color: 'orange' },
  ]);

  const handleMarkerPress = (markerCode) => {
    onPress();
    onClickBookmark(markerCode);
  };

  // Remove a bookmark from the list
  const handleDelete = (id) => {
    const newBookmarks = bookmarks.filter(item => item.id !== id);
    setBookmarks(newBookmarks);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.bookmarkRow} onPress={() => handleMarkerPress(item.code)}>
      {/* Color marker */}
      <View style={[styles.colorMarker, { backgroundColor: item.color }]} />

      {/* Text */}
      <Text style={styles.bookmarkText}>
      {item.code} ({item.name})
      </Text>

      {/* Delete button */}
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

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

export default BookmarkList;
