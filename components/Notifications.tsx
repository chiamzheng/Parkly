import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from 'react';


const functions = require('../backend/src/controller/carpark_manager');
const { get_available_lots, get_capacity, fetch_suggestions, fetch_reviews, fetch_carparks_within_radius } = functions;

const NotificationScreen = () => {
    const [notifIsOn,setNotifIsOn] = useState(false);
    
    // Request notification permissions
    useEffect(() => {
      const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.error('Notification permission not granted');
        }
      };
      requestPermissions();
    }, []);
  
    // Notification handler for foreground notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  
    const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You turned on notifications!",
          body: "We will notify you if more lots are available for this carpark.",
        },
        trigger: null, // Immediately show the notification
      });
    };
  
    return (
        <TouchableOpacity onPress={() => {setNotifIsOn(!notifIsOn); if(!notifIsOn) {scheduleNotification();}}}>
            <Image
            source={
                notifIsOn
                ? require('../assets/images/notification_on.png')   
                : require('../assets/images/notification_off.png') 
            }
            style={{ width: 30, height: 30, marginRight: 5}}
            /> 

        </TouchableOpacity>
    );
};

export default NotificationScreen;

