import React, {Component} from 'react';
import {View, Image, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index';

class PlaceDetail extends Component {
    placeDeletedHandler = () =>{
        let params = this.props.navigation.state.params;
        this.props.onDeletePlace(params.key);
        this.props.navigation.goBack();
    }
    render(){
        let params = this.props.navigation.state.params;
        return(
        <View style={styles.container}>
            <View>
                <Image source ={params.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{params.name}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={this.placeDeletedHandler}>
                    <View style={styles.deleteButton}>
                        <Ionicons size={30} name='ios-trash' color='red'/>
                    </View>
                    
                </TouchableOpacity>
                <Button title="Close" onPress={this.props.onModalClosed}/>
            </View>
        </View>
        );
    }

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

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};

export default connect(null,mapDispatchToProps)(PlaceDetail);