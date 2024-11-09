import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import axios from 'axios';

const ReviewScreen = (style:any, navigation:any) => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleRatingPress = (rate: number) => {
        setRating(rate);
    };

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleReviewSubmit = async () => {
        console.log("Review button pressed");
        try {
            // const user = await axios.get('http://192.168.1.143:8083/api/user_account/current');
            // const email = user.data.email;

            await axios.put('http://192.168.0.8:8083/api/user_account/review', {
            email: "some_email@gmail.com",
            review: {
                rating,
                comment: review,
            },
            });
            console.log('Review just submitted successfully');
            navigation.navigate('HomepageUI/homepage');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <View style={{
            ...style?.style,
            ...styles.container,
            }}>
            <View style={styles.header}>
                <MaterialIcons name="local-parking" size={24} color="green" />
                <Text style={styles.title}>JM23 • 15 mins away</Text>
                <TouchableOpacity onPress={toggleBookmark}>
                    <FontAwesome
                        name={isBookmarked ? "bookmark" : "bookmark-o"}
                        size={24}
                        color="black"
                        style={styles.bookmarkIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.starContainer}> 
                {Array.from({ length: 5 }).map((_, index) => (
                    <FontAwesome
                        key={index}
                        name="star"
                        size={24}
                        color={index < rating ? "#FFA500" : "#E0E0E0"}
                    />// TODO: Get real data from API
                ))}
            </View>

            <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Reviews:</Text>
                <View style={styles.reviewerInfo}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/50" }} // Need actual image URL
                        style={styles.avatar}
                    />
                    <Text style={styles.reviewerName}>Jackson Lim</Text>
                </View>
            </View>

            <Text style={styles.myRating}>My rating:</Text>
            <View style={styles.starContainer}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => handleRatingPress(index + 1)}>
                        <FontAwesome
                            name="star"
                            size={24}
                            color={index < rating ? "#FFA500" : "#E0E0E0"}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Please share more..."
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleReviewSubmit}>
                <Text style={styles.buttonText}>Publish Review</Text>
            </TouchableOpacity>
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
        width: Dimensions.get('window').width * 0.8,
        alignSelf: 'center',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 5,
    },
    bookmarkIcon: {
        marginLeft: 75, // Adjusted margin to add space between text and icon
    },
    starContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    reviewSection: {
        marginVertical: 10,
    },
    reviewLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    reviewerInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    reviewerName: {
        fontSize: 16,
    },
    myRating: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        height: 80,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        backgroundColor: "#fff",
        textAlignVertical: "top",
    },
    button: {
        marginTop: 15,
        backgroundColor: "#65558F",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ReviewScreen;
