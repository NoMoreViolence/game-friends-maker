import * as React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import 'components/App.scss';
import LoginPage from 'pages/login/login.page';

class App extends React.Component<any, any> {
  public render() {
    return (
      <div id="main">
        <div id="header">helo</div>
        <NavLink to="/login">click Me</NavLink>
        <Switch>
          <Route path="/login" exact={true} component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
