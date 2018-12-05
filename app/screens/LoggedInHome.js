import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  AsyncStorage
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation'
import {createDrawerNavigator, DrawerItems, createStackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
var generalStyles = require('../styles/generalStyles');
import LoggedInScreen from './LoggedInScreen'
import Instructions from './Instructions'
import DocSamples from './DocSamples';
import PrintApplication from './PrintApplication';
import CheckStatus from './CheckStatus';
import VideoScreen from './VideoScreen';
import SettingsScreen from './SettingsScreen';
import Form1 from '../forms/Form1'
import Form2 from '../forms/Form2'
import Form3 from '../forms/Form3'
import Form4 from '../forms/Form4'
import Form5 from '../forms/Form5'
import ChangePassword from '../forms/ChangePassword'
import Logo from '../components/Logo'
import I18n from '../i18n/i18n';
// I18n.setLocale('en')

const CustomDrawerContentComponent =(props) => (
  <View style={generalStyles.drawer}>
    <Logo/>
    <View style={generalStyles.drawerItems}>
    <DrawerItems {...props}/>
    </View>
  </View>
)

const SchoolChoiceStack = createMaterialTopTabNavigator({
  school_choice_one: {
    screen: Form3,
    navigationOptions:{
      tabBarLabel: 'Choice 1',
    }
    },
  school_choice_two: {
    screen: Form3,
    navigationOptions:{
      tabBarLabel: 'Choice 2',
    }
    },
  school_choice_three: {
    screen: Form3,
    navigationOptions:{
      tabBarLabel: 'Choice 3',
    }
    },
  },
  {
    initialRouteName: 'school_choice_one',
    shifting:true,
    swipeEnabled:true,
    animationEnabled:true,
    tabBarPosition:'top',
    tabBarOptions:{
      activeTintColor:'orange',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor:'#f2f2f2',
        borderTopWidth:0.5,
        borderTopColor:'grey',
        height:60,

      },
      indicatorStyle:{
        height:0.5
      },
      showIcon:false,
    }

    })

const FormStack = createStackNavigator({
  Form1:Form1,
  Form2:Form2,
  Form3:SchoolChoiceStack,
  Form4:Form4,
  Form5:Form5,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 })

const PrintStack = createStackNavigator({
  PrintHome:{ screen:PrintApplication}
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

const CheckStack = createStackNavigator({
  CheckHome:{ screen:CheckStatus}
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

const Drawer=createDrawerNavigator(
  {
    Index:{
    screen:FormStack,
    navigationOptions: {
    drawerLabel: 'Application Form',
    drawerIcon:(
      <Icon name="md-home" size={25} />
    )
  }
    },
    Instructions:{
    screen:Instructions,
    navigationOptions: {
    drawerLabel: 'Instructions',
    drawerIcon:(
      <Icon name="md-information-circle" size={25} />
    )
  }
    },
    DocSamples:{
    screen:DocSamples,
    navigationOptions: {
    drawerLabel: 'Sample Documents',
    drawerIcon:(
      <Icon name="md-document" size={25} />
    )
  }
    },
    PrintApplication:{
    screen:PrintStack,
    navigationOptions: {
    drawerLabel: 'Print Application',
    drawerIcon:(
      <Icon name="md-download" size={25} />
    )
  }
    },
    CheckStatus:{
    screen:CheckStack,
    navigationOptions: {
    drawerLabel: 'Check Status',
    drawerIcon:(
      <Icon name="md-search" size={25} />
    )
  }
    },
    Videos:{
      screen:VideoScreen,
      navigationOptions: {
      drawerLabel: 'Instruction Videos',
      drawerIcon:(
        <Icon name="md-play" size={25} />
      )
    }
    },
    ChangePassword:{
      screen:ChangePassword,
      navigationOptions: {
        drawerLabel:'Change Password',
        //title: I18n.t('menu_settings'),
        drawerIcon:(
          <Icon name="md-lock" size={25} />
        )
      }
    },
},
{
  initialRoutename: 'Home',
  drawerPosition: 'left',
  contentComponent:CustomDrawerContentComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
})

export default Drawer;
