import { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import {addReview, fetchReviews} from './Service/apiService';

export const ReviewBoxComponent = ({carparkID, setReviewBox, email, setNewReviewAlert}) => {
    const [review, setReview] = useState("");

    const handleChangeText = (text: string) => {
        setReview(text);
    };

    const handleReviewSubmit = async () => {
        await addReview(carparkID, email, review);
        setReviewBox(false);
        setNewReviewAlert(true);
    }
    return (
        <View style={styles.reviewTextBox}>
        <TextInput
            style={styles.textBox}
            placeholder="Type something here.."
            placeholderTextColor= 'grey'
            value={review}
            onChangeText={handleChangeText}
            multiline={true}
        />
        {review !== "" && (
            <TouchableOpacity onPress={handleReviewSubmit}>
                <Text style={styles.publishReviewText}> Publish Review </Text>   
            </TouchableOpacity>
        )}
        </View>
    );
};

export const DisplayReviews = ({carparkID, newReviewAlert, setNewReviewAlert}) => {
    const [reviews, setReviews] = useState<string[]>([]);

    const fetchData = async () => {
        const data = await fetchReviews(carparkID);
        setReviews(data || []);
        console.log(data);
    };

    useEffect(() => {
        fetchData();
    }, [carparkID]);

    useEffect(() => {
        if (newReviewAlert) {
          fetchData();
          setNewReviewAlert(false);
        }
      }, [newReviewAlert]); 
    
    return (
        <ScrollView>
            {reviews.length > 0 ? (
                reviews.map((review, index) => {
                    const [email, text] = review.split(/:(.*)/);

                    return (
                        <View key={index} style={styles.box}>
                            <Text style={styles.name}>{email.trim()}</Text>
                            <Text style={styles.reviewText}>{text.trim()}</Text>
                        </View>
                    );
                })
            ) : (
                <Text>No reviews available</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  textBox: {
    width: '100%',
    height: '100%',
    padding: 10,
    textAlign: 'left', 
    textAlignVertical: 'top',
  },
  reviewTextBox: {
    width: 280,
    height: 100,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 20,
  },
  publishReviewText: {
    fontSize: 15,
    alignSelf: 'flex-end',
    marginTop: 3,
    textDecorationLine: 'underline',
  },
  box:{
    width: 260,
    height: 70,
    backgroundColor: "yellow",
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
  },
});
