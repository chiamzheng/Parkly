import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';  // No need to import 'react' here
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';

export default function App() {

    let[isLoading, setIsLoading] = useState(true);
    let[error, setError] = useState();
    let[response, setResponse] = useState();

    useEffect(()=>{
        fetch("https://api.data.gov.sg/v1/transport/carpark-availability")
            .then(res => res.json())
            .then(
                (result)=>{
                    setIsLoading(false);
                    setResponse(result)
                },
                (error)=>{
                    setIsLoading(false);
                    setError(error) // Fixed here, should set error instead of response
                })
    },[])

    const getContent = () =>{
        if(isLoading){
            return <ActivityIndicator size="large"/>; // Fixed indentation
        }

        if(error){
            return <Text>{error.message}</Text> // Added error message display
        }

        console.log(response)
        const carparkData = response.items[0].carpark_data;
        return (
            <ScrollView>
                {carparkData.map((carpark, index) => (
                    <View key={index} style={styles.carparkContainer}>
                        <Text>Carpark Number: {carpark.carpark_number}</Text>
                        <Text>Total Lots: {carpark.carpark_info[0].total_lots}</Text>
                        <Text>Available Lots: {carpark.carpark_info[0].lots_available}</Text>
                        <Text>Updated: {carpark.update_datetime}</Text>
                    </View>
                ))}
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            {getContent()}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carparkContainer: {  // Added styling for carpark data
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
