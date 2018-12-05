import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  WebView
} from 'react-native';

var generalStyles = require('../styles/generalStyles');
var formStyles = require('../styles/formStyles');
import InstructionWebView from '../components/InstructionWebView'
import Header from '../components/Header2'

export default class Faq extends React.Component {

  render() {
    return (
      <View style={generalStyles.container}>

      <Header header = 'Instructions' />

        <InstructionWebView url='https://www.youtube.com/channel/UC_iD8-SP3RO8o0Urbjcn6Mw' />

      </View>
    );
  }
}
