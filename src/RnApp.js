import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {connect} from 'react-redux';
import {addPlace, deletePlace, selectPlace, deselectPlace} from '../store/actions/index';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FindPlaceScreen from '../screens/FindPlace/FindPlace';
import SharePlaceScreen from '../screens/SharePlace/SharePlace';


const TabNavigator = createBottomTabNavigator({
  SharePlace: SharePlaceScreen,
  FindPlace: FindPlaceScreen,
});
const AppContainer = createAppContainer(TabNavigator);

class RnApp extends Component {

  placeAddedHandler= placeName =>{
   this.props.onAddPlace(placeName);
  };
  placeSelectedHandler = key =>{
    this.props.onSelectPlace(key);

  };
  placeDeletedHandler = () =>{
    this.props.onDeletePlace();
  };
  ModalClosedHandler = () =>{
    this.props.onDeselectPlace();
  };

  render(){

    return (
        <AppContainer/>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }, 
 
});

const mapStateToProps = state =>{
    return{
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (name) => dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: () => dispatch(deselectPlace())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RnApp);