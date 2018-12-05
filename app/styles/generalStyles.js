'use strict';
import { Dimensions} from 'react-native';
var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

  center_align: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: '80%',
  },
  container: {
    flex: 1,
    //backgroundColor: '#bcbcbc',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  content:{
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    },
  index1:{
    elevation: 3,
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontWeight: 'bold',
    fontSize: 16,
    padding:30,
    margin: 10,
    alignItems: 'center',

  },
  footer:{
    //height: '15%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  drawer:{
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: 'white'
  },
  drawerItems:{
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: 'white'
  }


});
