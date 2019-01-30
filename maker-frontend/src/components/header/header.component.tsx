import * as React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalPage from 'pages/modal/modal.page';
import logoutModalContainer from 'containers/modal/logout.modal.container';

import './header.component.scss';

interface Props {
  username: string;
  loginStatus: 'none' | 'success' | 'pending';
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
          <button className="primary-button middle-font-size radius" id="header-link" onClick={this.close}>
            로그아웃
          </button>
          <NavLink id="header-link" className="link white-color middle-font-size radius" to="/find" activeStyle={{ color: '#928cf7' }}>
            게임 친구 찾기
          </NavLink>
          <NavLink id="header-link" className="link white-color middle-font-size radius" to="/message" activeStyle={{ color: '#928cf7' }}>
            메시지
          </NavLink>
          <NavLink id="header-link" className="link white-color middle-font-size radius" to="/info" activeStyle={{ color: '#928cf7' }}>
            내 정보
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            id="header-link"
            className="link white-color middle-font-size radius"
            to="/sign/login"
            activeStyle={{ color: '#928cf7' }}
          >
            로그인
          </NavLink>
          <NavLink
            id="header-link"
            className="link white-color middle-font-size radius"
            to="/sign/register"
            activeStyle={{ color: '#928cf7' }}
          >
            회원가입
          </NavLink>
        </>
      )}
      {this.props.admin && (
        <NavLink id="header-link" className="link white-color middle-font-size radius" to="/admin" activeStyle={{ color: '#928cf7' }}>
          관리자실
        </NavLink>
      )}
    </>
  );
}

export default HeaderComponent;
