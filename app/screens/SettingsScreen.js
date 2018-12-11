import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Switch
} from 'react-native';
var generalStyles = require('../styles/generalStyles');
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from 'react-navigation';
import I18n from '../i18n/i18n';


// class Demo extends React.Component {
//   render () {
//     return (
//       <Text>{I18n.t('greeting')}</Text>
//     )
//   }
// }

export default class SettingsScreen extends React.Component {
  // static navigationOptions = {
  //   title: I18n.t('menu_settings'),
  //   drawerIcon:(
  //     <Icon name="md-settings" size={25} />
  //   )
  // };

  toggleLanguage(val) {
  if (val) {
      AsyncStorage.setItem('@preferences:language', 'hin');
    } else {
      AsyncStorage.setItem('@preferences:language', 'en');
    }
  }

// currentLanguage = async () => {
//   try {
//     const value = AsyncStorage.getItem('@preferences:language');
//     if (value !== null) {
//       if (value == 'en') {
//         return false;
//       } else {
//         return true;
//       }
//     } else {
//       return true;
//     }
//    } catch (error) {
//      console.log(error);
//    }
//   }
  // language = this.currentLanguage;

  render() {
    return (
      <View style={generalStyles.container}>

      <View style={generalStyles.navBar}>
        <View style={generalStyles.leftNav}>
          <TouchableOpacity onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
          <Icon name="md-menu" size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ScrollView>
          <Text>Change language to Hindi</Text>
            <Switch onValueChange={this.toggleLanguage}></Switch>
        </ScrollView>
      </View>
      </View>

    );
  }
}

