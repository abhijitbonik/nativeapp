import React from 'react';
import { WebView,Text } from 'react-native';
import { ConnectivityRenderer } from 'react-native-offline';

const InstructionWebView = (props) => (

  <ConnectivityRenderer>
      {isConnected => (
        isConnected ?
        (
          <WebView
            source = {{uri:props.url}}
          />
        )
        :
        (
          
          <Text> 'You are not connected to Internet'</Text>


        )
      )}
    </ConnectivityRenderer>
);





export default InstructionWebView;
