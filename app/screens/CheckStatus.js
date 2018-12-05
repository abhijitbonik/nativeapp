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
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header'
var generalStyles = require('../styles/generalStyles');

export default class CheckStatus extends React.Component {
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

      <View>
        <Text> Test CheckStatus </Text>
      </View>

      </View>
    );
  }
}
