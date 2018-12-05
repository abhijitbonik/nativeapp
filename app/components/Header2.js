import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
var generalStyles = require('../styles/generalStyles');

const Header = (props) => {
  return(
    <View style={styles.navBar}>
      <View style={styles.leftNav}>
        <Text style={{fontWeight: 'bold'}}> {props.header} </Text>
      </View>
      <View style={styles.rightNav}>
      <View style={{paddingHorizontal: 10}}>
      <TouchableOpacity onPress={ () => props.toggleLang()} >
      <Icon name="md-swap" size={25} />
      </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    //height: '15',
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftNav: {
    height: 55,
    backgroundColor: 'white',
    //elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5
  }

});

export default Header
