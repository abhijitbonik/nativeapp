import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
  AsyncStorage,
  PanResponder,
  Keyboard
} from 'react-native';
import DatePicker from 'react-native-datepicker';
var formStyles = require('../styles/formStyles');
var generalStyles = require('../styles/generalStyles');
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from '../components/Input'
import DismissKeyBoard from '../components/DismissKeyBoard'
import Header from '../components/Header'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';

export default class Form5 extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} );
  }

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      mobile_number: '',
      date: '',
      birthdate: '',
      registration_id: '',
      email: '',
      currLang: '',
    };
  }

  _signup = (values) => {
    // code to send fetch request to server and store access token
    this.props.navigation.navigate('LoggedInHome');
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

  _header = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  }
  _logout =() =>{
    // remove session from AsyncStorage
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('IndexPage')
  }

  _saveValues = (values) => {
    AsyncStorage.setItem('first_name', values.first_name)
    AsyncStorage.setItem('middle_name', values.middle_name)
    AsyncStorage.setItem('last_name', values.last_name)
    AsyncStorage.setItem('email', values.email)
    AsyncStorage.setItem('birthdate', values.birthdate)
    AsyncStorage.setItem('mobile_number', values.mobile_number)
    AsyncStorage.setItem('password', values.password)
    //this.setState({ 'registration_id': values.registration_id })
    //this.setState({ 'email': values.email })
    //this.setState({ 'birthdate': values.birthdate })
    //alert(JSON.stringify('save_check'))
  }

  _handleSubmit = (values) => {
    this._saveValues(values);
    this._signup(values);
  }

  render() {
    return (
      <View>
      <Header header='5/5 Basic Information' onPress={this._header} onLogout={this._logout} toggleLang={this._toggleLang}  />
      <ScrollView>

      <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 10}}>
      <Text > Declaration Page</Text>
      </View>

      
      </ScrollView>
      </View>
    );
  }
}
