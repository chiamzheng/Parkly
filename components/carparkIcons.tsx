import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Text } from '@rneui/themed';
import { useState } from 'react';

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
    onStatusChange?: (updatedStatus: { [key: string]: boolean }) => void;
}

export default function CarparkIcons({
    tooltipEnabled = true,
    buttonmode = false,
    column = false,
    features = null,
    onStatusChange,
}: CarparkIconsProps) {
    // Initialize status based on features passed in
    const [status, setStatus] = useState({
    carpark_type: features?.carpark_type === "MULTI-STOREY CAR PARK",  // Set to true if buttonMode is enabled
    carpark_system: features?.carpark_system === "ELECTRONIC PARKING", // Set to true if buttonMode is enabled
    carpark_night: features?.carpark_night !== "NO",
    carpark_basement: features?.carpark_basement !== "NO",
    carpark_gantry: features?.carpark_gantry !== 0.00,
    carpark_short: features?.carpark_short !== "NO",
    carpark_free: features?.carpark_free !== "NO",
});


    // Handle toggle action for each feature
    const handleToggle = (feature: string) => {
        setStatus(prevStatus => {
            const newStatus = { ...prevStatus, [feature]: !prevStatus[feature] };
            if (onStatusChange) {
                // Pass the entire status object back to the parent
                onStatusChange(newStatus);  // Parent updates selectedFeatures
            }
            return newStatus;
        });
    };

    return (
        <View style={column ? styles.column : styles.aligncircle}>
            <CarparkType info={status.carpark_type} toggle={() => handleToggle("carpark_type")} column={column} tooltipEnabled={tooltipEnabled} text="Multi-storey Carpark Availability" imgSrc={require("../assets/images/car-park-type.png")} buttonMode={buttonmode} />
            <PaymentSystem info={status.carpark_system} toggle={() => handleToggle("carpark_system")} column={column} tooltipEnabled={tooltipEnabled} text="E-Payment System Availability" imgSrc={require("../assets/images/parking-system.png")} buttonMode={buttonmode} />
            <BinaryFeature info={status.carpark_night} toggle={() => handleToggle("carpark_night")} column={column} tooltipEnabled={tooltipEnabled} text="Night Parking Availability" imgSrc={require("../assets/images/night-parking.png")} buttonMode={buttonmode} />
            <BinaryFeature info={status.carpark_basement} toggle={() => handleToggle("carpark_basement")} column={column} tooltipEnabled={tooltipEnabled} text="Basement Parking Availability" imgSrc={require("../assets/images/basement.png")} buttonMode={buttonmode} />
            <Gantry info={status.carpark_gantry} toggle={() => handleToggle("carpark_gantry")} column={column} tooltipEnabled={tooltipEnabled} text="Gantry Height Requirement" imgSrc={require("../assets/images/gantry-height.png")} buttonMode={buttonmode} />
            <BinaryFeature info={status.carpark_short} toggle={() => handleToggle("carpark_short")} column={column} tooltipEnabled={tooltipEnabled} text="Short Term Parking Availability" imgSrc={require("../assets/images/short-term-parking.png")} buttonMode={buttonmode} />
            <BinaryFeature info={status.carpark_free} toggle={() => handleToggle("carpark_free")} column={column} tooltipEnabled={tooltipEnabled} text="Free Parking Availability" imgSrc={require("../assets/images/free-parking.png")} buttonMode={buttonmode} />
        </View>
    );
}

const TooltipItem = ({ tooltipEnabled = true, buttonMode = false, text = 'Invalid', imgSrc, column = false, isActive, toggle }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleLongPress = () => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 1500);
    };

    const handlePress = () => {
        if (buttonMode) toggle(); // Only toggle if buttonMode is active
    };

    return (
        <View style={[column ? styles.circle1 : styles.circle2, isActive ? styles.active : styles.inactive]}>
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

const CarparkType = ({ info, tooltipEnabled, buttonMode, text, imgSrc, column, toggle }) => (
    <TooltipItem isActive={info} toggle={toggle} tooltipEnabled={tooltipEnabled} text={text} imgSrc={imgSrc} buttonMode={buttonMode} column={column} />
);

const PaymentSystem = ({ info, tooltipEnabled, buttonMode, text, imgSrc, column, toggle }) => (
    <TooltipItem isActive={info} toggle={toggle} tooltipEnabled={tooltipEnabled} text={text} imgSrc={imgSrc} buttonMode={buttonMode} column={column} />
);

const BinaryFeature = ({ info, tooltipEnabled, buttonMode, text, imgSrc, column, toggle }) => (
    <TooltipItem isActive={info} toggle={toggle} tooltipEnabled={tooltipEnabled} text={text} imgSrc={imgSrc} buttonMode={buttonMode} column={column} />
);

const Gantry = ({ info, tooltipEnabled, buttonMode, text, imgSrc, column, toggle }) => (
    <TooltipItem isActive={info} toggle={toggle} tooltipEnabled={tooltipEnabled} text={text} imgSrc={imgSrc} buttonMode={buttonMode} column={column} />
);

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
    column: {
        flexDirection: "column",
        justifyContent: 'space-between',
        minHeight: 410,
        marginBottom: 10,
    }
});
