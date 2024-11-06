import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const LocationScreen = ({ onSearchQueryChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    
    const getCurrentLocation = async () => {
        setIsFetchingLocation(true);
        setSearchQuery("Fetching location...");

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            console.log("User's current location:", location);
            
            setSearchQuery("Current location");
        } else {
            console.error('Location permission not granted');
            setSearchQuery('');
        }
        
        setIsFetchingLocation(false);
    };

    
    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
                <TouchableOpacity onPress={getCurrentLocation}>
                    <Icon name="location-outline" size={24} color="red" />
                </TouchableOpacity>
                <TextInput 
                    placeholder="Enter Destination" 
                    placeholderTextColor="gray"
                    style={styles.input} 
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        onSearchQueryChange(text)}} // Update parent state with the new searchQuery
                />
                {isFetchingLocation && (
                    <ActivityIndicator 
                        size="small" 
                        color="gray" 
                        style={styles.loadingIndicator} 
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    loadingIndicator: {
        marginLeft: 8,
    }
});

export default LocationScreen;
