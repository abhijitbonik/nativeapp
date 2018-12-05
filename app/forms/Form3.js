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
import HideView from '../components/HideView'


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
      selectedState: '',
      selectedStateKey: 0,
      selectedSchool: '',
      selectedSchoolKey: 0,
      selectedOrganisation: '',
      selectedOrganisationKey: 0,
      selectedEmploymentStatus: '',
      selectedEmploymentStatusKey: 0,
      servicecategory:'',
      school_category:'',
      school_region:'',
      school_region_type:'',
      school_sponsoring_agency:'',
      school_location:'',
      transferParent:'',
      transferDetails: [],
      data: [
        {
          key:1,
          name:'Maharashtra',
          value:'maharashtra',
          schools:[
            {
              key:1,
              name:'KV IIT Powai',
              value:'KV IIT Powai',
              category: 'Institute of Higher Learning (IHL)1',
              region: 'Mumbai',
              region_type: 'Urban',
              sponsoring_agency: 'IIT Bombay',
              location_map: '100,100',
              employers: [
                { 
                  name:'IIT Bombay',
                  value:'iitbombay',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'BARC',
                  value:'barc',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
            {
              key:2,
              name:'KV IIT Powai2',
              value:'KV IIT Powai2',
              category: 'Institute of Higher Learning (IHL)2',
              region: 'Mumbai',
              region_type: 'Urban',
              sponsoring_agency: 'IIT Bombay',
              location_map: '100,100',
              employers: [
                { 
                  name:'IIT Bombay2',
                  value:'iitbombay2',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'BARC2',
                  value:'barc2',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
            {
              key:3,
              name:'KV IIT Powai3',
              value:'KV IIT Powai3',
              category: 'Institute of Higher Learning (IHL)3',
              region: 'Mumbai',
              region_type: 'Urban',
              sponsoring_agency: 'IIT Bombay',
              location_map: '100,100',
              employers: [
                { 
                  name:'IIT Bombay3',
                  value:'iitbombay',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'BARC3',
                  value:'barc',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
          ]
        },
        {
          key:2,
          name:'Madhya Pradesh',
          value:'madhya_pradesh',
          schools:[
            {
              key:1,
              name:'KV Bhopal',
              value:'KV Bhopal',
              category: 'Civil',
              region: 'Bhopal',
              region_type: 'Urban',
              sponsoring_agency: 'NIT Bhopal',
              location_map: '80,90',
              employers:[
                { 
                  name:'Company 1',
                  value:'company1',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'Company 2',
                  value:'company2',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
            {
              key:2,
              name:'KV Indore',
              value:'KV Indore',
              category: 'Institute of Higher Learning (IHL)',
              region: 'Indore',
              region_type: 'Rural',
              sponsoring_agency: 'IIT Indore',
              location_map: '85,90',
              employers:[
                { 
                  name:'Company 1',
                  value:'company1',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'Company 2',
                  value:'company2',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
            {
              key:3,
              name:'KV Bhopal3',
              value:'KV Bhopal3',
              category: 'Defence',
              region: 'Bhopal',
              region_type: 'Urban',
              sponsoring_agency: 'NIT Bhopal',
              location_map: '80,90',
              employers:[
                { 
                  name:'Company 1',
                  value:'company1',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'Company 2',
                  value:'company2',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
          ]
        },
        {
          key:5,
          name:'Karnataka',
          value:'karnataka',
          schools:[
            {
              key:1,
              name:'KV Bangalore',
              value:'KV Bangalore',
              category: 'Institute of Higher Learning (IHL)',
              reion: 'Bangalore',
              region_type: 'Urban',
              sponsoring_agency: 'IISc Bangalore',
              location_map: '90,95',
              employers:[
                { 
                  name:'Company 1',
                  value:'company1',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'Company 2',
                  value:'company2',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
            {
              key:2,
              name:'KV Mysore',
              value:'KV Mysore',
              category: 'Defense',
              region: 'Mysore',
              region_type: 'Rural',
              sponsoring_agency: 'INS',
              location_map: '90,90',
              employers:[
                { 
                  name:'Company 1',
                  value:'company1',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'Company 2',
                  value:'company2',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
            {
              key:2,
              name:'KV Mysore',
              value:'KV Mysore',
              category: 'Defense',
              region: 'Mysore',
              region_type: 'Rural',
              sponsoring_agency: 'INS',
              location_map: '90,90',
              employers:[
                { 
                  name:'Company 1',
                  value:'company1',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
                { 
                  name:'Company 2',
                  value:'company2',
                  employmentstatus:[
                    {
                      name:'Permanent Type',
                      value:'permanenmt'
                    },
                    {
                      name: 'Temporary Type',
                      value: 'temporary'
                    },
                    {
                      name: 'Others',
                      value: 'others'
                    },
                  ]
                },
              ],
            },
          ]
        }],
    
      };


  }

  loadStates() {
  return this.state.data.map((states, i) => (
     <Picker.Item label={states.name} value={states.value} key={i} />
  ))
  }

  loadSchools(statekey) {
      if (statekey == 0) {
        return <Picker.Item label=""  value="choose" />
      } else {
        return this.state.data[statekey-1].schools.map((schools, i) => (
           <Picker.Item label={schools.name} value={schools.value} key={i} />
        ))
      }
  }

  loadOrganisations(statekey, schoolkey) {
      if (statekey == 0 || schoolkey==0) {
        return <Picker.Item label=""  value="choose" />
      } else {
        return this.state.data[statekey-1].schools[schoolkey-1].employers.map((organisations, i) => (
           <Picker.Item label={organisations.name} value={organisations.value} key={i} />
        ))
      }
  }

  loadEmploymentStatus(statekey, schoolkey, organisationkey) {
    if (statekey == 0 || schoolkey == 0 || organisationkey == 0) {
      return <Picker.Item label="" value="choose"/>
    } else {
      return this.state.data[statekey-1].schools[schoolkey-1].employers[organisationkey-1].employmentstatus.map((employmentstatus, i) => (
         <Picker.Item label={employmentstatus.name} value={employmentstatus.value} key={i} />
      ))
    }
}



  _saveSchoolValues(itemValue, itemIndex) {
    if(itemIndex>0 && itemValue != "choose"){
      this.setState({
        selectedSchool: itemValue,
        selectedSchoolKey: itemIndex,
        school_category: this.state.data[this.state.selectedStateKey-1].schools[itemIndex-1].category,
        school_region: this.state.data[this.state.selectedStateKey-1].schools[itemIndex-1].region,
        school_region_type: this.state.data[this.state.selectedStateKey-1].schools[itemIndex-1].region_type,
        school_sponsoring_agency: this.state.data[this.state.selectedStateKey-1].schools[itemIndex-1].sponsoring_agency,
        school_location: this.state.data[this.state.selectedStateKey-1].schools[itemIndex-1].location_map,
      })
    }
  }

  _saveOrganisationValues(itemValue, itemIndex) {
    if(itemIndex>0 && itemValue != "choose"){
      this.setState({
        selectedOrganisation: itemValue,
        selectedOrganisationKey: itemIndex
      })
    }
  }

  _saveEmploymentStatusValues(itemValue, itemIndex) {
    if(itemIndex>0 && itemValue != "choose"){
      this.setState({
        selectedEmploymentStatus: itemValue,
        selectedEmploymentStatusKey: itemIndex
      })
    }
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
    //AsyncStorage.setItem('email', values.email)
    //AsyncStorage.setItem('mobile_number', values.mobile_number)
    //AsyncStorage.setItem('password', values.password)
    this.setState({ 'bpl_cert_no': values.bpl_cert_no })
    this.setState({ 'bpl_authority': values.bpl_authority })
    this.setState({ 'aadhar': values.aadhar })
    //alert(JSON.stringify('save_check'))
  }

  _handleSubmit = (values) => {
    //this._saveValues(values);
    this.setState({ 'bpl_cert_no': values.bpl_cert_no })
    this.setState({ 'bpl_authority': values.bpl_authority })
    this.setState({ 'aadhar': values.aadhar })
    //this._signup(values);
  }

  _goforward = () => {
    this.props.navigation.navigate('Form2')
  }

  _gobackward = () => {
    this.props.navigation.navigate('Form1')
  }

  addRow = (key) => {
    let transferDetails = this.state.transferDetails;
    transferDetails.push(
      <View key = {key} style={{borderWidth:1, marginHorizontal:15, marginVertical:10}}>
        <Formik
        enableReinitialize
        initialValues={{
          office:'',
          joining:'',
          release:'',
          stay_period:'',
          transferred_office:'',
          office_distance:'',
          order_number:''          
        }}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          //captcha: Yup.string()
          //  .required('Please enter captcha code shown above')
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
              label={I18n.t('form3.office_label')}
              value={values.office}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='office'
              error={touched.office && errors.office}
        />

        <Input
              label={I18n.t('form3.joining_label')}
              value={values.joining}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='joining'
              error={touched.joining && errors.joining}
        />

        <Input
              label={I18n.t('form3.release_date_label')}
              value={values.release}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='release'
              error={touched.release && errors.release}
        />

        <Input
              label={I18n.t('form3.stay_period_label')}
              value={values.stay_period}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='stay_period'
              error={touched.stay_period && errors.stay_period}
        />

        <Input
              label={I18n.t('form3.transferred_office_label')}
              value={values.transferred_office}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='transferred_office'
              error={touched.transferred_office && errors.transferred_office}
        />

        <Input
              label={I18n.t('form3.office_distance_label')}
              value={values.office_distance}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='office_distance'
              error={touched.office_distance && errors.office_distance}
        />

        <Input
              label={I18n.t('form3.transfer_order_number_label')}
              value={values.order_number}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
              name='order_number'
              error={touched.order_number && errors.order_number}
        />
        <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{
          width: 100,
          backgroundColor: '#ff7043',
          borderRadius: 15,
          paddingVertical: 12,
          marginVertical: 10,
          alignItems: 'center',}}
          onPress={() => this.deleteRow(this.state.transferDetails.length)} >
            <Text style={formStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
        </View>
        </React.Fragment>
        )}
        />
      </View>
    );
    this.setState({transferDetails});
  }

  deleteRow = (key) => {
    let transferDetails = this.state.transferDetails;
    transferDetails.splice({key}, 1);
    this.setState({transferDetails});
  }


  render() {
    return (
      <View style={{flex: 1}}>
      <Header header='3/5 Choice of Schools' onPress={this._header} onLogout={this._logout} toggleLang={this._toggleLang} />
      {RenderIf(true)(
      <FormHeader goforward={this._goforward} gobackward={this._gobackward} />
        )}
      <KeyboardAwareView>
        <View style={{
          //alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          height: '100%',}}>
        <ScrollView>
        <View>
                        <Formik
                          initialValues={
                            {
                              mother_name:'',
                            }}
                          onSubmit={this._handleSubmit}
                          validationSchema={Yup.object().shape({
                            mother_name:Yup.string()
                                //.required()
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
                            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                            <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form3.state_label')}</Text>
                            </View>
                            <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                            <Picker
                                selectedValue={this.state.selectedState}
                                onValueChange={(itemValue, itemIndex) =>{
                                  this.setState({selectedState: itemValue})
                                  this.setState({selectedStateKey: itemIndex})
                                }}>
                                <Picker.Item label="Choose state" />
                                {this.loadStates()}
                            </Picker>
                            </View>

                            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                            <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form3.school_label')}</Text>
                            </View>
                            <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                            <Picker
                                selectedValue={this.state.selectedSchool}
                                onValueChange={(itemValue, itemIndex) =>{
                                  this._saveSchoolValues(itemValue, itemIndex)
                                  // this.state.selectedStateKey,this.state.selectedSchoolKey)
                                }}>
                                <Picker.Item label="Choose school" />
                                {this.loadSchools(this.state.selectedStateKey)}
                            </Picker>
                            </View>


                            <Input
                              label={I18n.t('form3.school_category')}
                              editable={false}
                              value={this.state.school_category}
                            />

                            <Input
                              label={I18n.t('form3.region')}
                              editable={false}
                              value={this.state.school_region}
                            />

                            <Input
                              label={I18n.t('form3.sponsoring_agency')}
                              editable={false}
                              value={this.state.school_sponsoring_agency}
                            />

                            <Input
                              label={I18n.t('form3.school_location_map')}
                              editable={false}
                              value={this.state.school_location}
                            />

                            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                                <Text style={{fontWeight: 'bold'}}>{I18n.t('form3.school_distance_label')}</Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <RadioForm
                                  radio_props={[
                                    {label: I18n.t('form3.school_distance_less_5km_label'), value: '1' },
                                    {label: I18n.t('form3.school_distance_more_5km_label'), value: '0' }
                                  ]}
                                  initial={3}
                                  formHorizontal={false}
                                  labelHorizontal={true}
                                  buttonColor={'grey'}
                                  buttonSize={7}
                                  buttonOuterSize={20}
                                  animation={true}

                                  selectedButtonColor={'#ff7043'}
                                  onPress={(value) => {this.setState({isPH:value})}}
                                />
                            </View>

                            <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 20, elevation: 3, }}>
                            <Text style={{paddingHorizontal: 15, paddingVertical: 5}} > {I18n.t('form3.service_category_instr1')}</Text>
                            <Text style={{paddingHorizontal: 15, paddingVertical: 5, fontWeight:'bold'}}> {I18n.t('form3.service_category_instr2')}</Text>
                            </View>

                            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                            <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form3.organisation_label')}</Text>
                            </View>
                            <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                            <Picker
                                selectedValue={this.state.selectedOrganisation}
                                onValueChange={(itemValue, itemIndex) =>{
                                  this._saveOrganisationValues(itemValue, itemIndex)
                                  // this.state.selectedStateKey,this.state.selectedSchoolKey)
                                }}>
                                <Picker.Item label="Choose organisation" />
                                {this.loadOrganisations(this.state.selectedStateKey, this.state.selectedSchoolKey)}
                            </Picker>
                            </View>


                            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                            <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form3.employment_status_label')}</Text>
                            </View>
                            <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                            <Picker
                                selectedValue={this.state.selectedEmploymentStatus}
                                onValueChange={(itemValue, itemIndex) =>{
                                  this._saveEmploymentStatusValues(itemValue, itemIndex)
                                  // this.state.selectedStateKey,this.state.selectedSchoolKey)
                                }}>
                                <Picker.Item label="Choose Employment Status" />
                                {this.loadEmploymentStatus(this.state.selectedStateKey,this.state.selectedSchoolKey, this.state.selectedOrganisationKey)}
                            </Picker>
                            </View>

                            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                            <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form3.service_category_label')}</Text>
                            </View>
                            <View style={{alignItems: 'center', marginLeft:40, marginRight:40}}>
                            <RadioForm
                              radio_props={[
                                {label: I18n.t('form3.service_category_1_label'), value: '1' },
                                {label: I18n.t('form3.service_category_2_label'), value: '2' }
                              ]}
                              initial={30}
                              disabled={this.state.selectedEmploymentStatusKey!='0'?true:false}
                              formHorizontal={false}
                              labelHorizontal={true}
                              buttonColor={'grey'}
                              buttonSize={7}
                              buttonOuterSize={20}
                              animation={true}
                              selectedButtonColor={'#ff7043'}
                              onPress={(value) => {this.setState({servicecategory:value})}}
                            />
                            </View>

                            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                            <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form3.transfer_label')}</Text>
                            </View>
                            <View style={{borderWidth:1, borderRadius:5 , margin: 20, marginTop: 0}}>
                            <Picker
                                selectedValue={this.state.transferParent}
                                onValueChange={(itemValue, itemIndex) =>{
                                  this.setState({'transferParent': itemValue})
                                }}>
                                <Picker.Item label="Choose" />
                                <Picker.Item label="Father" value='1' />
                                <Picker.Item label="Mother" value='2' />
                                <Picker.Item label="GrandParent" value='3' />
                                <Picker.Item label="Not Applicable" value='4' />
                            </Picker>
                            </View>

                            <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                            <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form3.grandparent_transfer_label')}</Text>
                            </View>
                            <View style={{alignItems: 'center', marginLeft:40, marginRight:40}}>
                            <RadioForm
                              radio_props={[
                                {label: 'Yes', value: '1' },
                                {label: 'No / Not Applicable', value: '2' }
                              ]}
                              initial={3}
                              //disabled={this.state.selectedEmploymentStatusKey!='0'?true:false}
                              formHorizontal={false}
                              labelHorizontal={true}
                              buttonColor={'grey'}
                              buttonSize={7}
                              buttonOuterSize={20}
                              animation={true}
                              selectedButtonColor={'#ff7043'}
                              onPress={(value) => {this.setState({transferGrandparent:value})}}
                            />
                            </View>
                            
                            <HideView hide={this.state.transferGrandparent=='1'?false:true}>
                            <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 20, elevation: 3, }}>
                            <Text style={{paddingHorizontal: 15, paddingVertical: 5}} > {I18n.t('form3.transfer_instr1')}</Text>
                            </View>
                            
                            {/* {this.loadRow()} */}
                            {this.state.transferDetails.map((value, index) => {
                              return value
                            })}

                            <View style={{alignItems: 'center'}}>
                              <TouchableOpacity style={{
                                width: 150,
                                backgroundColor: '#ff7043',
                                borderRadius: 15,
                                paddingVertical: 12,
                                marginVertical: 10,
                                alignItems: 'center',}}
                                onPress={() => this.addRow(this.state.transferDetails.length)} >
                                  <Text style={formStyles.buttonText}>Add New Row</Text>
                              </TouchableOpacity>
                            

                            </View>

                            </HideView>

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
