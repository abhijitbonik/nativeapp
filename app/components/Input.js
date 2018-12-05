import React, { PureComponent} from 'react'
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import {
  FormInput,
  FormValidationMessage,
  FormLabel,
} from 'react-native-elements'


class Input extends PureComponent {
  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);

  };

  render(){
    const {label, error, keyboardType, placeholder, ...rest} = this.props;
    return(
      <View style = {styles.container}>
        <View style = {{paddingBottom:10}}>
        <FormLabel>{label}</FormLabel>
        </View>
        <View style ={{borderWidth:1, borderRadius:5 }}>
        <TextInput
          //multiline={true}
          onChangeText={this._handleChange}
          placeholder={placeholder}
          onBlur={this._handleTouch}
          keyboardType={keyboardType}
          {...rest}
        />
        </View>
        {error && <FormValidationMessage>{error} </FormValidationMessage>}


      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  }
})

export default Input;
