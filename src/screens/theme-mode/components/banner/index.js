import React, {Component, useState, useEffect} from 'react';
import {View, Text, Image, Animated, Easing} from 'react-native';
import style from './style';
import colors from '../../utils/colors';

const Banner = ({theme}) => {
  const [animatedValue] = useState(new Animated.Value(theme ? 250 : 0));

  const backgroundSky = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [colors.sky, colors.skyNight],
    extrapolate: 'clamp',
  });
  const clouds = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 250],
    extrapolate: 'clamp',
  });
  const moon = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const trees = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [colors.tree, colors.treeNight],
    extrapolate: 'clamp',
  });
  const root = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [colors.root, colors.rootNight],
    extrapolate: 'clamp',
  });
  const hill = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [colors.hill, colors.hillNight],
    extrapolate: 'clamp',
  });
  const mountain = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [colors.mountain, colors.mountainNight],
    extrapolate: 'clamp',
  });
  const land = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [colors.land, colors.landNight],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: theme ? 250 : 0,
      duration: 500,
      easing: Easing.bezier(0.75, -0.25, 0.25, 1.25),
      delay: 0,
    }).start();
  }, [theme]);

  return (
    <View style={style.container}>
      <View style={style.bottomWindow} />
      <Image source={require('../../images/cat.png')} style={style.cat} />
      <View style={style.illustration}>
        <View style={style.time}>
          <Animated.View
            style={[
              style.sky,
              {
                backgroundColor: backgroundSky,
                width: 250,
                height: 250,
              },
            ]}
          />
          <Animated.Image
            source={require('../../images/sun.png')}
            style={[
              style.sun,
              style.image,
              {
                transform: [
                  {
                    translateY: animatedValue,
                  },
                ],
              },
            ]}
          />
          <Animated.Image
            source={require('../../images/clouds.png')}
            style={[
              style.clouds,
              style.image,
              {
                transform: [
                  {
                    translateX: clouds,
                  },
                ],
              },
            ]}
          />
          <Image
            source={require('../../images/star.png')}
            style={[style.star, style.image]}
          />
          <Animated.Image
            source={require('../../images/moon.png')}
            style={[
              style.moon,
              style.image,
              {
                opacity: moon,
              },
            ]}
          />
          <Animated.Image
            source={require('../../images/mountain.png')}
            style={[
              style.mountain,
              style.image,
              {
                tintColor: mountain,
              },
            ]}
          />
          <Animated.Image
            source={require('../../images/hill.png')}
            style={[
              style.hill,
              style.image,
              {
                tintColor: hill,
              },
            ]}
          />
          <Animated.Image
            source={require('../../images/land.png')}
            style={[
              style.land,
              style.image,
              {
                tintColor: land,
              },
            ]}
          />
          <Animated.Image
            source={require('../../images/roots.png')}
            style={[
              style.trees,
              style.image,
              {
                tintColor: root,
              },
            ]}
          />
          <Animated.Image
            source={require('../../images/trees.png')}
            style={[
              style.trees,
              style.image,
              {
                tintColor: trees,
              },
            ]}
          />
          <Image
            source={require('../../images/trees1.png')}
            style={[style.trees, style.image]}
          />
        </View>
      </View>
    </View>
  );
};

export default Banner;
