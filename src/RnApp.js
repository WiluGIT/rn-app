import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {connect} from 'react-redux';
import {addPlace, deletePlace, selectPlace, deselectPlace} from '../store/actions/index';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import FindPlaceScreen from '../screens/FindPlace/FindPlace';
import SharePlaceScreen from '../screens/SharePlace/SharePlace';
import PlaceDetail from '../screens/PlaceDetail/PlaceDetail';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideDrawer from '../screens/SideDrawer/SideDrawer';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../src/components/IconButton';

const HomeStack = createStackNavigator({
  FindPlace:{
    screen:FindPlaceScreen,
    navigationOptions:({navigation})=>({  
      headerLeft: <IconButton  onPressMenu={()=>navigation.openDrawer()} />
    })
  } ,
  Place: PlaceDetail, 

},
{
  initialRouteName: 'FindPlace',
});

const DrawerNav = createDrawerNavigator({
  Find:{
    screen: HomeStack,
    navigationOptions:{
      drawerLabel: 'Home'
    }
  },
  Drawer:{
    screen: SideDrawer,
    navigationOptions:({navigation})=>({
      drawerLabel: 'Side Drawer',
     
      
      headerLeft: <IconButton  onPressMenu={()=>navigation.openDrawer()} />
    })
  },
  
},
{
  drawerPosition:'left',
  initialRouteName: 'Find'
}

);

const TabNavigator = createBottomTabNavigator({
  FindPlace: {
    screen: DrawerNav,
    
  },
  SharePlace: SharePlaceScreen,
},
{
  defaultNavigationOptions:({navigation}) => ({
    tabBarIcon: ({focused, horizontal,tintColor})=>{
      const {routeName} = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if(routeName==='FindPlace'){
        iconName='md-map';
        
      }else if(routeName==='SharePlace'){
        iconName='md-share-alt';
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />
    },
  }),
  initialRouteName: 'FindPlace'
}
);

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
        <AppContainer />
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