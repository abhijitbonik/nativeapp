import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  AsyncStorage
} from 'react-native';

import { DrawerActions } from 'react-navigation';
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';
var generalStyles = require('../styles/generalStyles');

export default class Instructions extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} );
  }

  constructor(props) {
    super(props);

    this.state = {
      currLang: '',
      temp: '',
    };
  }


  _header = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  }
  _logout =() =>{
    // remove session from AsyncStorage
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('IndexPage')
  }
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

  _currLang = AsyncStorage.getItem('lang');

  render() {
    return (
      <View style={generalStyles.container}>

      <Header onPress={this._header} onLogout={this._logout} toggleLang={this._toggleLang}/>
        <Text> Test Instructions </Text>
        <Text> {I18n.t('info_cannot_be_modified_note')} </Text>
        <Text>{this.state.temp}</Text>
        <Text>{this.state.currLang}</Text>
      </View>
    );
  }
}
