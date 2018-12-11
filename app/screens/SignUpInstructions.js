import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  WebView,
  AsyncStorage,
} from 'react-native';
import { CheckBox } from 'react-native-elements'
var generalStyles = require('../styles/generalStyles');
var formStyles = require('../styles/formStyles');
import InstructionWebView from '../components/InstructionWebView'
import Header from '../components/Header2'
import I18n from '../i18n/i18n';
import {setLocale} from '../i18n/i18n';

export default class SignUpInstructions extends React.Component {

  componentDidMount = () => {
    AsyncStorage.getItem('lang').then((value) => { this.setState({ 'currLang': 'hin' })} );
  }

  constructor(props) {
    super(props);

    this.state = {
      accept_instructions:false,
      isAccepted:'',
      currLang:'',
    }
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
      <View style={generalStyles.container}>
      <Header header = 'Instructions' toggleLang={this._toggleLang} />
      <View style={{flex:1}}>
        <InstructionWebView url='http://10.129.75.249/kvs/instructions.html' />
        <View style={{
            alignItems: 'center',           
            backgroundColor:'#f2f2f2',
            borderTopWidth:0.5,
            borderTopColor:'grey',
        }}>
          <CheckBox
            title={I18n.t('accept_instructions')}
            checkedColor="#ff7043"
            checked={this.state.accept_instructions}
            onPress={() => {
              if(this.state.accept_instructions==true){
                this.setState({accept_instructions: false})
                this.setState({isAccepted: 'no'})
              }
              else if (this.state.accept_instructions==false){
                this.setState({accept_instructions: true})
                this.setState({isAccepted: 'yes'})
              }
            }}
            //checkedIcon='dot-circle-o'
            //uncheckedIcon='circle-o'
           >
          </CheckBox>
          <TouchableOpacity 
            style={{
              width: 300,
              backgroundColor: '#ff7043',
              borderRadius: 15,
              paddingVertical: 12,
              marginBottom: 10,
              alignItems: 'center',
            }}
            disabled={this.state.isAccepted=='yes'?false:true} 
            onPress={() => this.props.navigation.navigate('SignUpForm')} >
            <Text style={formStyles.buttonText}>{I18n.t('proceed')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      </View>
    );
  }
}
