import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import { DrawerActions } from 'react-navigation';
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
var generalStyles = require('../styles/generalStyles');

export default class PrintApplication extends React.Component {
  _header = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  }
  _logout =() =>{
    // remove session from AsyncStorage
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('IndexPage')
  }
  render() {
    return (
      <View style={generalStyles.container}>

      <Header onPress={this._header} onLogout={this._logout}/>

        <Text> Test PrintApplication </Text>
      </View>
    );
  }
}
