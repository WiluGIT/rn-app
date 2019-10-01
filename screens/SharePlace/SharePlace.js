import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import PlaceInput from '../../src/components/PlaceInput/PlaceInput';
import {addPlace} from '../../store/actions/index';
class SharePlaceScreen extends Component {

    placeAddedHandler = placeName =>{
        this.props.onAddPlace(placeName);
    }
    
    
    render(){
        return(
            <View>
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
            </View>
        );
    }
}

const mapDispatchToProops = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};
export default connect(null,mapDispatchToProops)(SharePlaceScreen);