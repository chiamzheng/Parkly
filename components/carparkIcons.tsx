import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Text } from '@rneui/themed';
import { useEffect, useState } from 'react';

interface CarparkFeatures {
    carpark_type: any;
    carpark_system: any; 
    carpark_night: any;
    carpark_basement: any;
    carpark_gantry: any;
    carpark_short: any;
    carpark_free: any;
}
  
interface CarparkIconsProps {
    tooltipEnabled?: boolean;
    buttonmode?: boolean;
    column?: boolean;
    features?: CarparkFeatures | null;
}
  
export default function CarparkIcons({
    tooltipEnabled = true,
    buttonmode = false,
    column = false,
    features = null,
    }: CarparkIconsProps) {
    
    return (
        <View style={column? styles.column : styles.aligncircle}>
            <CarparkType info={features?.carpark_type} column={column} tooltipEnabled={tooltipEnabled} text="Multi-storey Carpark Availability" imgSrc={require("../assets/images/car-park-type.png")} buttonMode={buttonmode} />
            <PaymentSystem info={features?.carpark_system} column={column} tooltipEnabled={tooltipEnabled} text="E-Payment System Availability" imgSrc={require("../assets/images/parking-system.png")} buttonMode={buttonmode} />
            <BinaryFeature info={features?.carpark_night} column={column} tooltipEnabled={tooltipEnabled} text="Night Parking Availability" imgSrc={require("../assets/images/night-parking.png")} buttonMode={buttonmode} />
            <BinaryFeature info={features?.carpark_basement} column={column} tooltipEnabled={tooltipEnabled} text="Basement Parking Availability" imgSrc={require("../assets/images/basement.png")} buttonMode={buttonmode} />
            <Gantry info={features?.carpark_gantry} column={column} tooltipEnabled={tooltipEnabled} text="Gantry Height Requirement" imgSrc={require("../assets/images/gantry-height.png")} buttonMode={buttonmode} />
            <BinaryFeature info={features?.carpark_short} column={column} tooltipEnabled={tooltipEnabled} text="Short Term Parking Availability" imgSrc={require("../assets/images/short-term-parking.png")} buttonMode={buttonmode} />
            <BinaryFeature info={features?.carpark_free} column={column} tooltipEnabled={tooltipEnabled} text="Free Parking Availability" imgSrc={require("../assets/images/free-parking.png")} buttonMode={buttonmode} />
        </View>
    )
}


const TooltipItem = ({ tooltipEnabled = true, buttonMode = false, text = 'Invalid', imgSrc, column = false, styleActive = styles.active}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    //const [active, setActive] = useState(initialActive);

    const handleLongPress = () => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 1500); // Tooltip visible for 1.5 seconds
    };

    //const handlePress = () => {
    //    if (buttonMode) {
    //        setActive(!active); // Toggle the active state if in buttonMode
    //    }
    //};

    return (
        <View style={[column ? styles.circle1 : styles.circle2, styleActive]}>
            {/*<Pressable onLongPress={handleLongPress} onPress={handlePress}>*/}
            <Pressable onLongPress={handleLongPress}>
                <Image resizeMode="contain" style={[column ? styles.image1 : styles.image2]} source={imgSrc} />
            </Pressable>
            {tooltipEnabled && showTooltip && (
                <View style={styles.tooltipContainer}>
                    <Text style={styles.tooltipText}>{text}</Text>
                </View>
            )}
        </View>
    );
};

const CarparkType = ({info, tooltipEnabled = true, buttonMode = false, text = 'Invalid', imgSrc, column = false}) => {
    const active = "MULTI-STOREY CAR PARK"; 
    const shapeStyle = info === active ? styles.active : styles.inactive;

    return (
        <TooltipItem styleActive={shapeStyle} column={column} tooltipEnabled={tooltipEnabled} text={text} imgSrc={imgSrc} buttonMode={buttonMode}/>
    );
};

const PaymentSystem = ({info, tooltipEnabled = true, buttonMode = false, text = 'Invalid', imgSrc, column = false}) => {
    const active = "ELECTRONIC PARKING"; 
    const shapeStyle = info === active ? styles.active : styles.inactive;

    return (
        <TooltipItem styleActive={shapeStyle} column={column} tooltipEnabled={tooltipEnabled} text={text} imgSrc={imgSrc} buttonMode={buttonMode}/>
    );
};

const BinaryFeature = ({info, tooltipEnabled = true, buttonMode = false, text = 'Invalid', imgSrc, column = false}) => {
    const inactive = "NO"; 
    const shapeStyle = info === inactive ? styles.inactive : styles.active;

    return (
        <TooltipItem styleActive={shapeStyle} column={column} tooltipEnabled={tooltipEnabled} text={text} imgSrc={imgSrc} buttonMode={buttonMode}/>
    );
};

//Color is red if gantry height is 0.00 m
const Gantry = ({info, tooltipEnabled = true, buttonMode = false, text = 'Invalid', imgSrc, column = false}) => {
    const shapeStyle = info === 0.00 ? styles.inactive : styles.active;

    return (
        <TooltipItem styleActive={shapeStyle} column={column} tooltipEnabled={tooltipEnabled} text={text} imgSrc={imgSrc} buttonMode={buttonMode}/>
    );
};


const styles = StyleSheet.create({
    circle1: {
        marginTop: 10,
        borderRadius: 50,
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        width: 50,
        height: 50,
    },
    circle2: {
        marginTop: 10,
        borderRadius: 50,
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    aligncircle: {
        justifyContent: 'space-between',
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tooltipContainer: {
        position: 'absolute',
        top: -60,
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        minWidth: 100,
        zIndex: 10,
        elevation: 10,
    },
    tooltipText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 12,
    },
    image1: {
        width: 40,
        height: 40,
    },
    image2: {
        width: 30,
        height: 30,
    },
    active: {
        backgroundColor: "#AFCED2",
    },
    inactive: {
        backgroundColor: "#DF6C70",
    },
    column:{
        flexDirection:"column",
        justifyContent: 'space-between',
        minHeight:410,
        marginBottom: 10,
        //alignItems: "center",
        //alignContent:"space-between",
        //height:"auto",
    }
});
