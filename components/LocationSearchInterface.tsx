import { useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Text, Modal, StyleSheet,FlatList,ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BookmarkList } from './Bookmark';
import LocationScreen from './Geolocation';
import { getLocationSuggestions } from './Service/locationService';
import React, { memo, useCallback, useRef, useState, useEffect } from 'react'
import { Button, Dimensions, Platform } from 'react-native'
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import * as Location from 'expo-location';

const LocationSearchInterface = ({ email, style, onClickBookmark, username, setDestination, setStartPoint, onPressGo, bookmarkUpdateAlert, setBookmarkUpdateAlert }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [bookmarksVisible, setBookmarksVisible] = useState(false);
  //const [startPoint, setStartPoint] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery1, setSearchQuery1] = useState('');
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [suggestionsList1, setSuggestionsList1] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)
  const dropdownController1 = useRef(null)
  const searchRef = useRef(null)
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);


  const getCurrentLocation = async () => {
      setIsFetchingLocation(true);
      setSearchQuery("Fetching location...");

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          console.log("User's current location:", location);
          setSearchQuery1("Current Location");
          setStartPoint({ latitude: location.coords.latitude, longitude: location.coords.longitude });
          dropdownController1.current?.setInputText("Current Location");
      } else {
          console.error('Location permission not granted');
          setStartPoint('');
      }
      
      setIsFetchingLocation(false);
  };
  const handleSelectItem = (item) => {
    if (item) {
      setSearchQuery(item.title);
      setDestination({ latitude: item.latitude, longitude: item.longitude }); // END POINT
    }
  };
  const handleSelectItem1 = (item) => {
    if (item) {
      setSearchQuery1(item.title);
      setStartPoint({ latitude: item.latitude, longitude: item.longitude }); // START POINT
    }
  };

  const handleStartPointChange = (query) => {
    setSearchQuery1(query);
  };
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const toggleBookmarks = () => {
    setBookmarksVisible(!bookmarksVisible);
  };

  const handleLogout = () => {
    alert('Logout button pressed');
  };

  const fetchData = async (query,identify) => {
    try {
      identify?setLoading1(true):setLoading(true);
      const items = await getLocationSuggestions(query);
      const suggestions = items
        .map((item, idx) => ({
          id: idx,
          title: item.Address,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude)
        }))
        identify?setLoading1(false):setLoading(false);
      return suggestions
    } catch (error) {
      Alert.alert('No matching locations found');
      //console.error('Error fetching data:', error);
      identify?setLoading1(false):setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery) {
        const suggestions = await fetchData(searchQuery,0);
        setSuggestionsList(suggestions);
      } else {
        setSuggestionsList(null);
      }
    };
    fetchSuggestions();
  }, [searchQuery]);
  useEffect(() => {
    const fetchSuggestions1 = async () => {
      if (searchQuery1) {
        const suggestions = await fetchData(searchQuery1,1);
        setSuggestionsList1(suggestions);
      } else {
        setSuggestionsList1(null);
      }
    };
    fetchSuggestions1();
  }, [searchQuery1]);
  const getSuggestions = useCallback(async q => {
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setSearchQuery(q)
    const suggestions = await fetchData(q)
    setSuggestionsList(suggestions)
  }, [])
  const getSuggestions1 = useCallback(async q => {
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList1(null)
      return
    }
    setSearchQuery1(q)
    const suggestions = await fetchData(q)
    setSuggestionsList1(suggestions)
  }, [])
  const onClearPress = useCallback(() => {
    setDestination(null);
    setSuggestionsList(null);
  }, [])
  const onClearPress1 = useCallback(() => {
    setSuggestionsList1(null);
    setStartPoint(null);
  }, [])

  const navigateSettings = () => {
    navigation.navigate('SettingsUI/settingspage', {
      email,
    });
  }


  const onOpenSuggestionsList = useCallback(isOpened => {}, [])
  const onOpenSuggestionsList1 = useCallback(isOpened => {}, [])
 
  return (
    <View style={{ ...style, ...styles.container }}>
      {/* User Profile Section */}
      <View style={styles.header}>
        <Text style={styles.userName} adjustsFontSizeToFit minimumFontScale={0.3} numberOfLines={1}>
          {username}
        </Text>
        <TouchableOpacity onPress={toggleBookmarks} style={styles.iconButton}>
          <Icon name="bookmark-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateSettings} style={styles.iconButton}>
          <Icon name="settings-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WelcomeUI/welcomepage')} style={styles.iconButton}>
          <Icon name="log-out-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Start Point Input */}
      <AutocompleteDropdownContextProvider>
      <View style={styles.inputContainer}>
          <TouchableOpacity onPress={getCurrentLocation}>
            <Icon name="location-outline" size={24} color="#0066FF"/>
          </TouchableOpacity>
          <AutocompleteDropdown
            ref={searchRef}
            controller={(controller) => { dropdownController1.current = controller; }}
            dataSet={suggestionsList1}  // Same data set for both dropdowns, should be unique
            onChangeText={getSuggestions1}
            onSelectItem={(item) => handleSelectItem1(item)} // setDestination - give lat and long 
            debounce={600}
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress1}
            onOpenSuggestionsList={onOpenSuggestionsList1}
            loading={loading1}
            useFilter={false}
            textInputProps={{
              placeholder: 'Start Point',
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                borderRadius: 10,
                width: '90%',
                backgroundColor: '#FFFFFF',
                color: '#333',
                paddingRight: 25,
                height:35,
              },
            }}
            rightButtonsContainerStyle={{
              position:"absolute",
              
              right: 2,
              //height: 30,
              alignSelf: 'center',
              justifyContent:"flex-end",
              alignContent:'flex-end',
            }}
            inputContainerStyle={{
              backgroundColor: 'transparent',
              borderRadius: 10,
              width: '100%',
              height:35,
            }}
            suggestionsListContainerStyle={{
              backgroundColor: '#F5F5F5',
              width: '100%',
              maxHeight: Dimensions.get('window').height * 0.3, // adjustable height
              borderRadius: 10,
              right:50,
              bottom:20,
              //overflow: 'hidden',
            }}

            ClearIconComponent={<Icon name="close-outline" size={20} color="#888" />}
            inputHeight={50}
            showChevron={false}
          />
          
        </View>
        
        {/* Destination Input , using this field for setDestination cause only dropdown is visible here*/}
        <View style={styles.inputContainer}>
          <Icon name="location-outline" size={24} color="#FF0000" style={styles.inputIcon} />
          <AutocompleteDropdown
            ref={searchRef}
            controller={(controller) => { dropdownController.current = controller; }}
            dataSet={suggestionsList}  // Same data set for both dropdowns, should be unique
            onChangeText={getSuggestions}
            onSelectItem={(item) => handleSelectItem(item)} // setDestination - give lat and long 
            debounce={600}
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress}
            onOpenSuggestionsList={onOpenSuggestionsList}
            loading={loading}
            useFilter={false}
            textInputProps={{
              placeholder: 'End Point',
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                borderRadius: 10,
                width: '90%',
                backgroundColor: '#FFFFFF',
                color: '#333',
                paddingRight: 25,
                height:35,
              },
            }}
            rightButtonsContainerStyle={{
              position:"absolute",
              
              right: 2,
              //height: 30,
              alignSelf: 'center',
              justifyContent:"flex-end",
              alignContent:'flex-end',
            }}
            inputContainerStyle={{
              backgroundColor: 'transparent',
              borderRadius: 10,
              width: '100%',
              height:35,
            }}
            suggestionsListContainerStyle={{
              backgroundColor: '#F5F5F5',
              width: '100%',
              maxHeight: Dimensions.get('window').height * 0.3, // adjustable height
              borderRadius: 10,
              right:50,
              bottom:20,
              //overflow: 'hidden',
            }}

            ClearIconComponent={<Icon name="close-outline" size={20} color="#888" />}
            inputHeight={50}
            showChevron={false}
          />
        </View>
      </AutocompleteDropdownContextProvider>

      <TouchableOpacity onPress={onPressGo} style={styles.goButton}>
        <Text style={styles.goText}>Navigate</Text>
      </TouchableOpacity>

      {/* Display Search Results */}
      

      {/* Bookmarks Modal */}
      <Modal
        visible={bookmarksVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleBookmarks}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <BookmarkList 
              onPress={toggleBookmarks} 
              onPressGo={onPressGo}
              onClickBookmark={onClickBookmark} 
              bookmarkUpdateAlert={bookmarkUpdateAlert}
              setBookmarkUpdateAlert={setBookmarkUpdateAlert}
              email={email}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#EAE7EA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    width: 300,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    flex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  inputIcon: {
    //marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  goButton: {
    marginTop: 20,
    backgroundColor: '#7E5FCF',
    borderRadius: 20,
    paddingVertical: 5,
    alignItems: 'center',
    zIndex:-1,
    elevation:-1,
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
  suggestionsList: {
  padding: 10,
  elevation:10,
  zIndex:10,
},
suggestionItem: {
  padding: 10,
  fontSize: 16,
  borderBottomWidth: 0.5,
  borderBottomColor: '#ccc',
},
suggestionsListContainer: {
  position: 'absolute',
  top: 60,
  width: '100%',
  maxHeight: Dimensions.get('window').height * 0.3, // adjustable height
  zIndex: 11,
  backgroundColor: '#FFF',
  borderRadius: 8,
  elevation:11,
},
});

export default LocationSearchInterface;
