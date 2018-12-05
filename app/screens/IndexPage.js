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

export default class IndexScreen  extends React.Component {

  componentDidMount = () => {
    currLang = AsyncStorage.getItem('lang');
    if (currLang!=null) {
      setLocale(currLang);
    } else {
      AsyncStorage.setItem('lang', 'hin');
    }

    AsyncStorage.getItem('lang').then((value) => {
      if(value !=null) {
        setLocale(value);
      } else {
        AsyncStorage.setItem('lang', 'hin');
        setLocale('hin');
      }
    })

    AsyncStorage.getItem('token').then((value) => {
      if(value ==null) {
        this.props.navigation.navigate('IndexPage');
      } else {
        if (value=='demoToken') {
          this.props.navigation.navigate('LoggedInHome');
        } else {
          this.props.navigation.navigate('IndexPage')
        }
      }
      this.setState({'token':value})
    })
    //sync token by calling fetch and checking its valid and not expired
  }

  constructor(props) {
    super(props);
    this.state = {
      token:'',
    };
  }

  signup = () => {
    AsyncStorage.setItem('token', 'demoToken');
    this.props.navigation.navigate('LoggedInHome');
  }


  render() {
    return (
      <View style={generalStyles.center_align}>
        <Logo />
        <Text>{this.state.token}</Text>
        <TouchableOpacity style={formStyles.button} onPress={() => {
          Alert.alert(
            'Instructions',
            "You are required to carefully go through the instructions given below, scroll down to the bottom of the page and accept that you have gone through the instructions and that you will abide by all terms and conditions as per KVS admission guidelines. Then click on the Proceed button to complete your registration. The instructions given below can also be accessed while filling up with admission form.",
            [
              {
                text: 'I Agree',
                //onPress: () => console.log('OK Pressed')
              },
            ],
            { cancelable: false }
          )
          this.props.navigation.navigate('SignUpStack')
        }} >
          <Text style={formStyles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={formStyles.button} onPress={() => this.props.navigation.navigate('LoginForm')} >
          <Text style={formStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>


    );
  }
}
