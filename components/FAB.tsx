import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
  } from 'react-native-reanimated';
import { StyleSheet, View, Pressable, Image,Modal,Alert,Text } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import CarparkIcons from './carparkIcons';
import ScrollPicker from "react-native-wheel-scrollview-picker";
const exitIcon = require("../assets/images/exit.png");
const OFFSET = 60; // Distance to move FABs when expanded
const radiusDropdown = [
  {
    value: '100',
    label: '100m',
  },
  {
    value: '200',
    label: '200m',
  },
  {
    value: '500',
    label: '500m',
  },
  {
    value: '1000',
    label: '1 Km',
  },
  {
    value: '2000',
    label: '2 Km',
  },
  {
    value: '5000',
    label: '5 Km',
  },
];

const FloatingActionButton = ({ isExpanded, index, imgsrc,setModalVisible,modalVisible }) => {
    const animatedStyles = useAnimatedStyle(() => {
    const translateY = isExpanded.value ? -OFFSET * index : 0; // Move FAB up when expanded
    const opacity = isExpanded.value ? 1 : 0; // Fully visible when expanded
  
      return {
        transform: [{ translateY: withSpring(translateY) }],
        opacity: withTiming(opacity, { duration: 200 }), // Smooth opacity transition
      };
    });
  
    return (
      <Animated.View style={[animatedStyles, styles.fabButton]}>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Image source={imgsrc} />
        </Pressable>
      </Animated.View>
    );
};
  
