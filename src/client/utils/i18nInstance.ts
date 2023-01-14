import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextHttpBackend from 'i18next-http-backend';
import LanguageDetector, {
  DetectorOptions,
} from 'i18next-browser-languagedetector';

enum Language {
  EN = 'en',
  ID = 'id',
}

const localeBundles = {
  [Language.EN]: () => import('../assets/locales/en.json'),
  [Language.ID]: () => import('../assets/locales/id.json'),
};

const loadLocaleBundle = (locale: Language) =>
  localeBundles[locale]()
    .then((data: any) => data.default) // ES6 default import
    .catch((err: unknown) => {
      console.error('Error load locale bundle: ', err);
    });

const backendOptions = {
  loadPath: '{{lng}}|{{ns}}', // used to pass language and namespace to custom XHR function
  request: (_options: unknown, url: any, _payload: unknown, callback: any) => {
    try {
      const [lng] = url.split('|');

      loadLocaleBundle(lng).then((data) => {
        callback(null, {
          data: JSON.stringify(data),
          status: 200,
        });
      });
    } catch (err) {
      console.error('Failed to load locale resource: ', err);

      callback(null, { status: 500 });
    }
  },
};

const detectorOptions: DetectorOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'localStorage'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'], // languages to not persist (localStorage)
};

const initOptions: InitOptions = {
  backend: backendOptions,
  detection: detectorOptions,
  fallbackLng: Language.EN,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

i18n
  .use(LanguageDetector)
  .use(i18nextHttpBackend)
  .use(initReactI18next)
  .init(initOptions);

export default i18n;
