import React, { PureComponent} from 'react'
import {
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import CookieManager from 'react-native-cookies';
import Icon from 'react-native-vector-icons/Ionicons';


class Captcha extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      captchavariable:new Date().getTime()
    };
  }

  componentDidMount = () => {
    CookieManager.get('http://10.129.155.117:8084/kvs-portal/register.html')
      .then((res) => {
        console.log('CookieManager.get =>', res); // => 'user_session=abcdefg; path=/;'        
        AsyncStorage.setItem('cookies', res.JSESSIONID);
      });
  }

  refreshCaptcha = () =>{
    this.setState({'captchavariable':new Date().getTime()})
  } 

  render(){
    return(
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:10}}>
      <Image
        style={{width: 300, height: 60, marginTop: 35, marginBottom: 5, marginLeft: 25}}
        source={{uri: 'http://10.129.155.117:8084/kvs-portal/easycaptcha?refresh='+this.state.captchavariable}}
      />
      <TouchableOpacity 
        style={{width:50, height:50, alignItems:'center', marginRight:50}}
        onPress={ 
          () => this.refreshCaptcha()
        }
      >
      <Icon name="md-refresh" size={50} />
      </TouchableOpacity>
      </View>
    );
  }
}
export default Captcha;
