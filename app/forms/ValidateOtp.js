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
import CountDown from 'react-native-countdown-component';
import HideView from '../components/HideView'

export default class ValidateOtp extends React.Component {

  componentDidMount = async () => {
    await AsyncStorage.getItem('canResend').then((value) => { this.setState({ 'canResend': value })} )
    await AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} )
    await AsyncStorage.getItem('encrypted_login_code').then((value) => { this.setState({ 'encrypted_login_code': value })} )
    await AsyncStorage.getItem('cookies').then((value) => { this.setState({ 'cookies': value })} );
    await AsyncStorage.getItem('mobile_number').then((value) => {
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
      encrypted_login_code:'',
      cookies:'default',
      isResendActivated:false,
      isTimer:true,
      canResend:'true',
    };
  }


  _validateotp = async (values) => {
    var base_url='http://10.129.155.117:8084/kvs-portal/'
    var url=base_url+"api/v1/validateotp.html?lc="+this.state.encrypted_login_code
              +"&otp="+values.otp
              +"&captchaText="+values.captcha

    headers = {
      'Accept': 'application/json',
      // 'Accept-Encoding': 'gzip',
      'Cookie': 'JSESSION='+this.state.cookies
      // path=/kvs-portal/; domain=10.129.155.117; HttpOnly; Expires=Tue, 19 Jan 2038 03:14:07 GMT;'
      };

    await fetch(url,{
      method:'POST',
      body:null,
      headers:headers,
      credentials:'include',
    })
    .then(function(response) {
      console.log(response)
      return response.json();
    })
    .then((myJson) =>{
      this.validateResponse(myJson)
    })
    .catch((err) =>{
      console.log("Error: ",err)
    })
  }

  validateResponse = async (myJson) =>{
    console.log("validateResponse myJson" , myJson)
      if(myJson.result=='success' && myJson.statusCode=='200') {

        await AsyncStorage.setItem('login_code', myJson.data.toString())
        this.props.navigation.navigate('PostRegister');
        
      }
      else if(myJson.result=='already_verified' && myJson.statusCode=='200') {
        alert('Your mobile number is already verified')
        this.props.navigation.navigate('LoginForm');
        
      }
      else {
        alert("Something went wrong, Please try again. Error: ", myJson.result)
        this.props.navigation.navigate('ValidateOtp');
      }

  }



  _handleSubmit = (values) => {
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


  resendTimer = () =>{
    if (this.state.isTimer==true){
      return <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
      <Text> Resend OTP in </Text>
            <CountDown
              until={7}
              size={15}
              onFinish={() => {
                this.setState({
                  'isTimer':false,
                  'isResendActivated':true
                })
              }}
              digitBgColor={'#fff'}
              digitTxtColor={'#1CC625'}
              timeToShow={['S']}
              labelS={''}
            />
            <Text> Seconds</Text>
            </View>
    }
    else if (this.state.isResendActivated==true && this.state.isTimer==false){
      return <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 20}}> {I18n.t('validateotp.label2')}</Text>
        <TouchableOpacity style={{
          width: 100,
          backgroundColor: '#ff7043',
          borderRadius: 15,
          paddingVertical: 12,
          marginVertical: 10,
          alignItems: 'center',}} onPress={this.resendOtp} >
        <Text >Resend OTP</Text>
        </TouchableOpacity> 
      </View>
    }
  }

  resendOtp = async () => {
    await AsyncStorage.setItem('canResend','false')    
    var base_url='http://10.129.155.117:8084/kvs-portal/'
    var url=base_url+"api/v1/resendotp.html?lc="+this.state.encrypted_login_code
              +"&mn="+this.state.encrypted_mobile_number

    headers = {
      'Accept': 'application/json',
      // 'Accept-Encoding': 'gzip',
      'Cookie': 'JSESSION='+this.state.cookies
      // path=/kvs-portal/; domain=10.129.155.117; HttpOnly; Expires=Tue, 19 Jan 2038 03:14:07 GMT;'
      };

    await fetch(url,{
      method:'POST',
      body:null,
      headers:headers,
      credentials:'include',
    })
    .then(function(response) {
      return response.json();
    })
    .then((myJson) =>{
      console.log("resend otp response ",myJson)
    })
    .then(() =>{
      this.props.navigation.navigate('ValidateOtp');
    })
    .catch((err) =>{
      console.log("Error: ",err)
    })
      
  }

  
  

  render() {
    return (
      <View>
      <Header header={I18n.t('validateotp.header')} toggleLang={this._toggleLang}  />
      <DismissKeyBoard>
      <View style={{
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',}}>

        <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 10, elevation: 3, width:400}}>
        <Text style={{padding: 15}} > {I18n.t('validateotp.instr1')} {this.state.num} {I18n.t('validateotp.instr2')}</Text>
        </View>

      <Formik
        enableReinitialize
        initialValues={{otp: '', captcha: '',}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          otp: Yup.string()
            .min(6, 'Minimum 6 characters is required')
            .max(6, 'Maximum 6 characters are allowed')
            .required('Please enter otp'),
          captcha: Yup.string()
              .required('Enter captcha')
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
           
            <HideView hide={this.state.canResend=='false'?true:false}>
            {this.resendTimer()}
            </HideView>
            

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
