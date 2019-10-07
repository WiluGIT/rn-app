import React from 'react';
import {View, TouchableOpacity,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const IconButton = (props) =>(
    <TouchableOpacity onPress={props.onPressMenu} style={styles.container}>
        <View>
            <Ionicons size={30} name='ios-menu' color='orange'/>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container:{
        marginLeft: 22,
    }
});
export default IconButton;

