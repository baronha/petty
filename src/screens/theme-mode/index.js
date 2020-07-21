import React, {useContext, useState} from 'react';
import {Layout} from '@ui-kitten/components';
import style from './style';
import {HeaderModal} from '../../components';
import {ToggleSwitch, Banner} from './components';
import {ThemeContext} from '../../utils/context';
import {setThemeMode, getThemeMode} from '../../utils/helpers';

const ThemeModeScreen = ({route}) => {
  const themeContext = useContext(ThemeContext);
  const [theme, setTheme] = useState(route.params.theme);

  const themeToggle = () => {
    setTheme(!theme);
    themeContext.toggleTheme();
    setThemeMode(!theme);
  };

  return (
    <Layout style={style.container}>
      <HeaderModal />
      <Layout style={style.top}>
        <Banner theme={theme} />
      </Layout>
      <Layout style={style.bottom}>
        <ToggleSwitch theme={theme} onPress={themeToggle} />
      </Layout>
    </Layout>
  );
};

export default ThemeModeScreen;
