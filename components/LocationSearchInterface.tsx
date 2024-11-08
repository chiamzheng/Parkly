import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BookmarkList from './Bookmark';
import { Modal } from 'react-native';
import LocationScreen from './Geolocation';

const LocationSearchInterface = (style:any) =>{
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarksVisible, setBookmarksVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query); 
  };

  

  // Function to toggle bookmarks modal visibility
  const toggleBookmarks = () => {
    setBookmarksVisible(!bookmarksVisible);
  };

  // Handle logout action
  const handleLogout = () => {
    alert('Logout button pressed');
  };

  // Fetching data from the OneMap API
  const fetchData = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8083//searchAddress/1.35238866039921,103.959877071858`);
      const result = await response.json();
      setData(result.results);  // Adjust based on the structure of the API response
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Use Effect to load data when the component mounts or searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      fetchData();
    } else {
      setLoading(false); // Set loading to false if searchQuery is empty
    }
  }, [searchQuery]);

  if (loading) {
    return (<Text>Loading...</Text>);
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
        <TouchableOpacity onPress={() => navigation.navigate("SettingsUI/settingspage")} style={styles.iconButton}>
          <Icon name="settings-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
          <Icon name="log-out-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Destination Input */}
      <LocationScreen onSearchQueryChange={handleSearchQueryChange} />

      {/* Go Button */}
      <TouchableOpacity onPress={fetchData} style={styles.goButton}>
        <Text style={styles.goText}>Go</Text>
      </TouchableOpacity>

      {/* Display Search Results */}
      <View>
        {data && data.map((item, index) => (
          <Text key={index}>{item.ADDRESS || 'No address available'}</Text>
        ))}
      </View>

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
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
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
