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
  PanResponder,
  AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker';
var formStyles = require('../styles/formStyles');
var generalStyles = require('../styles/generalStyles');
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: ''
    };
  }

  _login = () => {
    // code to send fetch request to server and store access token
    AsyncStorage.setItem('token', 'demoToken');
    this.props.navigation.navigate('LoggedInHome');
  }

  render() {
    return (
      <View style={generalStyles.center_align}>
      <Text>Login</Text>
      <View style={{margin: 15}} >
        <TextInput style={formStyles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Enrolment ID'
          placeholderTextColor='#dedede'
        />
        <TextInput style={formStyles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Registered email address'
          placeholderTextColor='#dedede'
        />
        <DatePicker
          style={formStyles.date}
          date={this.state.date}
          mode="date"
          placeholder="Date of Birth of child"
          //placeholderTextColor='red'
          format="DD-MM-YYYY"
          minDate="01-01-2011"
          maxDate="01-01-2013"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"


          onDateChange={(date) => {this.setState({date: date})}}
        />
        <TouchableOpacity style={formStyles.button} onPress={this._login} >
          <Text style={formStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={formStyles.button} onPress={() => this.props.navigation.navigate('SignUpStack')} >
          <Text style={formStyles.buttonText}>Register</Text>
        </TouchableOpacity>


      </View>
      </View>
    );
  }
}
