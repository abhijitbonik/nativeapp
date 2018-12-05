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
import Captcha from '../components/Captcha'
import DismissKeyBoard from '../components/DismissKeyBoard'
import Header from '../components/Header2'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import CookieManager from 'react-native-cookies';

var ph_props = [
  {label: 'हाँ / Yes', value: 'true' },
  {label: 'नहीं / No', value: 'false' }
];

export default class SignUpForm extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} );
    AsyncStorage.getItem('cookies').then((value) => { this.setState({ 'cookies': value })} );
    /*
    CookieManager.get('http://10.129.155.117:8084/kvs-portal/register.html')
      .then((res) => {
        console.log('CookieManager.get =>', res); // => 'user_session=abcdefg; path=/;'        
        //AsyncStorage.setItem('cookies', res);
        this.setState({'cookies': res.JSESSIONID});
      });
      */
  }

  constructor(props) {
    super(props);

    this.state = {
      c_fname: '',
      c_mname: '',
      c_lname: '',
      c_birthdate: '',
      kvs_ward:'',
      mobile_number: '',
      registration_id: '',
      email: '',
      captcha:'',
      password:'',
      currLang: '',
      isPH: '',
      cookies:'default'
    };
  }

   _signup = (values) => {
    var base_url='http://10.129.155.117:8084/kvs-portal/'
    var url=base_url+"api/v1/register.html?applicationForm.firstName="+values.first_name
              +"&applicationForm.middleName="+values.middle_name
              +"&applicationForm.lastName="+values.last_name
              +"&applicationForm.dateOfBirth="+this.state.c_birthdate
              +"&applicationForm.differentlyAbled="+this.state.isPH
              +"&applicationForm.kvsWardCategory="+this.state.kvs_ward
              +"&applicationForm.email="+values.email
              +"&applicationForm.mobile="+values.mobile_number
              +"&password="+values.password
              +"&confirmPassword="+values.confirm_password
              +"&captchaText="+values.captcha

    headers = {
      'Accept': 'application/json',
      // 'Accept-Encoding': 'gzip',
      'Cookie': 'JSESSION='+this.state.cookies
      // path=/kvs-portal/; domain=10.129.155.117; HttpOnly; Expires=Tue, 19 Jan 2038 03:14:07 GMT;'
      };

    fetch(url,{
      method:'POST',
      body:null,
      headers:headers,
      credentials:'include',
    })
        .then(function(response) {
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          alert(JSON.stringify(myJson));
          console.log('Registration Response =>', myJson, myJson.statusCode)
          if(myJson.result=='success' && myJson.statusCode=='200'){
            //this.props.navigation.navigate('ValidateOtp');
            //alert('result- '+myJson.result+' statusCode- '+myJson.statusCode)
          }
          else{
            alert('set error codes here')
          }
        });

    // alert(JSON.stringify(response.json());

    // this.props.navigation.navigate('ValidateOtp');
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
    AsyncStorage.setItem('c_ph', this.state.isPH)
    AsyncStorage.setItem('c_birthdate', this.state.c_birthdate)
    AsyncStorage.setItem('email', values.email)
    AsyncStorage.setItem('mobile_number', values.mobile_number)
    AsyncStorage.setItem('password', values.password)
  }


  _handleSubmit = (values) => {
    this._saveValues(values);
    this._signup(values);
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <View>
      <Header header={I18n.t('reg_title')} toggleLang={this._toggleLang}  />
      </View>
      <KeyboardAwareView>
      <View style={{
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
      }}>
      <ScrollView>
      <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 20, elevation: 3, }}>
      <Text style={{paddingHorizontal: 15, paddingVertical: 5}} > {I18n.t('signup_instr1')}</Text>
      <Text style={{paddingHorizontal: 15, paddingVertical: 5}}> {I18n.t('signup_instr2')}</Text>
      <Text style={{paddingHorizontal: 15, paddingVertical: 5}}> {I18n.t('signup_instr3')}</Text>
      </View>
      <View>
      <Formik
        initialValues={{first_name: '', middle_name: '', last_name: '', email: '',  mobile_number: '', password:'', confirm_password:'',captcha: ''}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          first_name: Yup.string()
            //.required('Please enter first name of the child')
            .min(1, 'Minimum 1 characters is required')
            .max(255, 'Maximum 200 characters are allowed')
            .matches(/^[A-Za-z \.]+$/ , 'Only alphabets and dot(.) are allowed'),
          middle_name: Yup.string()
              .min(1, 'Minimum 1 characters is required')
              .max(255, 'Maximum 200 characters are allowed')
              .matches(/^[A-Za-z \.]+$/ , 'Only alphabets and dot(.) are allowed'),
          last_name: Yup.string()
                .min(1, 'Minimum 1 characters is required')
                .max(255, 'Maximum 200 characters are allowed')
                .matches(/^[A-Za-z \.]+$/ , 'Only alphabets and dot(.) are allowed'),
          email: Yup.string()
            .email('Please enter a valid email address')
            .max(255),
            //.required('Please enter email address'),
          mobile_number: Yup.number()
              //.typeError("That doesn't look like a phone number")
              //.positive("A phone number can't start with a minus")
              //.integer("Please enter a valid 10 digit mobile number int")
              .min(1000000000, 'Please enter a valid 10 digit mobile number min')
              .max(9999999999, 'Please enter a valid 10 digit mobile number max'),
              //.matches(/^[0-9]{10}$/)
              //.required('Please enter a valid 10 digit mobile number'),
          password: Yup.string()
              //.required('Please enter a passord')
              .min(6, 'Minimum 6 characters is required')
              .max(15, 'Maximum 15 characters are allowed'),
          confirm_password: Yup.string()
              .min(6, 'Minimum 6 characters is required')
              .max(15, 'Maximum 15 characters are allowed')
              .oneOf([Yup.ref('password', null)], 'Please enter correct password'),
              //.required('Please enter a valid password to confirm'),
          captcha: Yup.string(),
              //.required('Please enter captcha code shown above'),
          //c_birthdate: Yup.date()
          //    .required(),
              //.min("01-04-2010", "Minimum date allowed")
              //.max("01-04-2014", "Maximum date allowed"),

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

            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
            <Text style={{fontWeight: 'bold'}}>{I18n.t('reg_ph')}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
            <RadioForm
              radio_props={ph_props}
              initial={3}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'grey'}
              buttonSize={7}
              buttonOuterSize={20}
              animation={true}

              selectedButtonColor={'#ff7043'}
              onPress={(value) => {this.setState({isPH:value})}}
            />
            </View>

            {/*customize style later*/}
            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
            <Text style={{fontWeight: 'bold'}}>{I18n.t('reg_birthdate')}</Text>
            </View>
            <DatePicker
              style={formStyles.date}
              date={this.state.c_birthdate}
              mode="date"
              name="c_birthdate"
              //androidMode="spinner"
              placeholder="DD-MM-YYYY"
              //placeholderTextColor='red'
              format="DD-MM-YYYY"
              minDate={this.state.isPH=='true'?"01-04-2010":"01-04-2012"}
              maxDate="01-04-2014"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={
                { dateIcon: formStyles.dateIcon,
                dateTouchBody: formStyles.dateTouchBody,
                dateInput: formStyles.dateInput,
              }
              }
              onDateChange={(date) => {this.setState({c_birthdate: date})}}
            />
            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
            <Text style={{fontWeight: 'bold'}}>{I18n.t('reg_kvsward')}</Text>
            </View>
            <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
            <Picker
              selectedValue={this.state.kvs_ward}
              style={{ height: 50, width: 350 }}
              onValueChange={(itemValue, itemIndex) => this.setState({kvs_ward: itemValue})}>
              <Picker.Item label="Choose..." />
              <Picker.Item label="Not Applicable" value='1' />
              <Picker.Item label="Working Parent" value='2' />
              <Picker.Item label="Retired Parent" value='3' />
              <Picker.Item label="Working Grandparent" value='4' />
              <Picker.Item label="Retired Grandparent" value='5' />
            </Picker>
            </View>
            <Input
              label={I18n.t('reg_email')}
              placeholder='Enter Email ID'
              value={values.email}
              keyboardType='email-address'
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='email'
              error={touched.email && errors.email}
            />

            <Input
              label={I18n.t('reg_mobile')}
              placeholder='Enter Mobile Number'
              value={values.mobile_number}
              keyboardType='numeric'
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
            <View style={{alignItems: 'center'}}>
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
            <Text style={{fontWeight: 'bold',margin: 20,}}>Letters are case sensitive.</Text>


            <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={formStyles.button} onPress={handleSubmit} >
              <Text style={formStyles.buttonText}>Register</Text>
            </TouchableOpacity>
            </View>
          </React.Fragment>
        )}
      />
      </View>
      </ScrollView>
      </View>
      </KeyboardAwareView>
      </View>
    );
  }
}
