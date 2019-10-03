import React from 'react';
import {View, Image, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const placeDetailScreen = props =>{
    let params = props.navigation.state.params;
    return(
        <View style={styles.container}>
            <View>
                <Image source ={params.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{params.name}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={props.onItemDeleted}>
                    <View style={styles.deleteButton}>
                        <Ionicons size={30} name='ios-trash' color='red'/>
                    </View>
                    
                </TouchableOpacity>
                <Button title="Close" onPress={props.onModalClosed}/>
            </View>
        </View>
    );
    
};

const styles= StyleSheet.create({
    container:{
        margin:22
    },
    placeImage:{
        width:"100%",
        height: "30%"
  },
  placeName:{
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
  },
  deleteButton:{
      alignItems:"center"
  }
});

export default placeDetailScreen;