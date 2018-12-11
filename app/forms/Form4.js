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
  Modal,
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
import FormHeader from '../components/FormHeader'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import ImagePicker from 'react-native-image-crop-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob'
import  RNFS from 'react-native-fs'
export default class Form4 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      images: null,
      rowVisible:false,
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
    this.props.navigation.navigate('Form5')
  }

  _gobackward = () => {
    this.props.navigation.navigate('Form3')
  }

  _generateLinkingCode = () =>{
    this.setState({linking_code:'XXXXXXXX'})
    alert('Code to Generate Linking Code')
  }

  setRowVisible(visible) {
    console.log('state value before: ', this.state.rowVisible)
    console.log('inside function, modal visible: ', visible)
    this.setState({'rowVisible': visible});
    console.log('state value after: ', this.state.rowVisible)
  }

  tryFunction = async (url) =>{
    await fetch(url)
    .then((data) =>{
      console.log("datattttttt .. ", data)
    })
  }

  uploadPdf = async(url, fname, fpath) =>{
    console.log("inside function")
    console.log(
      "file url: " , url,
      "filename: ",fname,
      "file path: ",fpath
    )
    console.log("request data: ",RNFetchBlob.wrap(fpath))
    await RNFetchBlob.fetch('POST', url, {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      // this is required, otherwise it won't be process as a multipart/form-data request
      'Content-Type' : 'multipart/form-data',
    }, [
      // append field data from file path
      {
        name : 'file',
        filename : fname,
        data: RNFetchBlob.wrap(fpath)
      },
    ]).then((resp) => {
      console.log("upload reesponse ", resp)
    }).catch((err) => {
      console.log("error: ", err)
    })
  }

  // uploadPdf = async (uploadUrl, name, realPath) =>{
  //   await RNFS.uploadFiles({
  //     toUrl: uploadUrl,
  //     files: [{
  //        name,
  //        filename:name,
  //        filepath: realPath,
  //      }],
  //     method: 'POST',
  //     headers: {
  //        'Accept': 'application/json',
  //     },
  //     })
  //     .then((response) => {
  //       console.log(response,"<<< Response");
  //       if (response.statusCode == 200) { //You might not be getting a statusCode at all. Check
  //          console.log('FILES UPLOADED!');
  //        } else {
  //          console.log('SERVER ERROR');
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.description) {
  //           switch (err.description) {
  //             case "cancelled":
  //               console.log("Upload cancelled");
  //               break;
  //             case "empty":
  //               console.log("Empty file");
  //             default:
  //              //Unknown
  //           }
  //         } else {
  //          //Weird
  //         }
  //         console.log(err);
  //      });
  // }

  
  render() {
    return (
      <View style={{flex: 1}}>
      <Header header='4/5 Upload Documents' onPress={this._header} onLogout={this._logout} toggleLang={this._toggleLang} />
      {RenderIf(true)(
      <FormHeader goforward={this._goforward} gobackward={this._gobackward}/>
        )}
      <KeyboardAwareView>
        <View style={{
          //alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          height: '100%',}}>
        <ScrollView>
        <View>

        <View style={{backgroundColor: '#d1ecf1', justifyContent: 'center', margin: 20, elevation: 3, }}>
        <Text style={{paddingHorizontal: 15, paddingVertical: 5}} > {I18n.t('form4.instr1')}</Text>
        <Text style={{paddingHorizontal: 15, paddingVertical: 5}}> {I18n.t('form4.instr2')}</Text>
        <Text style={{paddingHorizontal: 15, paddingVertical: 5}}> {I18n.t('form4.instr3')}</Text>
        </View>


        <TouchableOpacity style={{
          width: 150,
          backgroundColor: '#ff7043',
          borderRadius: 15,
          paddingVertical: 12,
          marginVertical: 10,
          alignItems: 'center',}}
          onPress={() => {
            console.log("opening image")
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true
            }).then(image => {
              this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
                imageurl: image.path,
                images: null
              });
              console.log(image);
              console.log("image url: ", image.path)
              }).catch((err) => { 
                console.log("error: ", err)
               })
          }} >
            <Text style={formStyles.buttonText}>Upload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          width: 150,
          backgroundColor: '#ff7043',
          borderRadius: 15,
          paddingVertical: 12,
          marginVertical: 10,
          alignItems: 'center',}}
          onPress={() => {this.uploadPdf("http://10.129.155.204:50001/demo_file_upload", "imagenamell.jpg", this.state.imageurl)}} >
            <Text style={formStyles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          width: 150,
          backgroundColor: '#ff7043',
          borderRadius: 15,
          paddingVertical: 12,
          marginVertical: 10,
          alignItems: 'center',}}
          onPress={() => {
            console.log("opening pdf picker")
            DocumentPicker.show({
              filetype: [DocumentPickerUtil.pdf()],
            },(error,res) => {
              // Android
              // split = res.uri.split('/');
              // name = split.pop();
              // inbox = split.pop();
              // realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
              console.log(
                 "uri: ",res.uri,
                 "mime type: ",res.type, // mime type
                 "filename: ",res.fileName,
                 "filesize: ",res.fileSize,
              );
              // console.log('prev')
              // RNFetchBlob.fs.stat(res.uri)
              // .then((stats) => {
              //   console.log('file Path Rn: ', stats)
              // })
              // .catch((err) => {
              //   console.log('errorssss', err)
              // })
              // console.log('end')
              //this.tryFunction(res.uri)
              // realPath = "file://"+realPath;
              // console.log("before decoding ", realPath)
              // realPath = decodeURIComponent(realPath)
              // console.log('after decoding ', realPath)
              // realPath = "file://sdcard/"+realPath.split(":").pop()
              // console.log("before function realpath: ", realPath)

              this.uploadPdf("http://10.129.155.204:50001/demo_file_upload", res.fileName, res.uri)
              console.log("after function")
            });
          }} >
            <Text style={formStyles.buttonText}>Upload PDF</Text>
        </TouchableOpacity>

        {/* <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={this.state.image} /> */}

        


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.rowVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View>
            <View>
              <Text>Hello </Text>

              <TouchableOpacity
                style={{
                  width: 150,
                  backgroundColor: '#ff7043',
                  borderRadius: 15,
                  paddingVertical: 12,
                  marginVertical: 10,
                  alignItems: 'center',}}
                onPress={() => {
                  this.setRowVisible(!this.state.rowVisible);
                }}>
                <Text>Hide Modadl</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={{
            width: 150,
            backgroundColor: '#ff7043',
            borderRadius: 15,
            paddingVertical: 12,
            marginVertical: 10,
            alignItems: 'center',}}
          onPress={() => {
            this.setRowVisible(true);
          }}>
          <Text>Show Modald</Text>
        </TouchableOpacity>



        </View>
        </ScrollView>
        </View>
      </KeyboardAwareView>
      </View>
    );
  }
}
