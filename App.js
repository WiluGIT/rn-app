import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import RnApp from './src/RnApp';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthScreen from './screens/Auth/Auth'

const store = configureStore();

const RootStack = createStackNavigator({
  Home: RnApp,
  Auth: AuthScreen,
},
{
  initialRouteName: 'Home',
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


