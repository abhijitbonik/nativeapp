import I18n from 'react-native-i18n';
import en from './locales/en';
import hin from './locales/hin';
I18n.defaultLocale = 'en'; // If the current locale in device is not en or hi
I18n.locale = 'en'; // If we do not want the framework to use the phone's locale by default

I18n.fallbacks = true;

I18n.translations = {
  en,
  hin
};

export const setLocale = (locale) => {
  I18n.locale = locale;
};

// export const getCurrentLocale = () => I18n.locale; // It will be used to define intial language state in reducer.

export default I18n;
