import React, {useState, useEffect} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {StatusBar, View} from 'react-native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping} from '@eva-design/eva';
import {custom, light, dark} from '../themes'; // <-- Import app theme
import AppNavigator from '../navigators/AppNavigator';
import {ThemeContext} from '../utils/context';
import DropdownAlert from 'react-native-dropdownalert';
import {AlertHelper} from '../components';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from '../reducers';
import {createStore, applyMiddleware} from 'redux';
import {Client} from 'bugsnag-react-native';
import {getThemeMode, getLanguageFromStorage} from '../utils/helpers';
import Loader from 'react-native-mask-loader';
import {useSetRecoilState} from 'recoil';
import {language} from '../languages/recoils';

console.disableYellowBox = true;

const themes = {light, dark};
const store = createStore(Reducers, applyMiddleware(thunk));

const App = ({actions}) => {
  const [theme, setTheme] = useState('light');
  const [appReady, setAppReady] = useState(false);
  const [rootKey] = useState(Math.random());
  const currentTheme = themes[theme];
  const bugsnag = __DEV__ ? '' : new Client('24cf847afc8c6576196d6044c35f42c7');
  const setLanguage = useSetRecoilState(language);

  useEffect(() => {
    startApp();
  }, []);

  const startApp = async () => {
    await getTheme();
    await getLanguage();
    setAppReady(true);
  };

  const getTheme = async () => {
    const result = await getThemeMode();
    if (result) {
      const data = JSON.parse(result);
      setTheme(data.theme ? 'dark' : 'light');
    }
  };

  const getLanguage = async () => {
    const result = await getLanguageFromStorage();
    if (result) {
      const lang = JSON.parse(result);
      setLanguage(lang.lang);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <ApplicationProvider
          mapping={mapping}
          theme={currentTheme}
          customMapping={custom} // <-- apply custom mapping
        >
          <ThemeContext.Provider value={{theme, toggleTheme}}>
            <StatusBar
              barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
            />
            <View style={{flex: 1}} key={rootKey}>
              <Loader
                isLoaded={appReady}
                imageSource={require('../assets/images/logo/logo.png')}
                backgroundStyle={{backgroundColor: '#FDBF50'}}>
                <AppNavigator />
              </Loader>
            </View>
            <DropdownAlert
              inactiveStatusBarStyle={
                theme === 'light' ? 'dark-content' : 'light-content'
              }
              defaultContainer={{
                padding: 8,
                paddingTop: StatusBar.currentHeight,
                flexDirection: 'row',
              }}
              ref={ref => {
                AlertHelper.setDropDown(ref);
              }}
              onClose={() => AlertHelper.invokeOnClose()}
            />
          </ThemeContext.Provider>
        </ApplicationProvider>
      </Provider>
    </React.Fragment>
  );
};

export default App;
