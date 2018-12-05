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


export default class ForgotPassword extends React.Component {

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
      <Header header={I18n.t('forgotpass_header')} toggleLang={this._toggleLang}  />
      <DismissKeyBoard>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '90%',}}>

      <Formik
        enableReinitialize
        initialValues={{login_code: '', captcha: ''}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          login_code: Yup.string()
            .min(10, 'Minimum 10 characters is required')
            .max(10, 'Maximum 10 characters are allowed')
            .required('Please enter login code'),
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
