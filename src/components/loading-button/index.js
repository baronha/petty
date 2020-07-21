import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';
import style from './style';

const LoadingButton = props => {
  return (
    <TouchableOpacity
      disabled={props.isLoading ? true : false}
      {...props}
      style={[style.container, props.style]}>
      {props.isLoading ? (
        <Lottie
          style={style.lottie}
          autoPlay
          source={require('../../assets/lotties/loading.json')}
        />
      ) : (
        props.children || <Text style={style.text}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;
