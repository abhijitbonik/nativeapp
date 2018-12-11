import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
var generalStyles = require('../styles/generalStyles');

const TransferDetails = (props) => {
  return(
    <View style={{borderWidth:1, marginHorizontal:15, marginVertical:10}}>
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
  )
}

const styles = StyleSheet.create({
  navBar: {
    //height: '15',
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftNav: {
    height: 55,
    backgroundColor: 'white',
    //elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5
  }

});

export default TransferDetails
