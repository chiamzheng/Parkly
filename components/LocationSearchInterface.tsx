import { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BookmarkList from './Bookmark';
import { Modal } from 'react-native';

const LocationSearchInterface = (style: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarksVisible, setBookmarksVisible] = useState(false);

  // Function to toggle bookmarks modal visibility
  const toggleBookmarks = () => {
    setBookmarksVisible(!bookmarksVisible);
  };


  // Fetching data from the API
  const fetchData = async () => {
    try {
      // const response = await fetch('https://api.example.com/data'); // Replace with your API endpoint
      // const json = await response.json();
      // setData(json);
      setData({});
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Use Effect to load the data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{
            ...style?.style,
            ...styles.container,
            }}>
      {/* User Profile Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Jackson Lim</Text>
        {/* Icon Buttons */}
        <TouchableOpacity onPress={toggleBookmarks} style={styles.iconButton}>
          <Icon name="bookmark-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Settings button pressed')} style={styles.iconButton}>
          <Icon name="settings-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Share button pressed')} style={styles.iconButton}>
          <Icon name="share-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Start and End Point Inputs */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Icon name="location-outline" size={24} color="blue" />
          <TextInput 
            placeholder="Start Point" 
            style={styles.input} 
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.inputRow}>
          <Icon name="location-outline" size={24} color="red" />
          <TextInput 
            placeholder="End Point" 
            style={styles.input} 
          />
        </View>
      </View>

      {/* Go Button */}
      <TouchableOpacity style={styles.goButton}>
        <Text style={styles.goText}>Go</Text>
      </TouchableOpacity>

      {/* Bookmarks Modal */}
      <Modal
        visible={bookmarksVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleBookmarks}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <BookmarkList onPress={toggleBookmarks} />
          </View>
        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#EDEDED',
    width: 300,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  iconButton: {
    padding: 5,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  goButton: {
    marginTop: 20,
    backgroundColor: '#7E5FCF',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  goText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  closeButton: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});


export default LocationSearchInterface;
