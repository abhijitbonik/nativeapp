import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  AsyncStorage,
  Alert
} from 'react-native';
var generalStyles = require('../styles/generalStyles');
var formStyles = require('../styles/formStyles');
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation';
import Logo from '../components/Logo'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';

export default class PostRegister  extends React.Component {

  componentDidMount = async () => {
    //await AsyncStorage.setItem('login_code', 'default')
    await AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} );
    await AsyncStorage.getItem('login_code').then((value) => { this.setState({ 'login_code': value })} );
    
  }

  constructor(props) {
    super(props);
    this.state = {
      token:'',
      login_code:'',
      currLang:'',
    };
  }

  signup = () => {
    AsyncStorage.setItem('token', 'demoToken');
    this.props.navigation.navigate('LoggedInHome');
  }


  render() {
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',}}>
        
        <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', alignItems: 'center',margin: 20, elevation: 3, }}>
        <Text style={{paddingHorizontal: 15, paddingVertical: 5,alignItems: 'center',}} >Your Login Code is </Text>
        <Text style={{paddingHorizontal: 15, paddingVertical: 5, fontWeight:'bold',alignItems: 'center',}} >{this.state.login_code}</Text>
        </View>

        <TouchableOpacity style={formStyles.button} onPress={() => this.props.navigation.navigate('LoginForm')} >
          <Text style={formStyles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>


    );
  }
}
