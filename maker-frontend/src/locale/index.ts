import { mainLocale } from './main.locale';
import { landingLocale } from './landing.locale';
import { alertLocale } from './alert.locale';
import { termsLocale } from './terms.locale';
import { subscribeLocale } from './subscribe.locale';
import { toastLocale } from './toast.locale';

const locale = {
  ko: {
    ...mainLocale.ko,
    ...alertLocale.ko,
    ...landingLocale.ko,
    ...termsLocale.ko,
    ...subscribeLocale.ko,
    ...toastLocale.ko,
  },
  en: {
    ...mainLocale.en,
    ...alertLocale.en,
    ...landingLocale.en,
    ...termsLocale.en,
    ...subscribeLocale.en,
    ...toastLocale.en,
  },
};

export default locale;
