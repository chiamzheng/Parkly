import { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import CarparkIcons from './carparkIcons';
import NotificationScreen from './Notifications'
import { getAvailableCarparkLot, getCarparkCapacity } from './Service/carparkService';
import { getNearbyCarparks } from './Service/dbCarparkService';
import { register } from './Service/dbUserAccount';
import { Linking } from 'react-native';
import { fetchCarparkAddress, fetchCarparkFeatures, fetchAvailableLots, fetchCapacity, fetchRate } from './Service/apiService';
import { ReviewBoxComponent, DisplayReviews } from './CarparkReview';

export default function CarparkSummary({ visible, carparkData, onClose, chooseCarpark, email }) {
  const [availableLots, setAvailableLots] = useState(null);
  const [capacity, setCapacity] = useState(0.00);
  const [nearbyCarparks, setNearbyCarparks] = useState(null); //test
  const [registerValue, setRegisterValue ] = useState(null); // test
  const [bigModalVisible, setBigModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const exitIcon = require("../assets/images/exit.png");
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<CarparkFeatures | null>(null);
  const [reviewBox, setReviewBox] = useState(false);
  const [newReviewAlert, setNewReviewAlert] = useState(false); // Observer Pattern !!
  const [bookmarkUpdateAlert, setBookmarkUpdateAlert] = useState(false); // Observer Pattern !!
  const [rate, setRate] = useState({
    morning_evening_motorcar_rate: 0,
    evening_morning_motorcar_rate: 0,
  });

  interface CarparkFeatures {
    carpark_type: any;
    carpark_system: any; 
    carpark_night: any;
    carpark_basement: any;
    carpark_gantry: any;
    carpark_short: any;
    carpark_free: any;
  }

  const [bookmarkIsOn, setBookmarkIsOn] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    try {
      const crpk_address = await fetchCarparkAddress(carparkData);
      setAddress(crpk_address);
    } catch (error) {
      console.error('Failed to fetch carpark address', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!carparkData) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        try {
          const lots = await fetchAvailableLots(carparkData);
          setAvailableLots(lots?.availableLots || 0);
          const cap = await fetchCapacity(carparkData);
          setCapacity(Math.round(cap?.capacity || 0));
        } catch (error) {
          console.error('Failed to fetch carpark lots', error);
        }

        try {
          const crpk_features = await fetchCarparkFeatures(carparkData);
          setFeatures(crpk_features);
        } catch (error) {
          console.error('Failed to fetch carpark features', error);
        }

        try {
          const crpk_rates = await fetchRate(carparkData);
          setRate(crpk_rates);
        } catch (error) {
          console.error('Failed to fetch carpark rates', error);
        }

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
                  <Text style={[styles.name]}>{carparkData|| 'Carpark' }</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.name, { marginBottom: 0, marginRight: 4 }]}> Capacity: <Text style={{ color: capacity >= 75 ? 'green' : capacity >= 30 ? 'orange' : 'red', }}>{capacity}%</Text> </Text>
                  <Pressable onPress={onClose}>
                    <Image source={exitIcon} style={styles.exit}/>
                  </Pressable>
                </View>
              </View>
              
              <Text style={styles.lot}>Lots Available: {availableLots}</Text>
              <Text style={styles.rate}>
                Rate: ${rate?.morning_evening_motorcar_rate === rate?.evening_morning_motorcar_rate
                  ? `${rate?.morning_evening_motorcar_rate} / hour`
                  : rate?.morning_evening_motorcar_rate < rate?.evening_morning_motorcar_rate
                  ? `${rate?.morning_evening_motorcar_rate} to $${rate?.evening_morning_motorcar_rate} / hour` 
                  : `${rate?.evening_morning_motorcar_rate} to $${rate?.morning_evening_motorcar_rate} / hour`} 
              </Text>
              <CarparkIcons features={features}/>

              <View style={[styles.nameContainer, { marginTop: 3 }]}>
                <Pressable style={styles.selectButton} onPress={() => {
                    chooseCarpark(carparkData);
                    onClose();  // Close main modal
                    
                  }}>
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
                    <Text style={styles.name}>{carparkData || 'Carpark'}</Text>
                  </View>

                        
                        <View style={{flexDirection:'row', marginRight: 10}}>
                          <NotificationScreen carparkID={carparkData}/>
                        
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
                  <DisplayReviews 
                    carparkID={carparkData} 
                    newReviewAlert={newReviewAlert}
                    setNewReviewAlert={setNewReviewAlert}
                    />
                </View>

                <TouchableOpacity 
                    style={[styles.selectButton, {alignSelf:'flex-end', marginBottom: 15, marginRight: 10}]} 
                    onPress={() => setReviewBox(true)}
                >
                    <Text style={styles.buttonText}>Leave Review</Text>
                </TouchableOpacity>

                {reviewBox && (
                  <View style={[styles.container, {marginBottom: 10}]}>
                    <Pressable onPress={() => setReviewBox(false)}>
                      <Image source={exitIcon} style={[styles.exit, {alignSelf:'flex-end', marginRight: 10}]}></Image>
                    </Pressable>
                    <ReviewBoxComponent 
                      carparkID={carparkData} 
                      setReviewBox={setReviewBox}  
                      email={email} 
                      setNewReviewAlert={setNewReviewAlert}
                    />
                  </View>
                )}



                <Text style={styles.rate}>
                  <Text style={{fontWeight: 'bold'}}>Lots available:</Text> {availableLots}{'\n'}
                  <Text style={{fontWeight: 'bold'}}>Address:</Text>{"\n"}{address}{"\n"}
                  <Text style={{fontWeight: 'bold'}}>Rates:</Text>{'\n'}
                  ${rate.morning_evening_motorcar_rate} / hour from 7am to 5pm {'\n'}
                  ${rate.evening_morning_motorcar_rate} / hour from 5pm to 7am
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <CarparkIcons column={true} tooltipEnabled={false} features={features} />
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

                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
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
                  <Text style={styles.buttonText}>Public Transport </Text>
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
    </>
  );
}

const CarparkInfo = ({ text = 'Invalid' }) => (
  <View style={{ height: 60, justifyContent: 'center', paddingRight: 50 }}>
    <Text style={{ fontSize: 15, flexWrap: 'wrap'}}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
