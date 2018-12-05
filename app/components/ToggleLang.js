import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import {setLocale} from '../i18n/i18n';

var currLang;
export const ToggleLang = () => {
  //this.state.currLang = AsyncStorage.getItem('lang');
  // AsyncStorage.getItem('lang').then((value) => {
  //   if(value == 'en') {
  //     this.setState({ 'currLang': 'hin' });
  //   } else {
  //     this.setState({ 'currLang': 'en' });
  //   }
  //   AsyncStorage.setItem('lang', this.state.currLang);
  //   setLocale(this.state.currLang);
  // })
  AsyncStorage.getItem('lang').then((value) => {
    if(value == 'en') {
      this.currLang = 'hin';
    } else {
      this.currLang = 'en';
    }
    AsyncStorage.setItem('lang', this.currLang);
    setLocale(this.currLang);
  })
}

// export const ToggleLang
