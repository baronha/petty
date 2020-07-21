import React, {useState, useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {
  Layout,
  TopNavigationAction,
  useTheme,
  Button,
} from '@ui-kitten/components';
import {Text, LoadingButton} from '../../../../components';
import {ToggleSwitch} from '../../../../components';
import style from './style';
import NavigationService from '../../../../navigators/NavigationService';
import {CloseIcon} from '../../../../utils/icon';
import {ThemeContext} from '../../../../utils/context';
import {Languages} from './components';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';

const SettingScreen = ({route, navigation}) => {
  const themeMode = useTheme();
  const userInfo = route.params?.userInfo;
  const themeContext = useContext(ThemeContext);
  const [theme, setTheme] = useState(
    themeContext.theme === 'light' ? false : true,
  );
  const goBack = () => {
    NavigationService.goBack();
  };

  useEffect(() => {
    if (themeContext.theme === 'light') {
      setTheme(false);
    } else {
      setTheme(true);
    }
  }, [themeContext.theme]);

  const themeToggle = () => {
    NavigationService.navigate('ThemeModeScreen', {
      theme,
    });
  };

  const onLogOut = () => {
    AsyncStorage.removeItem('petty.userInfo').then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Main'}],
        }),
      );
    });
  };

  return (
    <Layout style={style.container}>
      <StatusBar barStyle={'light-content'} />
      <TopNavigationAction
        icon={CloseIcon}
        onPress={goBack}
        style={[
          style.backIcon,
          {
            backgroundColor: themeMode['background-basic-color-2'],
          },
        ]}
      />
      <Text text={'settingTitle'} style={style.titleMain}>
        Cài đặt
      </Text>
      <Layout style={style.content}>
        <Layout style={style.row}>
          <Text text={'darkModeTitle'} style={style.title} />
          <ToggleSwitch value={theme} onPress={themeToggle} />
        </Layout>
        <Layout style={style.row}>
          <Text text={'languageTitle'} style={style.title} />
          <Languages />
        </Layout>
      </Layout>
      {userInfo && (
        <LoadingButton onPress={onLogOut} style={style.buttonLogOut}>
          <Text text={'signOutTitle'} style={style.titleButton} />
        </LoadingButton>
      )}
    </Layout>
  );
};

export default SettingScreen;
