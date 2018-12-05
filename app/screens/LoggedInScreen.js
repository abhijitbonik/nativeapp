import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  AsyncStorage
} from 'react-native';
var generalStyles = require('../styles/generalStyles');
var formStyles = require('../styles/formStyles');
import { DrawerActions } from 'react-navigation';
import Header from '../components/Header'

export default class LoggedInScreen  extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} )
    AsyncStorage.getItem('login_code').then((value) => { this.setState({ 'login_code': value })} )
    AsyncStorage.getItem('password').then((value) => { this.setState({ 'password': value })} )

  }


  constructor(props) {
    super(props);

    this.state = {
      login_code: '',
      password: '',
      captcha: '',
      currLang: '',
    };
  }


  signup = () => {
    AsyncStorage.setItem('token', 'demoToken');
    this.props.navigation.navigate('LoggedInHome');
  }
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

      <Text>{this.state.login_code}</Text>
      <Text>{this.state.password}</Text>


      </View>

    );
  }
}
