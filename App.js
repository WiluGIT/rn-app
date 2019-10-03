import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuthScreen from './screens/Auth/Auth';
import RnApp from './src/RnApp';
const store = configureStore();

const RootStack = createStackNavigator({
  Home: {
    screen: RnApp,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
      headerBackTitle: null,
      header: null
    }
  },
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      title: 'Login'
    }

  }
},
{
  initialRouteName: 'Auth',
}
);


const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  
  render(){

    return (
      <Provider store={store}>
        <AppContainer navigation={this.props.navigation} />
      </Provider>

    );
  }

}


