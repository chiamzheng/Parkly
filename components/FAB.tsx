import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
  } from 'react-native-reanimated';
import { StyleSheet, View, Pressable, Image,Modal,Alert,Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
const exitIcon = require("../assets/images/exit.png");
const OFFSET = 60; // Distance to move FABs when expanded

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
  
export default function FAB() {
    const [time, setTime] = React.useState(new Date());
    const [time1, setTime1] = React.useState(new Date());
    const [timeVis, setTimeVis] = React.useState(false); 
    const [timeVis1, setTimeVis1] = React.useState(false); 
    const showTime = () => {
        setTimeVis(!timeVis);
      };  
      const showTime1 = () => {
        setTimeVis1(!timeVis1);
      }; 
      const handleConfirm = () => {
        console.warn("A date has been picked: ", time);
        showTime();
      };
      const handleConfirm1 = () => {
        console.warn("A date has been picked: ", time1);
        showTime();
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
            Alert.alert('close durataion');
            setDurationVisible(!durationVisible);
            }}>
               <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.toprow}> 
                            <Text>Set Parking Duration</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setDurationVisible(!durationVisible)}>
                                <Image source={exitIcon} style={styles.exit}/>
                            </Pressable>
                        </View>
                        <View>
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
                                <Text>{time.toLocaleTimeString()}</Text>
                            </Pressable>
                            <Text>To</Text>
                            <Pressable style={styles.time} onPress={showTime1}>
                                <Text>{time1.toLocaleTimeString()}</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                </View> 
            </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={featureVisible}
          onRequestClose={() => {
            Alert.alert('close features');
            setFeatureVisible(!featureVisible);
          }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.toprow}>
                        <Text>Select Carpark Features</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setFeatureVisible(!featureVisible)}>
                            <Image source={exitIcon} style={styles.exit}/>
                        </Pressable>
                    </View>
                </View>
            </View> 
          </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={radiusVisible}
          onRequestClose={() => {
            Alert.alert('close radius');
            setDurationVisible(!radiusVisible);
          }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.toprow}>
                        <Text>Set Radius:</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setRadiusVisible(!radiusVisible)}>
                            <Image source={exitIcon} style={styles.exit}/>
                        </Pressable>
                    </View>
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
        //margin: 20,
        backgroundColor: '#DDD5D5',
        borderRadius: 20,
        //padding: 35,
        alignItems: 'center',
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
        flexDirection:"row",
        flexWrap:"nowrap",
      },
      time:{
        borderRadius:25,
        borderColor:"black",
        width:100,
        height:100,
      },
  });
  