import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './logout.modal.component.scss';
import { LogoutProps, LogoutMethod } from 'containers/modal/logout.modal.container';

class LogoutModalComponent extends React.Component<LogoutProps & LogoutMethod & RouteComponentProps> {
  logout = () => (this.props.logout(), this.props.close(), this.props.history.push(''));

  render = () => {
    return (
      <>
        <div className="modal-header">
          <span className="large-font-size">정말 로그아웃 하시겠습니까?</span>
          <img className="large-image-size cursor-image" src="/images/close.svg" alt="Close icon" onClick={this.props.close} />
        </div>
        <div className="modal-footer">
          <button className="primary-button radius large-font-size" onClick={this.logout}>
            로그아웃
          </button>
        </div>
      </>
    );
  };
}

export default LogoutModalComponent;
