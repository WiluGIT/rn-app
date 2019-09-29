import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import RnApp from './src/RnApp'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore();

export default class App extends Component {
  
  render(){

    return (
      <Provider store={store}>
        <RnApp />
      </Provider>

    );
  }

}


