import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const IconButton = (props) =>(
    <TouchableOpacity onPress={props.onPressMenu}>
        <View>
            <Ionicons size={30} name='ios-menu' color='orange'/>
        </View>
    </TouchableOpacity>
);
export default IconButton;

