import { useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BookmarkList from './Bookmark';
import LocationScreen from './Geolocation';
import { getLocationSuggestions } from './Service/locationService';
import React, { memo, useCallback, useRef, useState, useEffect } from 'react'
import { Button, Dimensions, Platform } from 'react-native'
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

const LocationSearchInterface = ({ style, onClickBookmark, username }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [bookmarksVisible, setBookmarksVisible] = useState(false);
  const [startPoint, setStartPoint] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)

  const searchRef = useRef(null)

  const handleStartPointChange = (query) => {
    setStartPoint(query);
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

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const items = await getLocationSuggestions(query);
      const suggestions = items
        .map((item, idx) => ({
          id: idx,
          title: item.Address,
        }))
      setLoading(false);
      return suggestions
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery) {
        const suggestions = await fetchData(searchQuery);
        setSuggestionsList(suggestions);
      } else {
        setSuggestionsList(null);
      }
    };
    fetchSuggestions();
  }, [searchQuery]);

  const getSuggestions = useCallback(async q => {
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setSearchQuery(q)
    const suggestions = await fetchData(q)
    setSuggestionsList(suggestions)
  }, [])

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback(isOpened => {}, [])

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
        <TouchableOpacity onPress={() => navigation.navigate("SettingsUI/settingspage")} style={styles.iconButton}>
          <Icon name="settings-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
          <Icon name="log-out-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Start Point Input */}
      <AutocompleteDropdownContextProvider>
        <View style={styles.inputContainer}>
          <Icon name="location-outline" size={24} color="#0066FF" style={styles.inputIcon} />
          <AutocompleteDropdown
            ref={searchRef}
            controller={controller => {
              dropdownController.current = controller
            }}
            dataSet={suggestionsList}
            onChangeText={getSuggestions}
            onSelectItem={item => {
              item && setStartPoint(item.title)
            }}
            debounce={600}
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress}
            onOpenSuggestionsList={onOpenSuggestionsList}
            loading={loading}
            useFilter={false}
            textInputProps={{
              placeholder: 'Start Point',
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                borderRadius: 25,
                backgroundColor: '#F5F5F5',
                color: '#333',
                paddingLeft: 18,
              },
            }}
            rightButtonsContainerStyle={{
              right: 8,
              height: 30,
              alignSelf: 'center',
            }}
            inputContainerStyle={{
              backgroundColor: '#F5F5F5',
              borderRadius: 25,
              width: '100%',
            }}
            suggestionsListContainerStyle={{
              backgroundColor: '#F5F5F5',
              width: '100%',
            }}
            renderItem={(item, text) => <Text>{item.title}</Text>}
            ChevronIconComponent={<Icon name="chevron-down-outline" size={20} color="#888" />}
            ClearIconComponent={<Icon name="close-outline" size={20} color="#888" />}
            inputHeight={50}
            showChevron={false}
          />
        </View>

        {/* Destination Input */}
        <View style={styles.inputContainer}>
          <Icon name="location-outline" size={24} color="#FF0000" style={styles.inputIcon} />
          <AutocompleteDropdown
            ref={searchRef}
            controller={controller => {
              dropdownController.current = controller
            }}
            dataSet={suggestionsList}
            onChangeText={getSuggestions}
            onSelectItem={item => {
              item && setSearchQuery(item.title)
            }}
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
                borderRadius: 25,
                backgroundColor: '#F5F5F5',
                color: '#333',
                paddingLeft: 18,
              },
            }}
            rightButtonsContainerStyle={{
              right: 8,
              height: 30,
              alignSelf: 'center',
            }}
            inputContainerStyle={{
              backgroundColor: '#F5F5F5',
              borderRadius: 25,
              width: '100%',
            }}
            suggestionsListContainerStyle={{
              backgroundColor: '#F5F5F5',
              width: '100%',
            }}
            renderItem={(item, text) => <Text>{item.title}</Text>}
            ChevronIconComponent={<Icon name="chevron-down-outline" size={20} color="#888" />}
            ClearIconComponent={<Icon name="close-outline" size={20} color="#888" />}
            inputHeight={50}
            showChevron={false}
          />
        </View>
      </AutocompleteDropdownContextProvider>

      {/* Go Button */}
      <TouchableOpacity onPress={fetchData} style={styles.goButton}>
        <Text style={styles.goText}>Go</Text>
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
            <BookmarkList onPress={toggleBookmarks} onClickBookmark={onClickBookmark} />
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
    marginBottom: 20,
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
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  inputIcon: {
    marginRight: 10,
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
});

export default LocationSearchInterface;
