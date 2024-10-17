import {useState} from 'react';
import {StyleSheet, Text, TextInput, Pressable, View, Image} from 'react-native';

export default function LocationSearchInterface(
  style: any,
) {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');

  return (
    <View style={{
      ...style?.style,
      ...styles.container,
      }}>
      {/* Header with user's image and name */}
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{uri: 'https://via.placeholder.com/50'}} // Replace with the actual image URI
        />
        <Text style={styles.profileName}>Jackson Lim</Text>
      </View>

      {/* Start Point Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Point</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Start Point"
          value={startPoint}
          onChangeText={setStartPoint}
        />
      </View>

      {/* End Point Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>End Point</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter End Point"
          value={endPoint}
          onChangeText={setEndPoint}
        />
      </View>

      {/* Go Button */}
      <Pressable style={styles.goButton}>
        <Text style={styles.goButtonText}>Go</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECECEC',
    padding: 20,
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontSize: 14,
  },
  goButton: {
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  goButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

