import React, { PureComponent} from 'react'
import {
  View,
  Image,
  AsyncStorage
} from 'react-native'
import CookieManager from 'react-native-cookies';


class Captcha extends PureComponent {

  componentDidMount = () => {
    CookieManager.get('http://10.129.155.117:8084/kvs-portal/register.html')
      .then((res) => {
        console.log('CookieManager.get =>', res); // => 'user_session=abcdefg; path=/;'        
        AsyncStorage.setItem('cookies', res.JSESSIONID);
      });
  }

  render(){
    return(
      <Image
        style={{width: 300, height: 60, marginTop: 35, marginBottom: 5, marginHorizontal: 15}}
        source={{uri: 'http://10.129.155.117:8084/kvs-portal/easycaptcha?refresh='+new Date().getTime()}}
      />
    );
  }
}
export default Captcha;