export default function FAB({returnRadius,returnDuration,returnRate,returnFeature}) {
  const [radius, setRadius] = React.useState(1000);
  const [time, setTime] = React.useState(new Date());
  const [time1, setTime1] = React.useState(new Date());
  const [timeVis, setTimeVis] = React.useState(false); 
  const [timeVis1, setTimeVis1] = React.useState(false); 
  const [dollar, setDollar] = React.useState(2);
  const [cent, setCent] = React.useState(0);
  const [selectedFeatures, setSelectedFeatures] = React.useState({
    carpark_type: false,
    carpark_system: false,
    carpark_night: false,
    carpark_basement: false,
    carpark_gantry: false,
    carpark_short: false,
    carpark_free: false,

});
  const showTime = () => {
    setTimeVis(!timeVis);
  };  
  const showTime1 = () => {
    setTimeVis1(!timeVis1);
  }; 
  const handleConfirm = (selectedTime) => {
    setTime(selectedTime)
    showTime();
  };
  const handleConfirm1 = (selectedTime1) => {
    setTime1(selectedTime1)
    showTime1();
  };
  const applyDuration=() => {
    setDurationVisible(!durationVisible);
    returnDuration([time,time1]);
    returnRate(dollar+(0.1*cent));
  };
  const applyFeature=() => {
    setFeatureVisible(!featureVisible);
    returnFeature(selectedFeatures);
  };
  const applyRadius=() => {
    setRadiusVisible(!radiusVisible);
    returnRadius(radius);
  };
  const isExpanded = useSharedValue(false); // State to track if FAB is expanded
  const containerHeight = useSharedValue(60); // Initial height of the FAB container
  const [durationVisible, setDurationVisible] = React.useState(false);
  const [featureVisible, setFeatureVisible] = React.useState(false);
  const [radiusVisible, setRadiusVisible] = React.useState(false);
  const handlePress = () => {
    isExpanded.value = !isExpanded.value; // Toggle the expanded state
    containerHeight.value = isExpanded.value ? 60 :245; // Update the height based on expanded state
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(containerHeight.value, { duration: 300 }), // Smooth height transition
    };
  });
  
    return (
    <View style={styles.entirecontainer}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={durationVisible}
            onRequestClose={() => {
            setDurationVisible(!durationVisible);
            }}>
               <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.toprow}> 
                            <Text style={styles.text}>Set Parking Duration:</Text>
                            <Pressable
                                onPress={() => setDurationVisible(!durationVisible)}>
                                <Image source={exitIcon} style={styles.exit}/>
                            </Pressable>
                        </View>
                        <View style={styles.row}>
                            <DateTimePickerModal
                                isVisible={timeVis}
                                mode="time"
                                onConfirm={handleConfirm}
                                onCancel={showTime}
                            />
                            <DateTimePickerModal
                                isVisible={timeVis1}
                                mode="time"
                                onConfirm={handleConfirm1}
                                onCancel={showTime1}
                            />
                            <Pressable style={styles.time} onPress={showTime}>
                                <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
                            </Pressable>
                            <Text style={styles.textTo}>to</Text>
                            <Pressable style={styles.time} onPress={showTime1}>
                              <Text>{time1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
                            </Pressable>
                        </View>
                        <Text style={styles.text}>Set Max Average Rate:</Text>
                        <View style={styles.row}>
                          <Text style={styles.text}>$ </Text>
                          <View style={styles.scrollpicker}>
                            <ScrollPicker
                                  dataSource={[0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                  selectedIndex={0}
                                  renderItem={(data) => (
                                      <Text>{data}</Text>
                                  )}
                                  onValueChange={(data, selectedIndex) => {
                                      setDollar(data)
                                      console.log("Selected Dollar:", dollar);
                                  }}
                                  wrapperHeight={40}
                                  wrapperBackground="#D9D9D9"
                                  itemHeight={40}
                                  highlightColor="#d8d8d8"
                                  highlightBorderWidth={0}
                              />
                          </View>
                          <Text style={styles.textdot}>.</Text>
                          <View style={styles.scrollpicker}>
                            <ScrollPicker
                                  dataSource={[0,10, 20, 30, 40, 50, 60, 70, 80, 90]}
                                  selectedIndex={0}
                                  renderItem={(data) => (
                                    <Text>{data === 0 ? "0" : ''}{data}</Text>
                                )}
                                  onValueChange={(data, selectedIndex) => {
                                      setCent(data)
                                      console.log("Selected Cent:", cent);
                                  }}
                                  wrapperHeight={40}
                                  wrapperBackground="#D9D9D9"
                                  itemHeight={40}
                                  highlightColor="#d8d8d8"
                                  highlightBorderWidth={0}
                              />
                          </View>
                          <Text style={styles.text}>/hour</Text>
                        </View>
                        <Pressable style={styles.applybutton} onPress={applyDuration}>
                          <Text style={styles.apply}>Apply</Text>
                        </Pressable>
                    </View>
                </View> 
            </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={featureVisible}
          onRequestClose={() => {
            setFeatureVisible(!featureVisible);
          }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.toprow}>
                        <Text style={styles.text}>Select Carpark Features:</Text>
                        <Pressable
                            onPress={() => setFeatureVisible(!featureVisible)}>
                            <Image source={exitIcon} style={styles.exit}/>
                        </Pressable>
                    </View>
                    <CarparkIcons buttonmode={true} onStatusChange={setSelectedFeatures}/>
                    <Pressable style={styles.applybutton} onPress={applyFeature}>
                      <Text style={styles.apply}>Apply</Text>
                    </Pressable>
                </View>
            </View> 
          </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={radiusVisible}
          onRequestClose={() => {
            setRadiusVisible(!radiusVisible);
          }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.toprow}>
                        <Text style={styles.text}>Set Radius:</Text>
                        <Pressable
                            onPress={() => setRadiusVisible(!radiusVisible)}>
                            <Image source={exitIcon} style={styles.exit}/>
                        </Pressable>
                    </View>
                    <SelectCountry
                      style={styles.dropdown}
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholderStyle={styles.placeholderStyle}
                      imageStyle={styles.imageStyle}
                      iconStyle={styles.iconStyle}
                      maxHeight={200}
                      value={radius}
                      data={radiusDropdown}
                      valueField="value"
                      labelField="label"
                      imageField="image"
                      placeholder="Select Radius"
                      searchPlaceholder="Search..."
                      onChange={e => {
                        setRadius(e.value);
                      }}
                    />
                    <Pressable style={styles.applybutton} onPress={applyRadius}>
                      <Text style={styles.apply}>Apply</Text>
                    </Pressable>
                </View>
            </View> 
          </Modal>
      <Animated.View style={[styles.FABContainer, animatedContainerStyle]}>
        <Pressable onPress={handlePress} style={[styles.shadow, styles.mainFAB]}>
          <Image source={require('../assets/images/Sliders.png')} />
        </Pressable>
  
        <FloatingActionButton
          isExpanded={isExpanded}
          index={1}
          imgsrc={require('../assets/images/Star.png')}
          setModalVisible={setFeatureVisible}
          modalVisible={featureVisible}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={2}
          imgsrc={require('../assets/images/price.png')}
          setModalVisible={setDurationVisible}
          modalVisible={durationVisible}
        />
        <FloatingActionButton
          isExpanded={isExpanded}
          index={3}
          imgsrc={require('../assets/images/Target.png')}
          setModalVisible={setRadiusVisible}
          modalVisible={radiusVisible}
        />
      </Animated.View>
      </View>
    );
}




const styles = StyleSheet.create({
    entirecontainer: {
        position: 'absolute',
        bottom:0,
        left:0,
      },
    mainFAB: {
      width: 60,
      height: 60,
      backgroundColor: '#6B5293',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      elevation: 2,
      zIndex: 2,
    },
    FABContainer: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#CFC5DF',
      borderRadius: 30,
      elevation: 0,
      zIndex: 0,
    },
    fabButton: {
      width: 60,
      height: 60,
      backgroundColor: '#CFC5DF',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 60, // Adjust spacing between buttons
      elevation: 1,
      zIndex: 1,
    },
    shadow: {
      shadowColor: '#171717',
      shadowOffset: { width: -0.5, height: 3.5 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        //marginVertical: 30,
        backgroundColor: '#DDD5D5',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        shadowColor: '#000',
        width:300,
        flexDirection:"column",
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      exit: {
        width: 23,
        height: 23,
      },
      toprow:{
        width:300,
        flexDirection:"row",
        flexWrap:"nowrap",
        alignItems:"center",
        justifyContent:"space-between",
        paddingRight:20,
      },
      time:{
        borderRadius:15,
        borderColor:"black",
        width:120,
        height:50,
        borderWidth:3,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#D9D9D9"
      },
      row:{
        flexDirection:"row",
        alignItems:"center",
      },
      text:{
        fontWeight:'500',
        fontSize:16,
        marginVertical:10,
        alignSelf:"flex-start",
        paddingLeft:20,
      },
      textTo:{
        fontWeight:'500',
        fontSize:16,
        marginVertical:10,
        marginHorizontal:10,
      },
      apply:{
        fontWeight:'500',
        fontSize:14,
        marginVertical:8,
        marginHorizontal:10,
        color:"white",
      },
      applybutton:{
        marginTop:10,
        backgroundColor:"#6B5293",
        borderRadius:20,
        width:80,
        alignItems:'center',
        justifyContent:"center",
      },
      dropdown: {
        margin: 16,
        height: 50,
        width: 150,
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
      },
      imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      scrollpicker:{
        width:40,
        height:40,
        borderRadius: 6,
        borderColor:"black",
        borderWidth:3,
      },
      textdot:{
        fontWeight:'700',
        fontSize:16,
        marginVertical:10,
        alignSelf:"flex-start",
        paddingLeft:5,
        paddingRight:5,
      },
  });
  