import {View, Image, StyleSheet} from 'react-native';

export default function CarparkIcons({flexDirection='row', alignItems='center', width=30, height=30}) {
    const circlewidth = width + 10;
    const circleheight = height + 10;

    return (
        <View style={[style.aligncircle, { flexDirection: flexDirection as 'row', alignItems: alignItems as 'center' }]}>

            <View style={[style.circle, {width: circlewidth, height: circleheight}]}>
                <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/car-park-type.png")}/>
            </View>
            <View style={[style.circle,]}>
                <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/parking-system.png")}/>
            </View>
            <View style={[style.circle,]}>
                <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/night-parking.png")}/>
            </View>
            <View style={[[style.circle,], {backgroundColor: '#DF6C70'}]}>
                <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/basement.png")}/>
            </View>
            <View style={[style.circle,]}>
                <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/gantry-height.png")}/>
            </View>
            <View style={[[style.circle,], {backgroundColor: '#DF6C70'}]}>
                <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/short-term-parking.png")}/>
            </View>
            <View style={[style.circle,]}>
                <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/free-parking.png")}/>
            </View>
        </View>
    );
};

const style= StyleSheet.create({
    circle: {
        marginTop: 10,
        borderRadius: 50, 
        padding: 5,
        backgroundColor: '#AFCED2', 
    },
    aligncircle: {
        justifyContent: 'space-between', 
        marginBottom: 8,
    },
});