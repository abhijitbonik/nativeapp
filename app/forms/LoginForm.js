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
import Captcha from '../components/Captcha'
//import ReCaptcha from 'react-native-recaptcha-v3'
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class LoginForm extends React.Component {

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


  _login = () => {
    // code to send fetch request to server and store access token
    AsyncStorage.setItem('token', 'demoToken');
    this.props.navigation.navigate('LoggedInHome');
    //alert('values.password')
  }

  _reset = () => {
    this.props.navigation.navigate('ResetPassword')
  }

  _saveValues = (values) => {
    AsyncStorage.setItem('login_code', values.login_code)
    AsyncStorage.setItem('password', values.password)
    this.setState({ 'login_code': values.registration_id })
    this.setState({ 'password': values.password })
  }


  _handleSubmit = (values) => {
    /*
    // add onPress={handleSubmit} in login button
    this._saveValues(values)
    //this._login(values);
    //alert(JSON.stringify(values.email))
    this._login()
    */
    this._saveValues(values);
    // code to send fetch request to server and store access token
    this._login();
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
      <Header header={I18n.t('login_title')} toggleLang={this._toggleLang}  />
      <DismissKeyBoard>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',}}>
      <Formik
        enableReinitialize
        initialValues={{login_code: this.state.login_code, password: this.state.password, captcha: this.state.captcha}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          login_code: Yup.string()
            .required('Please enter login code')
            .min(10, 'Minimum 10 characters is required')
            .max(10, 'Maximum 10 characters are allowed'),
            //.matches(/^[A-Za-z \.]+$/, 'Must be alphabets'),
          password: Yup.string()
            .min(6, 'Minimum 6 characters is required')
            .max(15, 'Maximum 15 characters are allowed')
            .required('Please enter a passord'),
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
              label={I18n.t('login_code')}
              placeholder='Enter Login Code'
              value={values.login_code}
              //value={this.state.registration_id}  //error__ value becomes non-changeable
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='login_code'
              error={touched.login_code && errors.login_code}
            />
            <Input
              label={I18n.t('login_pass')}
              placeholder='Enter Password'
              secureTextEntry
              value={values.password}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='password'
              error={touched.password && errors.password}
            />
            <View style={{flexDirection: 'row'}}>
                <Text style={{padding: 20}}> {I18n.t('login_forgot_pass')}</Text>
                <TouchableOpacity style={{
                  width: 100,
                  backgroundColor: '#ff7043',
                  borderRadius: 15,
                  paddingVertical: 12,
                  marginVertical: 10,
                  alignItems: 'center',}} onPress={this._reset} >
                <Text >Reset</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
            <Captcha />
            </View>

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
              <Text style={formStyles.buttonText}>Login</Text>
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
