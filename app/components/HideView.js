import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

const HideView = (props) => {
  const { children, hide } = props;
  if (hide) {
    return null;
  }
  return (
    <View >
      { children }
    </View>
  );
};

export default HideView;
