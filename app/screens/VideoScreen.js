import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  AsyncStorage,
} from 'react-native';

var generalStyles = require('../styles/generalStyles');
import { DrawerActions } from 'react-navigation';
import Header from '../components/Header'
import InstructionWebView from '../components/InstructionWebView'
import Icon from 'react-native-vector-icons/Ionicons';
//import YouTube from 'react-native-youtube'

export default class VideoScreen  extends React.Component {
  _header = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  }
  _logout =() =>{
    // remove session from AsyncStorage
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('IndexPage')
  }
  render() {
    return (
        <View style={generalStyles.container}>
        <Header onPress={this._header} onLogout={this._logout}/>

        <InstructionWebView url='https://www.youtube.com/channel/UC_iD8-SP3RO8o0Urbjcn6Mw' />
      
        </View>

        //<YouTube
      //    videoId="KVZ-P-ZI6W4"   // The YouTube video ID
      //    play={true}             // control playback of video with true/false
      //    fullscreen={true}       // control whether the video should play in fullscreen or inline
      //    loop={true}             // control whether the video should loop when ended
      //    onReady={e => this.setState({ isReady: true })}
      //    onChangeState={e => this.setState({ status: e.state })}
      //    onChangeQuality={e => this.setState({ quality: e.quality })}
    //    onError={e => this.setState({ error: e.error })}
    //      style={{ alignSelf: 'stretch', height: 300 }}
      //  />
    );
  }
}

