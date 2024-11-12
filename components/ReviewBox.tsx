import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import {addReview} from './Service/apiService';

//const  ReviewBoxComponent = ({carparkID, email, setReviewBox}) => {
const  ReviewBoxComponent = ({carparkID, setReviewBox}) => {
    const [review, setReview] = useState("");

    const handleChangeText = (text: string) => {
        setReview(text);
    };

    //const handleReviewSubmit = async () => {
    const handleReviewSubmit = () => {
        //addReview(carparkID, email, review);
        setReviewBox(false);
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
                <Text style={{fontSize: 15, alignSelf: 'flex-end', marginTop: 3, textDecorationLine: 'underline'}}> Publish Review </Text>   
            </TouchableOpacity>
        )}
        </View>
    );
};

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
});

export default ReviewBoxComponent;
