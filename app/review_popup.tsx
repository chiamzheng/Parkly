import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";

const ReviewScreen = () => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const handleRatingPress = (rate: number) => {
        setRating(rate);
    };

    return (
        <View style={styles.container}>
            <ThemedView style={styles.card}>
                <View style={styles.header}>
                    <MaterialIcons name="local-parking" size={24} color="green" />
                    <Text style={styles.title}>JM23 • 15 mins away</Text>
                    <FontAwesome name="bookmark-o" size={24} color="black" style={styles.bookmarkIcon} />
                </View>

                <View style={styles.starContainer}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FontAwesome
                            key={index}
                            name="star"
                            size={24}
                            color={index < rating ? "#FFA500" : "#E0E0E0"}
                        />
                    ))}
                </View>

                <View style={styles.reviewSection}>
                    <Text style={styles.reviewLabel}>Reviews:</Text>
                    <View style={styles.reviewerInfo}>
                        <Image
                            source={{ uri: "" }} // Need actual image URL
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

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Publish Review</Text>
                </TouchableOpacity>
            </ThemedView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DDD5D5",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        width: "90%",
        padding: 20,
        backgroundColor: "#EEE6D3",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
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
        fontFamily: "SpaceMono",
    },
    bookmarkIcon: {
        marginLeft: "auto",
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
        fontFamily: "SpaceMono",
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
        fontFamily: "SpaceMono",
    },
    myRating: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        fontFamily: "SpaceMono",
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
        fontFamily: "SpaceMono",
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
        fontFamily: "SpaceMono",
    },
});

export default ReviewScreen;
