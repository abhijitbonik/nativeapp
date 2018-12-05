import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
var generalStyles = require('../styles/generalStyles');

const FormHeader = (props) => {
  return(
    <View style={styles.navBar}>
      <TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.rightNav}>
      <TouchableOpacity onPress={ () => props.goforward()} >
      <Icon name="md-arrow-forward" size={25} />
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    height: 25,
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 15,
    //paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftNav: {
    height: 55,
    backgroundColor: 'white',
    //elevation: 3,
    //paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  }

});

export default FormHeader
