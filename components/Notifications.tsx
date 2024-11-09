import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = ({ carparkID }) => {
    const [notificationStates, setNotificationStates] = useState({});
    const [notifIsOn, setNotifIsOn] = useState(false);

    // Load notification state from AsyncStorage on mount
    useEffect(() => {
        const loadNotificationState = async () => {
            try {
                const savedState = await AsyncStorage.getItem('notificationStates');
                if (savedState) {
                    const parsedState = JSON.parse(savedState);
                    setNotificationStates(parsedState);
                    setNotifIsOn(parsedState[carparkID] || false); // Set initial state for the current carpark
                }
            } catch (error) {
                console.error("Error loading notification state:", error);
            }
        };
        loadNotificationState();
    }, [carparkID]);

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

    const toggleNotification = async () => {
        const currentStatus = notificationStates[carparkID] || false;
        const updatedStates = {
            ...notificationStates,
            [carparkID]: !currentStatus,
        };
        setNotificationStates(updatedStates);
        setNotifIsOn(!currentStatus);

        try {
            await AsyncStorage.setItem('notificationStates', JSON.stringify(updatedStates));
        } catch (error) {
            console.error("Error saving notification state:", error);
        }

        // Schedule notification if it's being turned on
        if (!currentStatus) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "You turned on notifications!",
                    body: `We will notify you if more lots are available for carpark ${carparkID}.`,
                },
                trigger: null, // Show the notification immediately
            });
        }
    };

    return (
        <TouchableOpacity onPress={toggleNotification}>
            <Image
                source={
                    notifIsOn
                        ? require('../assets/images/notification_on.png')
                        : require('../assets/images/notification_off.png')
                }
                style={{ width: 30, height: 30, marginRight: 5 }}
            />
        </TouchableOpacity>
    );
};

export default NotificationScreen;
