import React from 'react';
import {
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import style from './style';
import {SafeAreaLayout} from '../safe-area-layout';
import {BackIcon} from '../../utils/icon';
import NavigationService from '../../navigators/NavigationService';
import {Animated} from 'react-native';

const Header = ({title, scrollY, onPress}) => {
  const theme = useTheme();

  const shadowOpacity = scrollY?.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 0.2],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY?.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const onBack = () =>{
    if(onPress){
      onPress()
    }else{
      NavigationService.goBack()
    }
  }

  return (
    <Animated.View
      style={{
        shadowRadius: 24,
        shadowOpacity,
        // zIndex: 2000,
      }}>
      <Layout>
        <SafeAreaLayout insets={'top'} />
        <Layout style={style.container}>
          <TopNavigationAction
            style={style.backButton}
            icon={() => <BackIcon color={theme['text-basic-color']} />}
            onPress={onBack}
          />
          <Layout style={style.titleView}>
            <Animated.Text
              style={[
                style.title,
                {
                  opacity: titleOpacity,
                  color: theme['text-basic-color'],
                },
              ]}>
              {title}
            </Animated.Text>
          </Layout>
        </Layout>
        <Text></Text>
      </Layout>
    </Animated.View>
  );
};

export default Header;
