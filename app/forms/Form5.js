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
      <Text > {I18n.t('signup_instr1')}</Text>
      <Text > {I18n.t('signup_instr2')}</Text>
      <Text > {I18n.t('signup_instr3')}</Text>
      </View>

      <DismissKeyBoard>
      <View style={generalStyles.center_align}>
      <Formik
        initialValues={{first_name: '', middle_name: '', last_name: '', email: '', birthdate: '', mobile_number: ''}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          first_name: Yup.string()
            .required(),
          middle_name: Yup.string()
              .required(),
          last_name: Yup.string()
                .required(),
          email: Yup.string()
            .email()
            .required(),
          birthdate: Yup.date()
            .required(),
          mobile_number: Yup.number()
              .required(),
          password: Yup.string()
              .required()
              .min(6),
          confirm_password: Yup.string()
              .oneOf([Yup.ref('password', null)], 'Passwords Must Match')
              .required(),

        })}
        render = {({
            values,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid
          }) =>(
          <React.Fragment>
            <Input
              label={I18n.t('reg_fname')}
              placeholder='First Name of Child'
              value={values.first_name}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='first_name'
              error={touched.first_name && errors.first_name}
            />
            <Input
              label={I18n.t('reg_mname')}
              placeholder='Middle Name of Child'
              value={values.middle_name}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='middle_name'
              error={touched.middle_name && errors.middle_name}
            />
            <Input
              label={I18n.t('reg_lname')}
              placeholder='Last Name of Child'
              value={values.last_name}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='last_name'
              error={touched.last_name && errors.last_name}
            />
            <Input
              label={I18n.t('reg_birthdate')}
              placeholder='DD-MM-YYYY'
              keyboardType='numeric'
              value={values.birthdate}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='birthdate'
              error={touched.birthdate && errors.birthdate}
            />
            <Input
              label={I18n.t('reg_email')}
              placeholder='Enter Email ID'
              value={values.email}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='email'
              error={touched.email && errors.email}
            />

            <Input
              label={I18n.t('reg_mobile')}
              placeholder='Enter Mobile Number'
              value={values.mobile_number}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='mobile_number'
              error={touched.mobile_number && errors.mobile_number}
            />
            <Input
              label={I18n.t('reg_pass')}
              placeholder='Password'
              secureTextEntry
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='password'
              error={touched.password && errors.password}
            />
            <Input
              label={I18n.t('reg_confirm_pass')}
              placeholder='Confirm Password'
              secureTextEntry
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='confirm_password'
              error={touched.confirm_password && errors.confirm_password}
            />

            <TouchableOpacity style={formStyles.button} onPress={handleSubmit} >
              <Text style={formStyles.buttonText}>Register</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      />
      </View>
      </DismissKeyBoard>
      </ScrollView>
      </View>
    );
  }
}
