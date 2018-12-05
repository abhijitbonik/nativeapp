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
//import Pdf from 'react-native-pdf';
export default class DocSamples extends React.Component {
  _header = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  }
  _logout =() =>{
    // remove session from AsyncStorage
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('IndexPage')
  }
  render() {
    //const source = {uri:'http://10.129.155.100:8084/kvs/proforma/Format%20Self%20Declaration%20Distance%20Between%20School%20And%20Residence.pdf',cache:true};
    return (
      <View style={generalStyles.container}>

      <Header onPress={this._header} onLogout={this._logout}/>

        <Text> Test DocSamplese </Text>

      </View>
    );
  }
}
