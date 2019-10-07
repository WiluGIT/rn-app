import React, {Component} from 'react';
import {View, Text,Button} from 'react-native';
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
    render(){
        return(
            <View>
                <PlaceList  places={this.props.places} onItemSelected={this.itemSelectedHandler} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);