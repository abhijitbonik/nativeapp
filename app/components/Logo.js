import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
var generalStyles = require('../styles/generalStyles');

const Logo = (props) => {
  return(
    <View style={{height:200, alignItems: 'center', elevation: 3}}>
      <Image
        style={{alignItems: 'center'}}
        source={require('../../assets/icon.png')}
      />
    </View>
  )
}

export default Logo
