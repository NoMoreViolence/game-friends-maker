import { mainLocale } from './main.locale';
import { landingLocale } from './landing.locale';
import { alertLocale } from './alert.locale';
import { termsLocale } from './terms.locale';
import { subscribeLocale } from './subscribe.locale';
import { toastLocale } from './toast.locale';
import { errorLocale } from './error.locale';
import { commonLocale } from './common.locale';

const locale = {
  ko: {
    ...mainLocale.ko,
    ...alertLocale.ko,
    ...landingLocale.ko,
    ...termsLocale.ko,
    ...subscribeLocale.ko,
    ...toastLocale.ko,
    ...errorLocale.ko,
    ...commonLocale.ko,
  },
  en: {
    ...mainLocale.en,
    ...alertLocale.en,
    ...landingLocale.en,
    ...termsLocale.en,
    ...subscribeLocale.en,
    ...toastLocale.en,
    ...errorLocale.en,
    ...commonLocale.ko,
  },
};

export default locale;
