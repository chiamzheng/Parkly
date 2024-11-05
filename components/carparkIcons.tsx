import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Text } from '@rneui/themed';
import { useState } from 'react';
import * as carpark_read from '../backend/src/repository/database_access/read database/carpark_read'

export default function CarparkIcons({
    tooltipEnabled = true,
    buttonmode = false,
    type = true,
    payment = true,
    night = true,
    basement = false,
    height = true,
    short = false,
    free = true,
    column = false,
    carparkID = 'Unknown Carpark',
}) {

    const crpk_type = carpark_read.read_carpark_type(carparkID);
    const crpk_system = carpark_read.read_parking_system_type(carparkID);
    
    // // example code of how to use read_carpark_rate
// async function main(){
//     const [morn_eve, eve_morn, morn_night, night_morn] = await read_carpark_rate("ACB");
//     console.log(morn_eve,eve_morn,morn_night, night_morn);
// }; 


    return (
        <View style={column?styles.column:styles.aligncircle}>
            <TooltipItem column={column} tooltipEnabled={tooltipEnabled} text="Carpark Type" imgSrc={require("../assets/images/car-park-type.png")} buttonMode={buttonmode} initialActive={type} />
            <TooltipItem column={column} tooltipEnabled={tooltipEnabled} text="Payment System" imgSrc={require("../assets/images/parking-system.png")} buttonMode={buttonmode} initialActive={payment} />
            <TooltipItem column={column} tooltipEnabled={tooltipEnabled} text="Night Parking" imgSrc={require("../assets/images/night-parking.png")} buttonMode={buttonmode} initialActive={night} />
            <TooltipItem column={column} tooltipEnabled={tooltipEnabled} text="Basement Parking" imgSrc={require("../assets/images/basement.png")} buttonMode={buttonmode} initialActive={basement} />
            <TooltipItem column={column} tooltipEnabled={tooltipEnabled} text="Gantry Height" imgSrc={require("../assets/images/gantry-height.png")} buttonMode={buttonmode} initialActive={height} />
            <TooltipItem column={column} tooltipEnabled={tooltipEnabled} text="Short Term Parking" imgSrc={require("../assets/images/short-term-parking.png")} buttonMode={buttonmode} initialActive={short} />
            <TooltipItem column={column} tooltipEnabled={tooltipEnabled} text="Free Parking" imgSrc={require("../assets/images/free-parking.png")} buttonMode={buttonmode} initialActive={free} />
        </View>
    );
}

const TooltipItem = ({ tooltipEnabled = true, initialActive = true, buttonMode = false, text = 'Invalid', imgSrc, column = false}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [active, setActive] = useState(initialActive);

    const handleLongPress = () => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 1500); // Tooltip visible for 1.5 seconds
    };

    const handlePress = () => {
        if (buttonMode) {
            setActive(!active); // Toggle the active state if in buttonMode
        }
    };

    return (
        <View style={[column ? styles.circle1 : styles.circle2, active ? styles.active : styles.inactive]}>
            <Pressable onLongPress={handleLongPress} onPress={handlePress}>
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
