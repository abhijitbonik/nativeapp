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
import Header from '../components/Header'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';


export default class ResetPassword extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} )
      AsyncStorage.getItem('login_code').then((value) => { this.setState({ 'login_code': value })} )
  }


  constructor(props) {
    super(props);

    this.state = {
      login_code:'',
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

  render() {
    return (
      <View>
      <Header header={I18n.t('changepass.header')} onPress={this._header} onLogout={this._logout} toggleLang={this._toggleLang} />
      <DismissKeyBoard>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '90%',}}>
      <ScrollView>
      <View style={{alignItems: 'center'}}>
      <Formik
        enableReinitialize
        initialValues={{login_code:'',current_password:'', password:'', confirm_password:'', captcha:'',}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          login_code: Yup.string()
            .required('Please enter login code')
            .min(10, 'Minimum 10 characters is required')
            .max(10, 'Maximum 10 characters are allowed'),
            //.matches(/^[A-Za-z \.]+$/, 'Must be alphabets'),
          current_password: Yup.string()
            .required('Please enter a password')
            .min(6, 'Minimum 6 characters is required')
            .max(15,'Maximum 15 characters are allowed'),
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
            label={I18n.t('login_code')}
            placeholder='Enter Login Code'
            value={this.state.login_code}
            //value={this.state.registration_id}  //error__ value becomes non-changeable
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            name='login_code'
            error={touched.login_code && errors.login_code}
          />
          <Input
            label={I18n.t('changepass.currpass')}
            placeholder='Current Password'
            value={values.current_password}
            secureTextEntry
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            name='current_password'
            error={touched.current_password && errors.current_password}
          />
          <Input
            label={I18n.t('reg_pass')}
            placeholder='Password'
            value={values.password}
            secureTextEntry
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            name='password'
            error={touched.password && errors.password}
          />
          <Input
            label={I18n.t('reg_confirm_pass')}
            placeholder='Confirm Password'
            value={values.confirm_password}
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
      </View>
      </ScrollView>

      </View>
      </DismissKeyBoard>
      </View>
    );
  }
}
