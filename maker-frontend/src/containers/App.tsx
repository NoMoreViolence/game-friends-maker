import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { AppState } from '@bootstrap';
import { getLanguageSelector } from '@src/store/reducers';
import GlobalComponent from '@containers/global';
import locale from '@locale';

const App = () => {
  const language = useSelector((state: AppState) => getLanguageSelector(state.global), shallowEqual);

  return (
    <IntlProvider locale={language} messages={locale[language]}>
      <GlobalComponent />
    </IntlProvider>
  );
};

export default App;
