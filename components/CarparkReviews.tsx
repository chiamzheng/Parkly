import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function CarparkReviews() {
    return (
    <ScrollView>
        <View style={styles.box}><Text>Review 1</Text></View>
        <View style={styles.box}><Text>Review 2</Text></View>
        <View style={styles.box}><Text>Review 3</Text></View>
        <View style={styles.box}><Text>Review 4</Text></View>
        <View style={styles.box}><Text>Review 5</Text></View>
        <View style={styles.box}><Text>Review 6</Text></View>
        <View style={styles.box}><Text>Review 7</Text></View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    box:{
        width: 260,
        height: 70,
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
    }
})

