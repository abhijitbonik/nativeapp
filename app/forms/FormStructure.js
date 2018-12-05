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

export default class SignUpForm extends React.Component {

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
      first_name:'',
      middle_name:'',
      last_name:'',
      birthdate:'',
      currLang: '',
      c_gender:'',
      sgc:'',
      twin:'',
      linkapp:'',
      income:'',
      bpl_cert_no:'',
      bpl_cert_date:'',
      bpl_authority:'',
      isPH:'',
      phtype:'',
      caste:'',
      rte:'',
      kvs_ward:'',
      blood_group:'',
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

  render() {
    return (
      <View style={{flex: 1}}>
      <Header header='1/5. Basic Information' onPress={this._header} onLogout={this._logout} toggleLang={this._toggleLang} />
      {RenderIf(true)(
      <FormHeader goforward={this._goforward} />
        )}
      <KeyboardAwareView>
        <View style={{
          //alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          height: '90%',}}>
        <ScrollView>
        <View>
                        <Formik
                          initialValues={{bpl_cert_no:'', bpl_authority:'', linking_code:'',}}
                          onSubmit={this._handleSubmit}
                          validationSchema={Yup.object().shape({
                            bpl_cert_no: Yup.string()
                              .required(),
                            bpl_authority: Yup.string()
                                .required(),
                            linking_code: Yup.string()
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
                                label={I18n.t('form1.fname')}
                                value={this.state.first_name}
                                editable={false}
                                name='first_name'
                              />
                              <Input
                                label={I18n.t('form1.mname')}
                                editable={false}
                                value={this.state.middle_name}
                                name='middle_name'
                              />
                              <Input
                                label={I18n.t('form1.lname')}
                                editable={false}
                                value={this.state.last_name}
                                name='last_name'
                              />
                              <Input
                                label={I18n.t('form1.birthdate')}
                                editable={false}
                                value={this.state.birthdate}
                                name='birthdate'
                              />

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('reg_ph')}</Text>
                              </View>
                              <View style={{alignItems: 'center'}}>
                              <RadioForm
                              //this is not changeable field ... look into this using initial props and removing onPress
                                radio_props={ph_props}
                                initial={3}
                                disabled={true}
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

                              {/* below field is disabled till above ph is set yes... and populate ph types */}
                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.phtype')}</Text>
                              </View>
                              <View style={{borderWidth:1, borderRadius:5 , margin: 20}}>
                              <Picker
                                selectedValue={this.state.phtype}
                                style={{ height: 50, width: 350 }}
                                enabled={false}
                                onValueChange={(itemValue, itemIndex) => this.setState({phtype: itemValue})}>
                                <Picker.Item label="Choose..." />
                                <Picker.Item label="populate types" value="x" />
                              </Picker>
                              </View>

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.gender')}</Text>
                              </View>
                              <View style={{borderWidth:1, borderRadius:5 , margin: 20}}>
                              <Picker
                                selectedValue={this.state.c_gender}
                                style={{ height: 50, width: 350 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({c_gender: itemValue})}>
                                <Picker.Item label="Choose..." />
                                <Picker.Item label="Female" value="female" />
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Third Gender" value="thirdgender" />
                              </Picker>
                              </View>

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.caste')}</Text>
                              </View>
                              <View style={{borderWidth:1, borderRadius:5 , margin: 20}}>
                              <Picker
                                selectedValue={this.state.caste}
                                style={{ height: 50, width: 350 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({caste: itemValue})}>
                                <Picker.Item label="Choose..." />
                                <Picker.Item label="General" value="gen" />
                                <Picker.Item label="OBC (Creamy Layer)" value="obc_cl" />
                                <Picker.Item label="OBC (Non Creamy Layer)" value="obc_ncl" />
                                <Picker.Item label="SC" value="sc" />
                                <Picker.Item label="ST" value="st" />
                              </Picker>
                              </View>

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.sgc')}</Text>
                              </View>
                              <View style={{alignItems: 'center'}}>
                              <RadioForm
                                radio_props={ph_props}
                                initial={5}
                                formHorizontal={true}
                                labelHorizontal={true}
                                buttonColor={'grey'}
                                buttonSize={7}
                                buttonOuterSize={20}
                                animation={true}
                                selectedButtonColor={'#ff7043'}
                                onPress={(value) => {this.setState({sgc:value})}}
                              />
                              </View>

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.twin')}</Text>
                              </View>
                              <View style={{alignItems: 'center'}}>
                              <RadioForm
                                radio_props={ph_props}
                                initial={5}
                                formHorizontal={true}
                                labelHorizontal={true}
                                buttonColor={'grey'}
                                buttonSize={7}
                                buttonOuterSize={20}
                                animation={true}
                                selectedButtonColor={'#ff7043'}
                                onPress={(value) => {this.setState({twin:value})}}
                              />
                              </View>

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold', marginRight: 20}}>{I18n.t('form1.linkapp')}</Text>
                              </View>
                              <View style={{alignItems: 'center'}}>
                              <RadioForm
                                radio_props={[
                                  {label: I18n.t('form1.linkapp1'), value: 'yes' },
                                  {label: I18n.t('form1.linkapp2'), value: 'no' }
                                ]}
                                initial={5}
                                //formHorizontal={true}
                                labelHorizontal={true}
                                buttonColor={'grey'}
                                animation={true}
                                selectedButtonColor={'#ff7043'}
                                onPress={(value) => {this.setState({linkapp:value})}}
                              />
                              </View>

                              <Input
                                label={I18n.t('form1.linking_code')}
                                placeholder='Linking Code'
                                value={values.linking_code}
                                onChange={setFieldValue}
                                onTouch={setFieldTouched}
                                name='linking_code'
                                error={touched.linking_code && errors.linking_code}
                              />

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.income_group')}</Text>
                              </View>
                              <View style={{alignItems: 'center'}}>
                              <RadioForm
                                radio_props={[
                                  {label: I18n.t('form1.income_group1'), value: 'other' },
                                  {label: I18n.t('form1.income_group2'), value: 'ews' },
                                  {label: I18n.t('form1.income_group3'), value: 'bpl' }
                                ]}
                                initial={5}
                                //formHorizontal={true}
                                labelHorizontal={true}
                                buttonColor={'grey'}
                                animation={true}
                                selectedButtonColor={'#ff7043'}
                                onPress={(value) => {this.setState({income:value})}}
                              />
                              </View>

                              <Input
                                label={I18n.t('form1.bpl_cert_no')}
                                placeholder='Certificate Number'
                                value={values.bpl_cert_no}
                                onChange={setFieldValue}
                                onTouch={setFieldTouched}
                                name='bpl_cert_no'
                                error={touched.bpl_cert_no && errors.bpl_cert_no}
                              />

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.bpl_cert_date')}</Text>
                              </View>
                              <DatePicker
                                style={formStyles.date}
                                date={this.state.bpl_cert_date}
                                mode="date"
                                placeholder="DD-MM-YYYY"
                                //placeholderTextColor='red'
                                format="DD-MM-YYYY"
                                //minDate="01-01-2011"  //check ph condition and set accordingly
                                //maxDate="01-01-2013"  //check ph condition and set accordingly
                                //minDate={{this.state.isPH?"01-01-2011":"01-01-2001"}}
                                maxDate={this.state.rte=='yes'?"31-01-2013":"15-01-2013"}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                  dateIcon: { width: 0, height: 0},
                                  dateInput: {
                                    //backgroundColor:'red'
                                  }
                                 }}
                                onDateChange={(date) => {this.setState({bpl_cert_date: date})}}
                              />
                              <Text style={{fontWeight: 'bold',marginRight: 20, margin: 20,}}>{I18n.t('form1.bpl_cert_note')}</Text>

                              <Input
                                label={I18n.t('form1.bpl_authority')}
                                placeholder='Certificate Issuing Authority'
                                value={values.bpl_authority}
                                onChange={setFieldValue}
                                onTouch={setFieldTouched}
                                name='bpl_authority'
                                error={touched.bpl_authority && errors.bpl_authority}
                              />

                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.rte')}</Text>
                              </View>
                              <View style={{alignItems: 'center'}}>
                              <RadioForm
                              //this is not changeable field ... look into this using initial props and removing onPress
                                radio_props={ph_props}
                                initial={3}
                                formHorizontal={true}
                                labelHorizontal={true}
                                buttonColor={'grey'}
                                animation={true}
                                selectedButtonColor={'#ff7043'}
                                onPress={(value) => {this.setState({rte:value})}}
                              />
                              </View>
                              <Text style={{fontWeight: 'bold', margin: 20,marginRight: 20}}>{I18n.t('form1.rte_note')}</Text>


                              {/*
                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('reg_kvsward')}</Text>
                              </View>
                              <View style={{borderWidth:1, borderRadius:5 , margin: 20}}>
                              <Picker
                                selectedValue={this.state.kvs_ward}
                                style={{ height: 50, width: 350 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({kvs_ward: itemValue})}>
                                <Picker.Item label="Choose..." />
                                <Picker.Item label="Not Applicable" value="notapplicable" />
                                <Picker.Item label="Working Parent" value="workingparent" />
                                <Picker.Item label="Retired Parent" value="retiredparent" />
                                <Picker.Item label="Working Grandparent" value="workinggrandparent" />
                                <Picker.Item label="Retired Grandparent" value="retiredgrandparent" />
                              </Picker>
                              </View>
                              */}

                              <Input
                                label={I18n.t('reg_kvsward')}
                                value={this.state.kvs_ward}
                                editable={false}
                                name='kvs_ward'
                              />


                              <View style={{alignItems:'flex-start', paddingVertical: 15, paddingLeft: 40}}>
                              <Text style={{fontWeight: 'bold',marginRight: 20}}>{I18n.t('form1.blood_group')}</Text>
                              </View>
                              <View style={{borderWidth:1, borderRadius:5 , margin: 20}}>
                              <Picker
                                selectedValue={this.state.blood_group}
                                style={{ height: 50, width: 350 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({blood_group: itemValue})}>
                                <Picker.Item label="Choose..." />
                                <Picker.Item label="A +ve" value="a+" />
                                <Picker.Item label="A -ve" value="a-" />
                                <Picker.Item label="B +ve" value="b+" />
                                <Picker.Item label="B -ve" value="b-" />
                                <Picker.Item label="AB +ve" value="ab+" />
                                <Picker.Item label="AB -ve" value="ab-" />
                                <Picker.Item label="O +ve" value="o+" />
                                <Picker.Item label="O -ve" value="o-" />
                              </Picker>
                              </View>
                              <View style={{alignItems: 'center'}}>
                              <TouchableOpacity style={formStyles.button} onPress={handleSubmit} >
                                <Text style={formStyles.buttonText}>Save Application</Text>
                              </TouchableOpacity>
                              <Text>.</Text>
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
