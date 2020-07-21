import React, {useEffect, useState} from 'react';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import style from './style';
import {TouchableOpacity, Animated} from 'react-native';

const ToggleSwich = ({value, onPress}) => {
  const theme = useTheme();
  const [animated] = useState(new Animated.Value(value ? 26 : 4));

  useEffect(() => {
    Animated.timing(animated, {
      toValue: value ? 26 : 4,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style.container,
        {
          backgroundColor: theme['background-basic-color-2'],
        },
      ]}>
      <Animated.View
        style={[
          style.dot,
          {
            backgroundColor: theme['text-basic-color'],
            transform: [{translateX: animated}],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default ToggleSwich;
