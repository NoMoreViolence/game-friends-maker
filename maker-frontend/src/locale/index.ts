import { mainLocale } from './main.locale';
import { landingLocale } from './landing.locale';
import { alertLocale } from './alert.locale';
import { termsLocale } from './terms.locale';

const locale = {
  ko: { ...mainLocale.ko, ...alertLocale.ko, ...landingLocale.ko, ...termsLocale.ko },
  en: { ...mainLocale.en, ...alertLocale.en, ...landingLocale.en, ...termsLocale.en },
};

export default locale;
