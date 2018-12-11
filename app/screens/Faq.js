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

  _toggleLang = () => {
    //this.state.currLang = AsyncStorage.getItem('lang');
    AsyncStorage.getItem('lang').then((value) => {
      if(value == 'en') {
        this.setState({ 'currLang': 'hin' });
      } else if(value == 'hin') {
        this.setState({ 'currLang': 'en' });
      } else {
        this.setState({'currLang': 'hin'});
      }
      AsyncStorage.setItem('lang', this.state.currLang);
    }).then(setLocale(this.state.currLang))
  }

  render() {
    return (
      <View style={generalStyles.container}>
      <Header header = 'Instructions' toggleLang={this._toggleLang} />
        <InstructionWebView url='http://10.129.75.249/kvs/faq.html' />
      </View>
    );
  }
}
