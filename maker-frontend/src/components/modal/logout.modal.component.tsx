import * as React from 'react';
import './logout.modal.component.scss';

interface Props {
  logout: () => void;
  close: () => void;
}

class LogoutModalComponent extends React.Component<Props> {
  render = () => {
    return (
      <>
        <div className="modal-header">
          <span className="large-font-size">정말 로그아웃 하시겠습니까?</span>
          <img className="large-image-size cursor-image" src="/images/close.svg" alt="Close icon" onClick={this.props.close} />
        </div>
        <div className="modal-footer">
          <button className="primary-button radius large-font-size" onClick={this.props.logout && this.props.close}>
            로그아웃
          </button>
        </div>
      </>
    );
  };
}

export default LogoutModalComponent;
