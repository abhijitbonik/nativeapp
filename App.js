/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import {createDrawerNavigator, DrawerItems, createStackNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createMaterialTopTabNavigator} from 'react-navigation'

var generalStyles = require('./app/styles/generalStyles');
import Icon from 'react-native-vector-icons/Ionicons';

import SignUpForm from './app/forms/SignUpForm';
import ValidateOtp from './app/forms/ValidateOtp';
import ForgotPassword from './app/forms/ForgotPassword';
import ResetPassword from './app/forms/ResetPassword';
import ChangePassword from './app/forms/ChangePassword';
import SignUpInstructions from './app/screens/SignUpInstructions';
import Faq from './app/screens/Faq';
import LoginForm from './app/forms/LoginForm';
import IndexPage from './app/screens/IndexPage';
import PostRegister from './app/screens/PostRegister';
import LoggedInHome from './app/screens/LoggedInHome';
import Form4 from './app/forms/Form4'
import Form6 from './app/forms/Form6'



const IndexStack = createMaterialTopTabNavigator({
  Index: {
    screen: Form6,
    navigationOptions:{
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) =>(
      <Icon name='md-home' color={tintColor} size={24} />
      )
    }
    },
    Instructions: {screen: SignUpInstructions,
    navigationOptions:{
      tabBarLabel: 'Instructions',
      tabBarIcon: ({tintColor}) =>(
      <Icon name='md-information-circle' color={tintColor} size={24} />
      )
    }},
  Index1: {screen: Faq,
  navigationOptions:{
    tabBarLabel: 'FAQs',
    tabBarIcon: ({tintColor}) =>(
    <Icon name='md-help' color={tintColor} size={24} />
    )
  }},
  },
  {
    initialRouteName: 'Index',
    shifting:true,
    swipeEnabled:true,
    animationEnabled:true,
    tabBarPosition:'bottom',
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
        height:0
      },
      showIcon:true,
    }

    })

const SignUpStack = createStackNavigator({
  SignUpInstructions: {screen: SignUpInstructions},
  SignUpForm: { screen: SignUpForm },
  ValidateOtp: { screen: ValidateOtp },
  PostRegister: {screen: PostRegister},
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

const MainStack = createStackNavigator({
  IndexPage: {screen: IndexStack},
  SignUpStack: { screen: SignUpStack },
  LoginForm: { screen: LoginForm},
  LoggedInHome: {screen: LoggedInHome},
  ResetPassword: {screen: ResetPassword},
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export default MainStack;
