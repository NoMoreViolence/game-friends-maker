import { mainLocale } from './main.locale';
import { landingLocale } from './landing.locale';
import { alertLocale } from './alert.locale';

const locale = {
  ko: { ...mainLocale.ko, ...alertLocale.ko, ...landingLocale.ko },
  en: { ...mainLocale.en, ...alertLocale.en, ...landingLocale.en },
};

export default locale;
