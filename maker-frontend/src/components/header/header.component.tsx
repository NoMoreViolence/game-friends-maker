import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, map, skip, publishReplay, tap, distinctUntilChanged } from 'rxjs/operators';
import './header.component.scss';
import { toast } from 'react-toastify';
import ModalPage from 'pages/modal/modal.page';
import logoutModalContainer from 'containers/modal/logout.modal.container';

interface Props {
  username: string;
  loginSuccess: boolean;
  admin: boolean;
  logout: () => void;
}

interface State {
  logoutModal: boolean;
}

class HeaderComponent extends React.Component<Props & RouteComponentProps<any>, State> {
  public state = {
    logoutModal: false
  };

  componentDidMount() {}

  componentWillUnmount() {}

  public close = () => this.setState({ logoutModal: !this.state.logoutModal });
  public logout = () => {
    localStorage.removeItem('token');
    this.props.logout();
    toast('로그아웃 성공, 안녕히 가세요');
    this.props.history.push('/');
  };

  public render = () => (
    <>
      {this.state.logoutModal && <ModalPage close={this.close} component={logoutModalContainer} />}
      {this.props.loginSuccess ? (
        <>
          <button className="primary-button middle-font-size radius" id="header-link" onClick={this.close}>
            로그아웃
          </button>
          <NavLink id="header-link" className="link white-color middle-font-size radius" to="/find" activeClassName="link-current">
            게임 친구 찾기
          </NavLink>
          <NavLink id="header-link" className="link white-color middle-font-size radius" to="/message" activeClassName="link-current">
            메시지
          </NavLink>
          <NavLink id="header-link" className="link white-color middle-font-size radius" to="/info" activeClassName="link-current">
            내 정보
          </NavLink>
        </>
      ) : (
        <>
          <NavLink id="header-link" className="link white-color middle-font-size radius" to="/sign/login" activeClassName="link-current">
            로그인
          </NavLink>
          <NavLink id="header-link" className="link white-color middle-font-size radius" to="/sign/register" activeClassName="link-current">
            회원가입
          </NavLink>
        </>
      )}
      {this.props.admin && (
        <NavLink id="header-link" className="link white-color middle-font-size radius" to="/admin" activeClassName="link-current">
          관리자실
        </NavLink>
      )}
    </>
  );
}

export default HeaderComponent;
