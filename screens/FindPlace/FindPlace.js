import React, {Component} from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import PlaceList from '../../src/components/PlaceList/PlaceList';


class FindPlaceScreen extends Component {
    itemSelectedHandler=key =>{
        const selPlace = this.props.places.find(place=>{
            return place.key=== key;
        });
        let dataSend = selPlace;
        this.props.navigation.navigate('Place',dataSend);
    };
    state={
        placeLoaded: false
    }

    placesSearchHandler = () => {
        this.setState({
            placeLoaded:true
        });
    }
    render(){
        let content =(
            <TouchableOpacity onPress={this.placesSearchHandler}>
                <View style={styles.searchButton}>
                    <Text styles={styles.searchButtonText}>Find Places</Text>
                </View>
            </TouchableOpacity>
        );
        if(this.state.placeLoaded){
            content=(
                <PlaceList  places={this.props.places} onItemSelected={this.itemSelectedHandler} />
            );
        }
        return(
            <View style={this.state.placeLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles= StyleSheet.create({
    buttonContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    searchButton:{
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText:{
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
});
const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);