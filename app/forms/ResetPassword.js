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


export default class ResetPassword extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} )
  }


  constructor(props) {
    super(props);

    this.state = {
      mobile_number: '',
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
      <Header header={I18n.t('reset.header')} toggleLang={this._toggleLang}  />
      <DismissKeyBoard>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '90%',}}>

      <Formik
        enableReinitialize
        initialValues={{otp:'', password:'', confirm_password:'', captcha:'',}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          otp: Yup.string()
            .min(6, 'Minimum 6 characters is required')
            .max(6, 'Maximum 6 characters are allowed')
            .required('Please enter otp'),
            password: Yup.string()
              .required()
              .min(6,'Minimum 6 characters is required')
              .max(15,'Maximum 15 characters are allowed'),
            confirm_password: Yup.string()
              .min(6,'Minimum 6 characters is required')
              .max(15,'Maximum 15 characters are allowed')
              .oneOf([Yup.ref('password', null)], 'Please enter correct password')
              .required('Please enter a valid password to confirm'),
            captcha: Yup.string()
              .required('Please enter captcha code shown above')
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
          <Input
            label={I18n.t('reset.pass')}
            placeholder='Password'
            secureTextEntry
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            name='password'
            error={touched.password && errors.password}
          />
          <Input
            label={I18n.t('reset.confirmpass')}
            placeholder='Confirm Password'
            secureTextEntry
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            name='confirm_password'
            error={touched.confirm_password && errors.confirm_password}
          />
          <TouchableOpacity style={{height:50, width:'50%', backgroundColor: 'grey', alignItems:'center', justifyContent:'center', padding: 20, marginTop: 15}}>
          <Text >'Place for Captcha'</Text>
          </TouchableOpacity>
          <Input
            label={I18n.t('login_captcha_code')}
            placeholder='Enter The Code Shown Above'
            value={values.captcha}
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            name='captcha'
            error={touched.captcha && errors.captcha}
          />
          <Text>Letters are case sensitive.</Text>


            <TouchableOpacity style={formStyles.button} onPress={handleSubmit} >
              <Text style={formStyles.buttonText}>Submit</Text>
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
