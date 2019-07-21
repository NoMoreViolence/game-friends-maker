import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { IntlProvider } from 'react-intl';
import locale from '@locale';
import { AppState } from '@bootstrap';
import { getLanguageSelector } from '@src/store/reducers';
import GlobalComponent from '@containers/global';
import LandingComponent from '@containers/landing';

const App = () => {
  const language = useSelector((state: AppState) => getLanguageSelector(state.global), shallowEqual);

  return (
    <IntlProvider locale={language} messages={locale[language]}>
      <GlobalComponent />
      <Switch>
        <Route path="/" component={LandingComponent} />
      </Switch>
    </IntlProvider>
  );
};

export default App;
