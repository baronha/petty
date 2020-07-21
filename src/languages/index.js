import I18n from 'react-native-i18n';

import en from './data/en';
import vi from './data/vi';

I18n.fallbacks = true;
I18n.defaultLocale = 'vi';
I18n.translations = {
  vi,
  en,
};

export default I18n;
