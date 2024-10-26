import {View, Image, StyleSheet} from 'react-native';
import { Tooltip, Text, lightColors} from '@rneui/themed';
import {useState} from 'react';

type TooltipProps = React.ComponentProps<typeof Tooltip> & {
    children?: React.ReactNode;
};

const ControlledTooltip: React.FC<TooltipProps> = (props) => {
    const [open, setOpen] = useState(false);
    return (
      <Tooltip
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        backgroundColor= 'white'
        withPointer={true}
        {...props}
      />
    );
  };

export default function CarparkIcons({flexDirection='row', alignItems='center', width=30, height=30, tooltipEnabled = true}) {
    const circlewidth = width + 10;
    const circleheight = height + 10;

    return (
        <View style={[style.aligncircle, { flexDirection: flexDirection as 'row', alignItems: alignItems as 'center' }]}>

            <View style={[style.circle, {width: circlewidth, height: circleheight}]}>
                {tooltipEnabled ? (
                    <ControlledTooltip popover={<Text>Carpark Type</Text>}>
                        <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/car-park-type.png")}/>
                    </ControlledTooltip>
                ) : (
                    <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/car-park-type.png")}/>
                )}
            </View>
            <View style={[style.circle, {width: circlewidth, height: circleheight}]}>
                {tooltipEnabled ? (
                    <ControlledTooltip popover={<Text>Payment System</Text>}>
                        <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/parking-system.png")}/>
                    </ControlledTooltip>
                ) : (
                    <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/parking-system.png")}/>
                )}
            </View>
            <View style={[style.circle, {width: circlewidth, height: circleheight}]}>
                {tooltipEnabled ? (
                    <ControlledTooltip popover={<Text>Night Parking</Text>}>
                        <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/night-parking.png")}/>
                    </ControlledTooltip>
                ) : (
                    <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/night-parking.png")}/>
                )}
            </View>
            <View style={[style.circle, {backgroundColor: '#DF6C70'}]}>
                {tooltipEnabled ? (
                    <ControlledTooltip popover={<Text>Basement Parking</Text>}>
                        <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/basement.png")}/>
                    </ControlledTooltip>
                ) : (
                    <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/basement.png")}/>
                )}
            </View>
            <View style={[style.circle, {width: circlewidth, height: circleheight}]}>
                {tooltipEnabled ? (
                    <ControlledTooltip popover={<Text>Gantry Height</Text>}>
                        <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/gantry-height.png")}/>
                    </ControlledTooltip>
                ) : (
                    <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/gantry-height.png")}/>
                )}
            </View>
            <View style={[style.circle, {backgroundColor: '#DF6C70'}]}>
                {tooltipEnabled ? (
                    <ControlledTooltip popover={<Text>Short Term Parking</Text>}>
                        <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/short-term-parking.png")}/>
                    </ControlledTooltip>
                ) : (
                    <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/short-term-parking.png")}/>
                )}
            </View>
            <View style={[style.circle, {width: circlewidth, height: circleheight}]}>
                {tooltipEnabled ? (
                    <ControlledTooltip popover={<Text>Free Parking</Text>}>
                        <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/free-parking.png")}/>
                    </ControlledTooltip>
                ) : (
                    <Image resizeMode='contain' style={{width: width, height: height}} source={require("../assets/images/free-parking.png")}/>
                )}
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
