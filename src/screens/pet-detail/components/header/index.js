import React from 'react';
import {
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import style from './style';
import {Animated, Dimensions} from 'react-native';
import {SafeAreaLayout} from '../../../../components/safe-area-layout';
import {BackIcon, MoreHoriontalIcon} from '../../../../utils/icon';
import NavigationService from '../../../../navigators/NavigationService';

const {width} = Dimensions.get('window');
const HEIGHT_SWIPER = width / 1.618;

const Header = ({scrollY, title}) => {
  const theme = useTheme();

  const opacity = scrollY.interpolate({
    inputRange: [0, HEIGHT_SWIPER / 2],
    outputRange: [0, 1],
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, HEIGHT_SWIPER],
    outputRange: [24, 12],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        style.container,
        {
          paddingVertical: translateY,
        },
      ]}>
      <Animated.View
        style={[
          style.background,
          {
            backgroundColor: theme['background-basic-tabbar'],
            opacity: opacity,
          },
        ]}
      />
      <SafeAreaLayout style={style.safeView} insets={'top'} />
      <Layout
        style={[
          style.header,
          {
            backgroundColor: 'transparent',
          },
        ]}>
        <TopNavigationAction
          style={[
            style.button,
            {
              backgroundColor: theme['background-basic-tabbar'] + '94',
            },
          ]}
          icon={() => <BackIcon color={theme['text-basic-color']} />}
          onPress={() => NavigationService.goBack()}
        />
        <Animated.Text
          numberOfLines={1}
          style={[
            style.title,
            {
              opacity: opacity,
              color: theme['text-basic-color'],
            },
          ]}>
          {title}
        </Animated.Text>
        <TopNavigationAction
          style={[
            style.button,
            {
              backgroundColor: theme['background-basic-tabbar'] + '94',
            },
          ]}
          icon={MoreHoriontalIcon}
          onPress={() => NavigationService.goBack()}
        />
      </Layout>
    </Animated.View>
  );
};

export default Header;
