import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView,Image } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import MainText from '../../src/components/UI/MainText/MainText';
import HeadingText from '../../src/components/UI/HeadingText/HeadingText';
import PlaceInput from '../../src/components/PlaceInput/PlaceInput';
import PickImage from '../../src/components/PickImage/PickImage';
import PickLocation from '../../src/components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {
    state={
        placeName: ""
    }
    placeNameChangedHandler = val =>{
        this.setState({
            placeName:val
        })
    }

    placeAddedHandler = () => {
        if(this.state.placeName.trim()!==""){
            this.props.onAddPlace(this.state.placeName);

        }
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText><HeadingText>Share a place with us!</HeadingText></MainText>
                    <PickImage/>
                    <PickLocation/>
                    <PlaceInput placeName={this.state.placeName} 
                    onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button title='Share the place' onPress={this.placeAddedHandler}/>
                    </View>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems: 'center'
    },
    button: {
        margin: 8
    },
});

const mapDispatchToProops = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};
export default connect(null, mapDispatchToProops)(SharePlaceScreen);