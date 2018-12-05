'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

  buttonText:{
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  inputBox:{
    width: 300,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },
  date:{
    width: 362,
    backgroundColor: '#fff',
    //borderRadius: 5,
    marginVertical: 10,
    marginLeft:20,
    //borderWidth:1
  },
  dateIcon: { width: 0, height: 0
  },
  dateTouchBody: {
    backgroundColor:'#fff',
    padding:0
  },
  dateInput: {
    backgroundColor:'#fff',
    padding:0,
    margin:0,
    width:'100%',
    height:50,
    alignItems:'flex-start',
    paddingLeft:5,
    borderWidth:1,
    borderColor:'black',
    borderRadius:5
  },
  button:{
    width: 300,
    backgroundColor: '#ff7043',
    borderRadius: 15,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
    //paddingBottom:  15

  },

});
