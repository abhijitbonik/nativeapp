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
import Input2 from '../components/Input2'
import DismissKeyBoard from '../components/DismissKeyBoard'
import Header from '../components/Header'
import RenderIf from '../components/RenderIf'
import FormHeader from '../components/FormHeader'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'


var ph_props = [
  {label: 'हाँ / Yes', value: 'yes' },
  {label: 'नहीं / No', value: 'No' }
];

export default class Form2 extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} );
    AsyncStorage.getItem('c_fname').then((value) => { this.setState({ 'first_name': value })} );
    AsyncStorage.getItem('c_mname').then((value) => { this.setState({ 'middle_name': value })} );
    AsyncStorage.getItem('c_lname').then((value) => { this.setState({ 'last_name': value })} );
    AsyncStorage.getItem('c_birthdate').then((value) => { this.setState({ 'birthdate': value })} );

  }

  constructor(props) {
    super(props);

    this.state = {
      mother_title:'',
      mother_name:'',
      mother_nationality:'',
      mother_country:'',
      mother_state:'',
      mother_city:'',
      mother_address:'',
      mother_pincode:'',
      mother_telephone_number:'',
      mother_mobile_number:'',
      mother_email:'',
      mother_occupation:'',
      mother_organisation:'',
      father_title:'',
      father_name:'',
      father_nationality:'',
      father_country:'',
      father_state:'',
      father_city:'',
      father_address:'',
      father_pincode:'',
      father_telephone_number:'',
      father_mobile_number:'',
      father_email:'',
      father_occupation:'',
      father_organisation:'',
      isCopyMotherAddress:'',
      isCopyFatherAddress:'',
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
    this.setState({ 'mother_name': values.mother_name})
    this.setState({ 'mother_mobile_number': values.mother_mobile_number})
    this.setState({ 'mother_email': values.mother_email})
    this.setState({ 'mother_occupation': values.mother_occupation})
    this.setState({ 'mother_organisation': values.mother_organisation})

    this.setState({ 'father_name': values.father_name})
    this.setState({ 'father_mobile_number': values.father_mobile_number})
    this.setState({ 'father_email': values.father_email})
    this.setState({ 'father_occupation': values.father_occupation})
    this.setState({ 'father_organisation': values.father_organisation})

    if(this.state.isCopyFatherAddress=='1'){
      this.setState({'father_city':values.father_city})
      this.setState({'father_address':values.father_address})
      this.setState({'father_pincode':values.father_pincode})
      this.setState({'father_telephone_number':values.father_telephone_number})

      this.setState({'mother_country':this.state.father_country})
      this.setState({'mother_state':this.state.father_state})
      this.setState({'mother_city':values.father_city})
      this.setState({'mother_address':values.father_address})
      this.setState({'mother_pincode':values.father_pincode})
      this.setState({'mother_telephone_number':values.father_telephone_number})
    }
    else if(this.state.isCopyMotherAddress=='1'){
      this.setState({'father_country':this.state.mother_country})
      this.setState({'father_state':this.state.mother_state})
      this.setState({'father_city':values.mother_city})
      this.setState({'father_address':values.mother_address})
      this.setState({'father_pincode':values.mother_pincode})
      this.setState({'father_telephone_number':values.mother_telephone_number})

      this.setState({'mother_city':values.mother_city})
      this.setState({'mother_address':values.mother_address})
      this.setState({'mother_pincode':values.mother_pincode})
      this.setState({'mother_telephone_number':values.mother_telephone_number})
    }
    else{
      this.setState({'mother_city':values.mother_city})
      this.setState({'mother_address':values.mother_address})
      this.setState({'mother_pincode':values.mother_pincode})
      this.setState({'mother_telephone_number':values.mother_telephone_number})

      this.setState({'father_city':values.father_city})
      this.setState({'father_address':values.father_address})
      this.setState({'father_pincode':values.father_pincode})
      this.setState({'father_telephone_number':values.father_telephone_number})
    }

  }

  _handleSubmit = (values) => {
    this._saveValues(values);
    //alert(JSON.stringify(values))
    //this._signup(values);
  }

  _goforward = () => {
    this.props.navigation.navigate('Form3')
  }

  _gobackward = () => {
    this.props.navigation.navigate('Form1')
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <Header header='2/5 Parent Details' onPress={this._header} onLogout={this._logout} toggleLang={this._toggleLang} />
      {RenderIf(true)(
      <FormHeader goforward={this._goforward} gobackward={this._gobackward} />
        )}
      <KeyboardAwareView>
        <View style={{
          //alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          height: '100%',
          paddingHorizontal:4,
          }}>
        <ScrollView>
        <View>
                        <Formik
                          initialValues={
                            {
                              mother_name:'',
                              mother_city:'',
                              mother_address:'',
                              mother_pincode:'',
                              mother_telephone_number:'',
                              mother_mobile_number:'',
                              mother_email:'',
                              mother_occupation:'',
                              mother_organisation:'',
                              father_name:'',
                              father_city:'',
                              father_address:'',
                              father_pincode:'',
                              father_telephone_number:'',
                              father_mobile_number:'',
                              father_email:'',
                              father_occupation:'',
                              father_organisation:'',
                            }}
                          onSubmit={this._handleSubmit}
                          validationSchema={Yup.object().shape({
                            mother_name:Yup.string()
                                //.required()
                                .max(255)
                                .min(1),
                            mother_city:Yup.string()
                                //.required()
                                .max(255),
                            mother_address:Yup.string()
                                //.required()
                                .max(255),
                            mother_pincode:Yup.number()
                                .max(999999)
                                .min(100000),
                            mother_telephone_number:Yup.number(),
                                //.max(11)
                                //.min(10),
                            mother_mobile_number:Yup.number()
                                .max(9999999999)
                                .min(1000000000),
                            mother_email:Yup.string()
                                .email('Please enter a valid email address')
                                .max(255),
                            mother_occupation:Yup.string()
                                .max(255)
                                .min(1),
                            mother_organisation:Yup.string()
                                .max(255)
                                .min(1),
                            father_name:Yup.string()
                                //.required()
                                .max(255)
                                .min(1),
                            father_city:Yup.string()
                                //.required()
                                .max(255),
                            father_address:Yup.string()
                                //.required()
                                .max(255),
                            father_pincode:Yup.number()
                                .max(999999)
                                .min(100000),
                            father_telephone_number:Yup.string(),
                                //.max(11)
                                //.min(10),
                            father_mobile_number:Yup.string()
                                .max(9999999999)
                                .min(1000000000),
                            father_email:Yup.string()
                                .email('Please enter a valid email address')
                                .max(255),
                            father_occupation:Yup.string()
                                .max(255)
                                .min(1),
                            father_organisation:Yup.string()
                                .max(255)
                                .min(1),

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
                            <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 20, elevation: 3, }}>
                                <Text style={{paddingHorizontal: 15, paddingVertical: 5}} > {I18n.t('form2.instr1')}</Text>
                            </View>
                              <View>
                              <View  style ={{borderWidth:1, borderRadius:5 , paddingBottom:15}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20, margin: 20,}}>{I18n.t('form2.mother.detailslabel')}</Text>

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.title')}</Text>
                                  </View>
                                  <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                                  <Picker
                                    selectedValue={this.state.mother_title}
                                    style={{ height: 50, width: 350 }}
                                    //enabled={false}
                                    onValueChange={(itemValue, itemIndex) => this.setState({mother_title: itemValue})}>
                                    <Picker.Item label="Choose title" />
                                    <Picker.Item label="Ms" value="1" />
                                    <Picker.Item label="Mrs" value="2" />
                                    <Picker.Item label="Late" value="3" />
                                  </Picker>
                                  </View>

                                  <Input
                                    label={I18n.t('form2.name')}
                                    placeholder="Mother's Full Name"
                                    value={values.mother_name}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_name'
                                    error={touched.mother_name && errors.mother_name}
                                  />

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.nationality')}</Text>
                                  </View>
                                  <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                                  <Picker
                                    selectedValue={this.state.mother_nationality}
                                    style={{ height: 50, width: 350 }}
                                    //enabled={false}
                                    onValueChange={(itemValue, itemIndex) => this.setState({mother_nationality: itemValue})}>
                                    <Picker.Item label="Choose Nationality" />
                                    <Picker.Item label="Indian" value="1" />
                                    <Picker.Item label="Other" value="2" />
                                  </Picker>
                                  </View>

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.mother.addresslabel')}</Text>
                                  </View>
                                  <View style={{alignItems: 'center'}}>
                                  <RadioForm
                                    radio_props={[
                                      {label: 'हाँ / Yes', value: '1' },
                                      {label: 'नहीं / No', value: '0' }
                                    ]}
                                    initial={3}
                                    disabled={this.state.isCopyFatherAddress=='1'?true:false}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'grey'}
                                    buttonSize={7}
                                    buttonOuterSize={20}
                                    animation={true}
                                    selectedButtonColor={'#ff7043'}
                                    onPress={(value) => {this.setState({isCopyMotherAddress:value})}}
                                  />
                                  </View>

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.country')}</Text>
                                  </View>
                                  <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                                  <Picker
                                    selectedValue={this.state.isCopyFatherAddress=='1'?this.state.father_country:this.state.mother_country}
                                    style={{ height: 50, width: 350 }}
                                    enabled={this.state.isCopyFatherAddress=='1'?false:true}
                                    onValueChange={(itemValue, itemIndex) => this.setState({mother_country: itemValue})}>
                                    <Picker.Item label="Choose Country" />
                                    <Picker.Item label="India" value="1" />
                                    <Picker.Item label="Other" value="2" />
                                  </Picker>
                                  </View>

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.state')}</Text>
                                  </View>
                                  <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                                  <Picker
                                    selectedValue={this.state.isCopyFatherAddress=='1'?this.state.father_state:this.state.mother_state}
                                    style={{ height: 50, width: 350 }}
                                    enabled={this.state.isCopyFatherAddress=='1'?false:true}
                                    onValueChange={(itemValue, itemIndex) => this.setState({mother_state: itemValue})}>
                                    <Picker.Item label="Choose State" />
                                    <Picker.Item label="Andaman and Nicobar Islands" value="1" />
                                    <Picker.Item label="Maharashtra" value="2" />
                                  </Picker>
                                  </View>

                                  <Input
                                    label={I18n.t('form2.city')}
                                    placeholder="City"
                                    value={this.state.isCopyFatherAddress=='1'?values.father_city:values.mother_city}
                                    editable={this.state.isCopyFatherAddress=='1'?false:true}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_city'
                                    id=''

                                    error={touched.mother_city && errors.mother_city}
                                  />

                                  <Input2
                                    label={I18n.t('form2.address')}
                                    placeholder="Address"
                                    value={this.state.isCopyFatherAddress=='1'?values.father_address:values.mother_address}
                                    editable={this.state.isCopyFatherAddress=='1'?false:true}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_address'
                                    error={touched.mother_address && errors.mother_address}
                                  />

                                  <Input
                                    label={I18n.t('form2.pincode')}
                                    placeholder="Pincode"
                                    value={this.state.isCopyFatherAddress=='1'?values.father_pincode:values.mother_pincode}
                                    editable={this.state.isCopyFatherAddress=='1'?false:true}
                                    keyboardType='numeric'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_pincode'
                                    error={touched.mother_pincode && errors.mother_pincode}
                                  />

                                  <Input
                                    label={I18n.t('form2.telephone_number')}
                                    placeholder="Telephone Number"
                                    value={this.state.isCopyFatherAddress=='1'?values.father_telephone_number:values.mother_telephone_number}
                                    editable={this.state.isCopyFatherAddress=='1'?false:true}
                                    keyboardType='numeric'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_telephone_number'
                                    error={touched.mother_telephone_number && errors.mother_telephone_number}
                                  />

                                  <Input
                                    label={I18n.t('form2.mobile_number')}
                                    placeholder="Mobile Number"
                                    value={values.mother_mobile_number}
                                    keyboardType='numeric'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_mobile_number'
                                    error={touched.mother_mobile_number && errors.mother_mobile_number}
                                  />

                                  <Input
                                    label={I18n.t('form2.email')}
                                    placeholder="Email"
                                    value={values.mother_email}
                                    keyboardType='email-address'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_email'
                                    error={touched.mother_email && errors.mother_email}
                                  />

                                  <Input
                                    label={I18n.t('form2.email')}
                                    placeholder="Email"
                                    value={values.mother_email}
                                    keyboardType='email-address'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_email'
                                    error={touched.mother_email && errors.mother_email}
                                  />

                                  <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 20, elevation: 3, }}>
                                      <Text style={{paddingHorizontal: 15, paddingVertical: 5}} > {I18n.t('form2.mother.worklabel')}</Text>
                                  </View>

                                  <Input
                                    label={I18n.t('form2.occupation')}
                                    placeholder="Occupation"
                                    value={values.mother_occupation}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_occupation'
                                    error={touched.mother_occupation && errors.mother_occupation}
                                  />

                                  <Input
                                    label={I18n.t('form2.organisation')}
                                    placeholder="Organisation"
                                    value={values.mother_organisation}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='mother_organisation'
                                    error={touched.mother_organisation && errors.mother_organisation}
                                  />
                              </View>
                              {/* Father's Details */}
                              <View  style ={{borderWidth:1, borderRadius:5, paddingBottom:15 , marginTop:15}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20, margin: 20,}}>{I18n.t('form2.father.detailslabel')}</Text>

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.title')}</Text>
                                  </View>
                                  <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                                  <Picker
                                    selectedValue={this.state.father_title}
                                    style={{ height: 50, width: 350 }}
                                    //enabled={false}
                                    onValueChange={(itemValue, itemIndex) => this.setState({father_title: itemValue})}>
                                    <Picker.Item label="Choose title" />
                                    <Picker.Item label="Mr" value="1" />
                                    <Picker.Item label="Mrs" value="2" />
                                    <Picker.Item label="Late" value="3" />
                                  </Picker>
                                  </View>

                                  <Input
                                    label={I18n.t('form2.name')}
                                    placeholder="father's Full Name"
                                    value={values.father_name}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_name'
                                    error={touched.father_name && errors.father_name}
                                  />

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.nationality')}</Text>
                                  </View>
                                  <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                                  <Picker
                                    selectedValue={this.state.father_nationality}
                                    style={{ height: 50, width: 350 }}
                                    //enabled={false}
                                    onValueChange={(itemValue, itemIndex) => this.setState({father_nationality: itemValue})}>
                                    <Picker.Item label="Choose Nationality" />
                                    <Picker.Item label="Indian" value="1" />
                                    <Picker.Item label="Other" value="2" />
                                  </Picker>
                                  </View>

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.father.addresslabel')}</Text>
                                  </View>
                                  <View style={{alignItems: 'center'}}>
                                  <RadioForm
                                    radio_props={[
                                      {label: 'हाँ / Yes', value: '1' },
                                      {label: 'नहीं / No', value: '0' }
                                    ]}
                                    initial={3}
                                    disabled={this.state.isCopyMotherAddress=='1'?true:false}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'grey'}
                                    buttonSize={7}
                                    buttonOuterSize={20}
                                    animation={true}
                                    selectedButtonColor={'#ff7043'}
                                    onPress={(value) => {this.setState({isCopyFatherAddress:value})}}
                                  />
                                  </View>

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.country')}</Text>
                                  </View>
                                  <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                                  <Picker
                                    selectedValue={this.state.isCopyMotherAddress=='1'?this.state.mother_country:this.state.father_country}
                                    style={{ height: 50, width: 350 }}
                                    enabled={this.state.isCopyMotherAddress=='1'?false:true}
                                    onValueChange={(itemValue, itemIndex) => this.setState({father_country: itemValue})}>
                                    <Picker.Item label="Choose Country" />
                                    <Picker.Item label="India" value="1" />
                                    <Picker.Item label="Other" value="2" />
                                  </Picker>
                                  </View>

                                  <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                  <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form2.state')}</Text>
                                  </View>
                                  <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                                  <Picker
                                    selectedValue={this.state.isCopyMotherAddress=='1'?this.state.mother_state:this.state.father_state}
                                    style={{ height: 50, width: 350 }}
                                    enabled={this.state.isCopyMotherAddress=='1'?false:true}
                                    onValueChange={(itemValue, itemIndex) => this.setState({father_state: itemValue})}>
                                    <Picker.Item label="Choose State" />
                                    <Picker.Item label="Andaman and Nicobar Islands" value="1" />
                                    <Picker.Item label="Maharashtra" value="2" />
                                  </Picker>
                                  </View>

                                  <Input
                                    label={I18n.t('form2.city')}
                                    placeholder="City"
                                    //value={values.father_city}
                                    value={this.state.isCopyMotherAddress=='1'?values.mother_city:values.father_city}
                                    editable={this.state.isCopyMotherAddress=='1'?false:true}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_city'
                                    error={touched.father_city && errors.father_city}
                                  />

                                  <Input2
                                    label={I18n.t('form2.address')}
                                    placeholder="Address"
                                    value={this.state.isCopyMotherAddress=='1'?values.mother_address:values.father_address}
                                    editable={this.state.isCopyMotherAddress=='1'?false:true}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_address'
                                    error={touched.father_address && errors.father_address}
                                  />

                                  <Input
                                    label={I18n.t('form2.pincode')}
                                    placeholder="Pincode"
                                    value={this.state.isCopyMotherAddress=='1'?values.mother_pincode:values.father_pincode}
                                    editable={this.state.isCopyMotherAddress=='1'?false:true}
                                    keyboardType='numeric'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_pincode'
                                    error={touched.father_pincode && errors.father_pincode}
                                  />

                                  <Input
                                    label={I18n.t('form2.telephone_number')}
                                    placeholder="Telephone Number"
                                    value={this.state.isCopyMotherAddress=='1'?values.mother_telephone_number:values.father_telephone_number}
                                    editable={this.state.isCopyMotherAddress=='1'?false:true}
                                    keyboardType='numeric'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_telephone_number'
                                    error={touched.father_telephone_number && errors.father_telephone_number}
                                  />

                                  <Input
                                    label={I18n.t('form2.mobile_number')}
                                    placeholder="Mobile Number"
                                    value={values.father_mobile_number}
                                    keyboardType='numeric'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_mobile_number'
                                    error={touched.father_mobile_number && errors.father_mobile_number}
                                  />

                                  <Input
                                    label={I18n.t('form2.email')}
                                    placeholder="Email"
                                    value={values.father_email}
                                    keyboardType='email-address'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_email'
                                    error={touched.father_email && errors.father_email}
                                  />

                                  <Input
                                    label={I18n.t('form2.email')}
                                    placeholder="Email"
                                    value={values.father_email}
                                    keyboardType='email-address'
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_email'
                                    error={touched.father_email && errors.father_email}
                                  />

                                  <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 20, elevation: 3, }}>
                                      <Text style={{paddingHorizontal: 15, paddingVertical: 5}} > {I18n.t('form2.father.worklabel')}</Text>
                                  </View>

                                  <Input
                                    label={I18n.t('form2.occupation')}
                                    placeholder="Occupation"
                                    value={values.father_occupation}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_occupation'
                                    error={touched.father_occupation && errors.father_occupation}
                                  />

                                  <Input
                                    label={I18n.t('form2.organisation')}
                                    placeholder="Organisation"
                                    value={values.father_organisation}
                                    onChange={setFieldValue}
                                    onTouch={setFieldTouched}
                                    name='father_organisation'
                                    error={touched.father_organisation && errors.father_organisation}
                                  />
                              </View>
                              </View>

                              <View style={{alignItems: 'center'}}>
                              <TouchableOpacity style={formStyles.button} onPress={handleSubmit} >
                                <Text style={formStyles.buttonText}>Save Application</Text>
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
