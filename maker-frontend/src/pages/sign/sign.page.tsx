import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import './sign.page.scss';
import LoginPage from './login/login.page';

class SignPage extends React.Component<RouteComponentProps, {}> {
  componentDidMount() {
    console.log(this.props.history.location);
  }

  componentDidUpdate(prevProps: RouteComponentProps, prevState: {}) {
    console.log(this.props.history.location);
  }

  render() {
    return (
      <div id="sign">
        <div id="card">
          <Route path="/sign/login" exact={true} component={LoginPage} />
        </div>
      </div>
    );
  }
}

export default withRouter(SignPage);
