import { mainLocale } from './main.locale';
import { alertLocale } from './alert.locale';

const locale = {
  ko: { ...mainLocale.ko, ...alertLocale.ko },
  en: { ...mainLocale.en, ...alertLocale.en },
};

export default locale;
