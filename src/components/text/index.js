import React, {useState, useMemo} from 'react';
import {Text} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import I18n from '../../languages/index';
import {useRecoilValue} from 'recoil';
import {language} from '../../languages/recoils';

const AppText = ({text, style, children, numberOfLines}) => {
  const theme = useTheme();
  const [i18n, setI18n] = useState(I18n);
  const lang = useRecoilValue(language);

  useMemo(() => {
    let i18nLang = i18n;
    i18nLang.locale = lang;
    setI18n(i18nLang);
  }, [lang]);

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: theme['text-basic-color'],
        },
        style,
      ]}>
      {text ? i18n.t(text) : children}
    </Text>
  );
};

export default AppText;
