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
import Header from '../components/Header2'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';
//import RadioButtonCustom from '../components/RadioButtonCustom'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
var radio_props = [
  {label: 'हाँ / Yes', value: 'yes' },
  {label: 'नहीं / No', value: 'No' }
];

export default class SignUpForm extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} );
  }

  constructor(props) {
    super(props);

    this.state = {
      c_fname: '',
      c_mname: '',
      c_lname: '',
      c_birthdate: '',
      mobile_number: '',
      registration_id: '',
      email: '',
      captcha:'',
      password:'',
      currLang: '',
      isPH: '',
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

  _saveValues = (values) => {
    AsyncStorage.setItem('c_fname', values.first_name)
    AsyncStorage.setItem('c_mname', values.middle_name)
    AsyncStorage.setItem('c_lname', values.last_name)
    AsyncStorage.setItem('email', values.email)
    AsyncStorage.setItem('c_birthdate', values.birthdate)
    AsyncStorage.setItem('mobile_number', values.mobile_number)
    AsyncStorage.setItem('password', values.password)
    //this.setState({ 'registration_id': values.registration_id })
    //this.setState({ 'email': values.email })
    //this.setState({ 'birthdate': values.birthdate })
    //alert(JSON.stringify('save_check'))
  }


  _handleSubmit = (values) => {
    AsyncStorage.setItem('c_fname', values.first_name)
    AsyncStorage.setItem('c_mname', values.middle_name)
    AsyncStorage.setItem('c_lname', values.last_name)
    AsyncStorage.setItem('email', values.email)
    AsyncStorage.setItem('c_birthdate', values.birthdate)
    AsyncStorage.setItem('mobile_number', values.mobile_number)
    AsyncStorage.setItem('password', values.password)
    this.props.navigation.navigate('LoggedInHome');
    //this._saveValues(values);
    //this._signup(values);
  }

  render() {
    return (
      <View>
      <Header header={I18n.t('reg_title')} toggleLang={this._toggleLang}  />
      <ScrollView>

      <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 10, elevation: 3}}>
      <Text > {I18n.t('signup_instr1')}</Text>
      <Text > {I18n.t('signup_instr2')}</Text>
      <Text > {I18n.t('signup_instr3')}</Text>
      </View>

      <DismissKeyBoard>
      <View style={generalStyles.center_align}>
      <Formik
        initialValues={{first_name: '', middle_name: '', last_name: '', email: '', birthdate: '', mobile_number: '', captcha: ''}}
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
          captcha: Yup.string()
              .required()

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

            {/*customize style later*/}
            <Text style={{fontWeight: 'bold'}}>{I18n.t('reg_ph')}</Text>
            <RadioForm
              radio_props={radio_props}
              initial={3}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'grey'}
              animation={true}

              selectedButtonColor={'#ff7043'}
              onPress={(value) => {this.setState({isPH:value})}}
            />
            {/*<Text>{this.state.isPH}</Text>*/}

            {/*
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
            */}

            {/*customize style later*/}
            <Text style={{fontWeight: 'bold'}}>{I18n.t('reg_birthdate')}</Text>
            <DatePicker
              style={formStyles.date}
              date={this.state.date}
              mode="date"
              placeholder="DD-MM-YYYY"
              //placeholderTextColor='red'
              format="DD-MM-YYYY"
              minDate="01-01-2011"  //check ph condition and set accordingly
              //maxDate="01-01-2013"  //check ph condition and set accordingly
              //minDate={{this.state.isPH?"01-01-2011":"01-01-2001"}}
              maxDate="31-01-2013"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{ dateIcon: { width: 0, height: 0} }}
              onDateChange={(date) => {this.setState({date: date})}}
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

            <TouchableOpacity style={{height:50, width:'50%', backgroundColor: 'grey', alignItems:'center', justifyContent:'center', padding: 20, margin: 20}}>
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
              <Text style={formStyles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity >
              <Text style={{height: 50}}>.</Text>
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
