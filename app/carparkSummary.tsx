import {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image, ScrollView} from 'react-native';
import CarparkIcons from './carparkIcons';

export default function CarparkSummary() {
  const [modalVisible, setModalVisible] = useState(false);
  const [bigModalVisible, setBigModalVisible] = useState(false);
  const exitIcon = require("../assets/images/exit.png");

  return (
    <View style={styles.centerView}>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>carpark</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.boxLayout}>
          <View style={styles.box}>
        
            <Pressable style={styles.exitLayout} onPress={() =>setModalVisible(!modalVisible)}>
              <Image source={exitIcon} style={styles.exit}/>
            </Pressable>

            <View style={styles.nameContainer}>
              <Text style={styles.name}>JM23</Text>
              <Text style={styles.name}>Capacity: 88%</Text>
            </View>

            <Text style={styles.lot}>Lots Available: 40</Text>
            <Text style={styles.rate}>Rate: $1.12/hour</Text>

            <CarparkIcons/>

            <View style={styles.nameContainer}>
              <Pressable style={styles.selectButton}>
                <Text style={styles.buttonText}>Select carpark</Text>
              </Pressable>
              <Pressable 
                style={styles.selectButton}
                onPress={() => {setBigModalVisible(true),setModalVisible(false)}}
              >
                  <Text style={styles.buttonText}>See More Details</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
           animationType="slide"
           transparent={true}
           visible={bigModalVisible}
           onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!bigModalVisible);
           }}
      >
          <View style={styles.boxLayout}>
                <View style={styles.bigbox}>
                  <Pressable style={styles.exitLayout} onPress={() => {setBigModalVisible(!bigModalVisible), setModalVisible(!modalVisible)}}>
                    <Image source={exitIcon} style={styles.exit}/>
                  </Pressable>

                  <ScrollView>
                    <View style={{
                      flexDirection:'row', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: 15
                    }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image style={[styles.exit, {width: 30, height:30}]} source={require("../assets/images/location_icon.png")}/>
                        <Text style={styles.name}>JM23</Text>
                      </View>

                      
                      <View style={{flexDirection:'row', marginRight: 10}}>
                        <Image style={[styles.exit, {width: 30, height:30}]} source={require("../assets/images/notification_off.png")}/>
                        <Image style={[styles.exit, {width: 30, height:30}]} source={require("../assets/images/bookmark_off.png")}/>
                      </View>
                    </View>

                    <View style={styles.reviewBox}>
                        <Text style={{fontSize:15, marginLeft:10, marginTop:7}}>
                          Reviews:
                        </Text>
                    </View>
                    
                    <Text style={styles.rate}>
                      Address: {'\n'}
                      Lots available: {'\n'}
                      Parking fees: {'\n'}
                    </Text>
                    
                    <View style={{flexDirection:'row', alignItems: 'center'}}>
                      <CarparkIcons 
                        flexDirection='column' 
                        alignItems='flex-start' 
                        width={40} 
                        height={40}
                      />

                    <View style={{marginLeft: 10}}>
                        <View style={{height: 60, justifyContent: 'center'}}>
                          <Text style={{fontSize: 15}}>Carpark Type:</Text>
                        </View>
                        <View style={{height: 60, justifyContent: 'center'}}>
                          <Text style={{fontSize: 15}}>Payment System:</Text>
                        </View>
                        <View style={{height: 60, justifyContent: 'center'}}>
                          <Text style={{fontSize: 15}}>Night Parking:</Text>
                        </View>
                        <View style={{height: 60, justifyContent: 'center'}}>
                          <Text style={{fontSize: 15}}>Basement Parking:</Text>
                        </View>
                        <View style={{height: 60, justifyContent: 'center'}}>
                          <Text style={{fontSize: 15}}>Gantry Height:</Text>
                        </View>
                        <View style={{height: 60, justifyContent: 'center'}}>
                          <Text style={{fontSize: 15}}>Short Term Parking:</Text>
                        </View>
                        <View style={{height: 60, justifyContent: 'center'}}>
                          <Text style={{fontSize: 15}}>Free Parking:</Text>
                        </View>
                      </View>
  
                    </View>

                    <Text style={{fontSize:17, fontWeight:"bold", marginTop:30, marginBottom:10}}>
                      Guide to my destination:
                    </Text>

                    <View style={[styles.nameContainer, {marginRight: 10}]}>
                      <Pressable style={[styles.selectButton, {flexDirection: 'row', borderRadius: 15, width:60}]}>
                        <Image style={[styles.exit, {marginRight: 2, tintColor: 'white', width: 20, height: 20}]} source={require("../assets/images/taxi.png")}/>
                        <Text style={styles.buttonText}>Taxi</Text>
                      </Pressable>

                      <Pressable style={[styles.selectButton, {padding: 13, flexDirection: 'row', borderRadius: 15, width:150, justifyContent:"space-between"}]}>
                        <Image style={[styles.exit, {tintColor: 'white', width: 20, height: 20}]} source={require("../assets/images/public-transport.png")}/>
                        <Text style={styles.buttonText}>Public Transport</Text>
                      </Pressable>

                      <Pressable style={[styles.selectButton, {flexDirection: 'row', borderRadius: 15, width:60}]}>
                        <Image style={[styles.exit, {tintColor: 'white', width: 20, height: 20}]} source={require("../assets/images/walk.png")}/>
                        <Text style={styles.buttonText}>Walk</Text>
                      </Pressable>
                    </View>
                  </ScrollView>

                </View>
            </View>

      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  reviewBox: {
    width: 270,
    height: 200,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    alignSelf: 'center',
    marginBottom: 20,
    marginRight: 10,
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
  rate: {
    fontSize: 20,
  },
  lot: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 5,
  },    
  exitLayout: {
    alignSelf: 'flex-end',
  },
  exit: {
    width: 23,
    height: 23,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
