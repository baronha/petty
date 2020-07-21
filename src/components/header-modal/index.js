import React from 'react';
import {View, Animated, StatusBar} from 'react-native';
import style from './style';
import {CloseIcon} from '../../utils/icon';
import {TopNavigationAction, useTheme, Text} from '@ui-kitten/components';
import NavigationService from '../../navigators/NavigationService';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HeaderModal = ({title, scrollY}) => {
  const theme = useTheme();
  const goBack = () => {
    NavigationService.goBack();
  };

  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: theme['background-basic-color-1'],
          borderColor: scrollY ? '#C5CEE0' : 'transparent',
        },
      ]}>
      <StatusBar barStyle={'light-content'} />
      <Text
        style={[
          style.title,
          {
            color: theme['text-basic-color'],
            opacity: scrollY ? 1 : 0,
          },
        ]}>
        {title}
      </Text>
      <TouchableOpacity
        style={[
          style.buttonClose,
          {
            backgroundColor: theme['background-basic-color-2'],
          },
        ]}
        onPress={goBack}>
        <CloseIcon width={24} height={24} fill={theme['text-basic-color']} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderModal;
