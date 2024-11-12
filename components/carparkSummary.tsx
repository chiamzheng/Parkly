import { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import CarparkIcons from './carparkIcons';
import NotificationScreen from './Notifications'
import { getAvailableCarparkLot, getCarparkCapacity } from './Service/carparkService';
import { getNearbyCarparks } from './Service/dbCarparkService';
import { register } from './Service/dbUserAccount';
import CarparkReviews from './CarparkReviews';
import { Linking } from 'react-native';
import ReviewScreen from './review_popup';
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
  const [loading, setLoading] = useState(false); // Loading state
  interface CarparkFeatures {
    carpark_type: any;
    carpark_system: any; 
    carpark_night: any;
    carpark_basement: any;
    carpark_gantry: any;
    carpark_short: any;
    carpark_free: any;
  }
  const [features, setFeatures] = useState<CarparkFeatures | null>(null);
  
  //status for notification and bookmark icons
  const [bookmarkIsOn, setBookmarkIsOn] = useState(false);

  const handlePress = async () => {
    setLoading(true);
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
    setLoading(false);
  };


  useEffect(() => {
    if (!carparkData) return;
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const lots = await fetchAvailableLots(carparkData?.car_park_no);
        setAvailableLots(lots?.availableLots || 0);
        const cap = await fetchCapacity(carparkData?.car_park_no);
        setCapacity(cap?.capacity || 0);
      } catch (error) {
        console.error('Failed to fetch lots', error);
      } finally {
        setLoading(false);
      }

      /*test calling nearby Carparks*/
      const destination = { latitude: 1.321572, longitude: 103.884496 };
      const nearbycp = await getNearbyCarparks(destination, 1000);
      setNearbyCarparks(nearbycp); // data from function is correct and is being fetched properly, need to handle storage of returned data 
      // i think its not being set properly and you get null instead because it takes time for response to be returned

      /*test register*/ 
      const regist = await register('jamir.tanpw@gmail.com','123456TESTING*');
      setRegisterValue(regist);
      console.log(registerValue) //same issue

    };

    fetchData();
}, [carparkData]);


  return (
    <>
    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#645689"/>
      </View>
    ) : (
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
                  <Text style={[styles.name, { marginBottom: 0, marginRight: 4 }]}> Capacity: <Text style={{ color: capacity >= 75 ? 'green' : capacity >= 30 ? 'orange' : 'red', }}>{capacity}%</Text> </Text>
                  <Pressable onPress={onClose}>
                    <Image source={exitIcon} style={styles.exit}/>
                  </Pressable>
                </View>
              </View>
              
              <Text style={styles.lot}>Lots Available: {availableLots}</Text>
              <Text style={styles.rate}>Rate: ${carparkData?.morningtoevening_0700to1700_motorcars_rate||0}/hour</Text>
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
            </View>
        </View>
      </Modal>
    )}

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
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#645689"/>
            </View>
          ) : (
            <View style={styles.bigbox}>
              <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={[styles.exit, { width: 30, height: 30 }]} source={require("../assets/images/location_icon.png")}/>
                    <Text style={styles.name}>{carparkData?.car_park_no || 'Carpark'}</Text>
                  </View>

                        
                        <View style={{flexDirection:'row', marginRight: 10}}>
                          <NotificationScreen carparkID={carparkData?.car_park_no}/>
                        
                          <TouchableOpacity onPress={() => setBookmarkIsOn(!bookmarkIsOn)}>
                            <Image
                              source={
                                bookmarkIsOn
                                  ? require('../assets/images/bookmark_on.png') 
                                  : require('../assets/images/bookmark_off.png') 
                              }
                              style={{ width: 30, height: 30, marginRight: 10}}
                            />
                          </TouchableOpacity>
                        
                          <Pressable onPress={() => {setBigModalVisible(!bigModalVisible) }}>
                            <Image source={require("../assets/images/return.png")} style={[styles.exit, {width: 30,height: 30}]}/>
                          </Pressable>
                        </View>
                      </View>

                <View style={styles.reviewBox}>
                  <Text style={{ fontSize: 15, marginTop: 3, marginBottom: 7 }}>Reviews:</Text>
                  <CarparkReviews/>
                </View>

                <Pressable 
                    style={[styles.selectButton, {alignSelf:'flex-end', marginBottom: 10, marginRight: 10}]} 
                    onPress={() => {setReviewModalVisible(true); 
                    setBigModalVisible(false);
                    }}
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
                    <CarparkInfo text={`Short Term Parking: ${features?.carpark_short}`} />
                    <CarparkInfo text={`Free Parking: ${features?.carpark_free}`} />
                  </View>
                </View>

                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 30, marginBottom: 10 }}>
                  Guide to my destination:
                </Text>

                <View style={[styles.nameContainer, { marginRight: 10 }]}>
                <Pressable 
                  style={[styles.selectButton, { flexDirection: 'row', borderRadius: 15, width: 60 }]}
                  onPress={() => {
                    Linking.openURL('grab://')
                      .catch(() => {
                        // Open the Grab website if the app isn't available
                        Linking.openURL('https://play.google.com/store/apps/details?id=com.grabtaxi.passenger');
                      });
                  }}>
                  <Image style={[styles.exit, { marginRight: 2, tintColor: 'white', width: 20, height: 20 }]} source={require("../assets/images/taxi.png")}/>
                  <Text style={styles.buttonText}>Taxi</Text>
                </Pressable>
                <Pressable 
                  style={[styles.selectButton, { padding: 13, flexDirection: 'row', borderRadius: 15, width: 150, justifyContent: "space-between" }]}
                  onPress={() => {
                    Linking.openURL('citymapper://')
                      .catch(() => {
                        Linking.openURL('https://play.google.com/store/apps/details?id=com.citymapper.app.release');
                      });
                  }}>
                  <Image style={[styles.exit, { tintColor: 'white', width: 20, height: 20 }]} source={require("../assets/images/public-transport.png")}/>
                  <Text style={styles.buttonText}>Public Transport</Text>
                </Pressable>
                <Pressable 
                  style={[styles.selectButton, { flexDirection: 'row', borderRadius: 15, width: 60 }]}
                  onPress={() => {
                    Linking.openURL('citymapper://')
                      .catch(() => {
                        Linking.openURL('https://play.google.com/store/apps/details?id=com.citymapper.app.release');
                      });
                    }}>
                    <Image style={[styles.exit, { tintColor: 'white', width: 20, height: 20 }]} source={require("../assets/images/walk.png")}/>
                    <Text style={styles.buttonText}>Walk</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>

      {/* Review Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reviewModalVisible}
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.boxLayout}>
          <ReviewScreen style={styles.reviewPopup} />
        </View>
      </Modal>
    </>
  );
}

const CarparkInfo = ({ text = 'Invalid' }) => (
  <View style={{ height: 60, justifyContent: 'center', paddingRight: 50 }}>
    <Text style={{ fontSize: 15, flexWrap: 'wrap'}}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  selectButton: {
    width: 120,
    height: 40,
    marginTop: 5,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#645689",
    justifyContent: 'center',
    alignItems: 'center',
  },
  lot: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 5,
  },    
  exit: {
    width: 23,
    height: 23,
  },
  boxLayout: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  box: {
    width: 330,
    height: 240,
    backgroundColor: "#DDD4D5",
    borderRadius: 20,
    padding: 20,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rate: {
    fontSize: 20,
  },
  bigbox: {
    width: 330,
    height: 700,
    backgroundColor: "#DDD4D5",
    borderRadius: 20,
    padding: 15,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  reviewBox: {
    width: 280,
    height: 200,
    padding: 7,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  reviewPopup: {
    width: '90%',
    height: '90%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingContainer: {
    position: 'absolute',
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
