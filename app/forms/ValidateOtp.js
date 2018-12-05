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
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard,
  Picker
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
import Header from '../components/Header2'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';


export default class ValidateOtp extends React.Component {

  componentDidMount = () => {
    AsyncStorage.setItem('mobile_number', '9876543210')
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} )
    AsyncStorage.getItem('mobile_number').then((value) => {
      var num1 = Math.floor(value/10000000);
      var num2 = value%1000;
      var num = num1 + '****' + num2;
      this.setState({ 'num': num })
      this.setState({ 'mobile_number': value })

    })
  }


  constructor(props) {
    super(props);

    this.state = {
      mobile_number: '',
      num: '',
      urlx:'',
    };
  }


  _validateotp = (values) => {
    // code to send fetch request to server and store access token
    //AsyncStorage.setItem('token', 'demoToken');
    this.props.navigation.navigate('LoggedInHome');
    //alert('values.password')
  }

  _saveValues = (values) => {
    //AsyncStorage.setItem('login_code', values.login_code)
    //AsyncStorage.setItem('password', values.password)
    //this.setState({ 'login_code': values.registration_id })
    //this.setState({ 'password': values.password })
  }


  _handleSubmit = (values) => {
    /*
    // add onPress={handleSubmit} in login button
    this._saveValues(values)
    //this._login(values);
    //alert(JSON.stringify(values.email))
    this._login()
    */
    //this._saveValues(values);
    // code to send fetch request to server and store access token
    this._validateotp(values);
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

  render() {
    return (
      <View>
      <Header header={I18n.t('validateotp.header')} toggleLang={this._toggleLang}  />
      <DismissKeyBoard>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '90%',}}>

        <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 10, elevation: 3, width:400}}>
        <Text style={{padding: 15}} > {I18n.t('validateotp.instr1')} {this.state.num} {I18n.t('validateotp.instr2')}</Text>
        </View>

      <Formik
        enableReinitialize
        initialValues={{otp: ''}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          otp: Yup.string()
            .min('Minimum 6 characters is required')
            .max('Maximum 6 characters are allowed')
            .required('Please enter otp'),
        })}
        render = {({
            values,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid,
          }) =>(
          <React.Fragment>
            <Input
              label={I18n.t('validateotp.label1')}
              placeholder='Enter OTP'
              value={values.otp}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='otp'
              error={touched.otp && errors.otp}
            />
            <View style={{flexDirection: 'row'}}>
                <Text style={{padding: 20}}> {I18n.t('validateotp.label2')}</Text>
                <TouchableOpacity style={{
                  width: 100,
                  backgroundColor: '#ff7043',
                  borderRadius: 15,
                  paddingVertical: 12,
                  marginVertical: 10,
                  alignItems: 'center',}} onPress={handleSubmit} >
                <Text >Resend OTP</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={formStyles.button} onPress={handleSubmit} >
              <Text style={formStyles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      />


      {
        /*

        //########## Picker Example
        <View style={{borderWidth:1, borderRadius:5 }}>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 370 }}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Select Value" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        </View>
        */
      }



      {/*
        <TouchableOpacity style={formStyles.button}
          onPress={() => this.props.navigation.navigate('SignUpStack')}
          disabled={false}
        >
          <Text style={formStyles.buttonText}>Register</Text>
        </TouchableOpacity>
        */}
      </View>
      </DismissKeyBoard>
      </View>
    );
  }
}
