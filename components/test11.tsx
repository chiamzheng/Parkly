import { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import CarparkIcons from './carparkIcons';
import NotificationScreen from './Notifications'
import { getAvailableCarparkLot, getCarparkCapacity } from './Service/carparkService';
import { getNearbyCarparks } from './Service/dbCarparkService';
import { register } from './Service/dbUserAccount';
import CarparkReviews from './CarparkReviews';
import { Linking } from 'react-native';
import ReviewScreen from '../app/review_popup';
import { fetchCarparkAddress, fetchCarparkFeatures, fetchAvailableLots, fetchCapacity} from './Service/apiService';

export default function CarparkSummary({ visible, carparkData, onClose }) {
  const [availableLots, setAvailableLots] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [notifIsOn, setNotifIsOn] = useState(false);
  const [nearbyCarparks, setNearbyCarparks] = useState(null); //test
  const [registerValue, setRegisterValue ] = useState(null); // test
  const [bigModalVisible, setBigModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const exitIcon = require("../assets/images/exit.png");
  const [address,setAddress] = useState(null)
  const [features, setFeatures] = useState(null);

  const [loading, setLoading] = useState(true); // Loading state

  const handlePress = async () => {
    try {
      const crpk_address = await fetchCarparkAddress(carparkData?.car_park_no);
      setAddress(crpk_address);
    } catch (error) {
      console.error('Failed to fetch address', error);
    }

    try {
      const crpk_features = await fetchCarparkFeatures(carparkData?.car_park_no);
      setFeatures(crpk_features);
    } catch (error) {
      console.error('Failed to fetch features', error);
    }
  };

  useEffect(() => {
    if (!carparkData) return;

    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        const lots = await fetchAvailableLots(carparkData?.car_park_no);
        setAvailableLots(lots?.availableLots || 0);
        const cap = await fetchCapacity(carparkData?.car_park_no);
        setCapacity(cap?.capacity || 0);

        /* Test calling nearby Carparks */
        const destination = { latitude: 1.321572, longitude: 103.884496 };
        const nearbycp = await getNearbyCarparks(destination, 1000);
        setNearbyCarparks(nearbycp);

        /* Test register */ 
        const regist = await register('jamir.tanpw@gmail.com','123456TESTING*');
        setRegisterValue(regist);
        
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [carparkData]);

  return (
    <>
      {/* Main Carpark Summary Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.boxLayout}>
          <View style={styles.box}>
            <View style={[styles.nameContainer, { marginTop: 5 }]}> 
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 30, height: 30, marginRight: 5}} source={require("../assets/images/location_icon.png")}/>
                <Text style={[styles.name]}>{carparkData?.car_park_no || 'Carpark' }</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.name, { marginBottom: 0, marginRight: 4 }]}> Capacity: 
                  <Text style={{ color: capacity >= 75 ? 'green' : capacity >= 50 ? 'orange' : 'red' }}>
                    {capacity} %
                  </Text> 
                </Text>
                <Pressable onPress={onClose}>
                  <Image source={exitIcon} style={styles.exit}/>
                </Pressable>
              </View>
            </View>
            
            {/* Display Loading Spinner or Carpark Details */}
            {loading ? (
              <ActivityIndicator size="large" color="#645689" />
            ) : (
              <>
                <Text style={styles.lot}>Lots Available: {availableLots}</Text>
                <Text style={styles.rate}>Rate: ${carparkData?.morningtoevening_0700to1700_motorcars_rate || 0}/hour</Text>
                <CarparkIcons />

                <View style={[styles.nameContainer, { marginTop: 3 }]}>
                  <Pressable style={styles.selectButton}>
                    <Text style={styles.buttonText}>Select carpark</Text>
                  </Pressable>
                  <Pressable
                    style={styles.selectButton}
                    onPress={() => {
                      setBigModalVisible(true);
                      onClose();  // Close main modal
                      handlePress(); // Call all functions for info in big modal
                    }}
                  >
                    <Text style={styles.buttonText}>See More Details</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Big Modal for More Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bigModalVisible}
        onRequestClose={() => {
          setBigModalVisible(!bigModalVisible);
          onClose();  // Ensure main modal closes as well
        }}
      >
        <View style={styles.boxLayout}>
          <View style={styles.bigbox}>
            <ScrollView>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={[styles.exit, { width: 30, height: 30 }]} source={require("../assets/images/location_icon.png")}/>
                  <Text style={styles.name}>{carparkData?.car_park_no || 'Carpark'}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <NotificationScreen carparkID={carparkData?.car_park_no}/>
                  <TouchableOpacity onPress={() => setBookmarkIsOn(!bookmarkIsOn)}>
                    <Image
                      source={
                        bookmarkIsOn
                          ? require('../assets/images/bookmark_on.png') 
                          : require('../assets/images/bookmark_off.png') 
                      }
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                  <Pressable onPress={() => { setBigModalVisible(!bigModalVisible) }}>
                    <Image source={require("../assets/images/return.png")} style={[styles.exit, { width: 30, height: 30 }]} />
                  </Pressable>
                </View>
              </View>

              <View style={styles.reviewBox}>
                <Text style={{ fontSize: 15, marginTop: 3, marginBottom: 7 }}>Reviews:</Text>
                <CarparkReviews />
              </View>

              <Pressable 
                style={[styles.selectButton, { alignSelf: 'flex-end', marginBottom: 10, marginRight: 10 }]} 
                onPress={() => { setReviewModalVisible(true); setBigModalVisible(false); }}
              >
                <Text style={styles.buttonText}>Leave Review</Text>
              </Pressable>

              <Text style={styles.rate}>
                Address: {address}{"\n"}
                Lots available: {availableLots}{'\n'}
                Parking fees: {'\n'}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CarparkIcons column={true} tooltipEnabled={false} />
                <View style={{ marginLeft: 10 }}>
                  <CarparkInfo text={`Carpark Type: ${features?.carpark_type}`} />
                  <CarparkInfo text={`Payment System: ${features?.carpark_system}`} />
                  <CarparkInfo text={`Night Parking: ${features?.carpark_night}`} />
                  <CarparkInfo text={`Basement Parking: ${features?.carpark_basement}`} />
                  <CarparkInfo text={`Gantry Height: ${features?.carpark_gantry} METRES`} />
                  <CarparkInfo text="Short Term Parking:" />
                  <CarparkInfo text={`Free Parking: ${features?.carpark_free}`} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  boxLayout: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  box: { backgroundColor: '#FFF', padding: 20, width: 300, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  exit: { width: 25, height: 25 },
  lot: { fontSize: 16 },
  rate: { fontSize: 16 },
  selectButton: { backgroundColor: '#645689', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#FFF' },
  reviewBox: { marginBottom: 15 },
  bigbox: { backgroundColor: '#FFF', margin: 20, borderRadius: 10, padding: 20 },
  reviewButton: { backgroundColor: '#645689', padding: 10, borderRadius: 5, marginTop: 10 },
  nameContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  selectButton: { backgroundColor: '#645689', padding: 10, borderRadius: 5 },
});

const CarparkInfo = ({ text }) => (
  <Text style={{ fontSize: 14, marginBottom: 5 }}>{text}</Text>
);
