import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalPage from 'pages/modal/modal.page';
import logoutModalContainer from 'containers/modal/logout.modal.container';

import './header.component.scss';
import { HeaderProps, HeaderMethod } from 'containers/header/header.container';

interface State {
  logoutModal: boolean;
}

class HeaderComponent extends React.Component<HeaderProps & HeaderMethod & RouteComponentProps<any>, State> {
  public state = {
    logoutModal: false
  };

  public close = () => this.setState({ logoutModal: !this.state.logoutModal });
  public logout = () => {
    localStorage.clear();
    this.props.logout();
    toast('안녕히 가세요');
    this.props.history.push('/main');
  };

  public render = () => (
    <>
      {this.state.logoutModal && <ModalPage close={this.close} component={logoutModalContainer} />}
      {this.props.loginStatus === 'success' ? (
        <>
          <button className="out-link middle-font-size transparent-border radius header-link" onClick={this.close}>
            로그아웃
          </button>
          <NavLink className="link white-color middle-font-size radius header-link" to="/find" activeStyle={{ color: '#928cf7' }}>
            게임 친구 찾기
          </NavLink>
          <NavLink className="link white-color middle-font-size radius header-link" to="/message" activeStyle={{ color: '#928cf7' }}>
            메시지
          </NavLink>
          <NavLink className="link white-color middle-font-size radius header-link" to="/info" activeStyle={{ color: '#928cf7' }}>
            내 정보
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className="link white-color middle-font-size radius header-link" to="/sign/login" activeStyle={{ color: '#928cf7' }}>
            로그인
          </NavLink>
          <NavLink className="link white-color middle-font-size radius header-link" to="/sign/register" activeStyle={{ color: '#928cf7' }}>
            회원가입
          </NavLink>
        </>
      )}
      {this.props.admin && (
        <NavLink className="link white-color middle-font-size radius header-link" to="/admin" activeStyle={{ color: '#928cf7' }}>
          관리자실
        </NavLink>
      )}
    </>
  );
}

export default HeaderComponent;
