import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage,
  Keyboard,
  Picker,
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
var formStyles = require('../styles/formStyles');
var generalStyles = require('../styles/generalStyles');
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from '../components/Input'
import DismissKeyBoard from '../components/DismissKeyBoard'
import HideView from '../components/HideView'
import Header from '../components/Header'
import RenderIf from '../components/RenderIf'
import FormHeader from '../components/InitialFormHeader'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
//import ImagePicker from 'react-native-image-picker';

export default class Form4 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      avatarSource: '',
    };
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
    //AsyncStorage.setItem('email', values.email)
    //AsyncStorage.setItem('mobile_number', values.mobile_number)
    //AsyncStorage.setItem('password', values.password)
    this.setState({ 'bpl_cert_no': values.bpl_cert_no })
    this.setState({ 'bpl_authority': values.bpl_authority })
    //alert(JSON.stringify('save_check'))
  }

  _handleSubmit = (values) => {
    //this._saveValues(values);
    this.setState({ 'bpl_cert_no': values.bpl_cert_no })
    this.setState({ 'bpl_authority': values.bpl_authority })
    this._goforward()
    //this._signup(values);
  }

  _goforward = () => {
    this.props.navigation.navigate('Form2')
  }

  _generateLinkingCode = () =>{
    this.setState({linking_code:'XXXXXXXX'})
    alert('Code to Generate Linking Code')
  }

  
  render() {
    return (
      <View style={{flex: 1}}>
      <Header header='1/5 Basic Information' onPress={this._header} onLogout={this._logout} toggleLang={this._toggleLang} />
      {RenderIf(true)(
      <FormHeader goforward={this._goforward} />
        )}
      <KeyboardAwareView>
        <View style={{
          //alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          height: '100%',}}>
        <ScrollView>
        <View>
          
        </View>
        </ScrollView>
        </View>
      </KeyboardAwareView>
      </View>
    );
  }
}
