/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import movieReducers from './src/reducers/movieReducers.js';


// Screens
import DetailsScreen from './src/components/DetailsScreen';
import HomeScreen from './src/components/HomeScreen'

const initialState = []
const store = createStore(movieReducers);

const Stack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: 'Home',
  }
)


type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});
