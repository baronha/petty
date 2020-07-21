import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Easing,
  Animated,
} from 'react-native';
import style from './style';
import colors from '../../utils/colors';

const ToggleSwitch = ({onPress, theme}) => {
  const [animatedValue] = useState(new Animated.Value(theme ? 50 : 0));

  const backgroundSwitch = animatedValue.interpolate({
    inputRange: [0, 20],
    outputRange: [colors.skyDayToggle, colors.skyNightToggle],
    extrapolate: 'clamp',
  });
  const crater = animatedValue.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nightMoonColor = animatedValue.interpolate({
    inputRange: [0, 20],
    outputRange: [colors.sunToggle, colors.nightMoonColor],
    extrapolate: 'clamp',
  });
  const starSize = animatedValue.interpolate({
    inputRange: [0, 20],
    outputRange: [30, 2],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: theme ? 50 : 0,
      duration: 500,
      easing: Easing.bezier(0.75, -0.25, 0.25, 1.25),
      delay: 0,
    }).start();
  }, [theme]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[style.button, {backgroundColor: backgroundSwitch}]}>
        <Animated.View
          style={[
            style.switch,
            {
              transform: [
                {
                  translateX: animatedValue,
                },
              ],
              backgroundColor: nightMoonColor,
            },
          ]}>
          <Animated.View
            style={[style.crater, style.crater_1, {opacity: crater}]}
          />
          <Animated.View
            style={[style.crater, style.crater_2, {opacity: crater}]}
          />
          <Animated.View
            style={[style.crater, style.crater_3, {opacity: crater}]}
          />
        </Animated.View>
        <Animated.View
          style={[
            style.star,
            style.star_1,
            {
              width: starSize,
            },
          ]}
        />
        <Animated.View
          style={[
            style.star,
            style.star_2,
            {
              width: starSize,
            },
          ]}
        />
        <Animated.View
          style={[
            style.star,
            style.star_3,
            {
              width: starSize,
            },
          ]}
        />
        <Animated.View style={[style.star, style.star_4, {opacity: crater}]} />
        <Animated.View style={[style.star, style.star_5, {opacity: crater}]} />
        <Animated.View style={[style.star, style.star_6, {opacity: crater}]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ToggleSwitch;
