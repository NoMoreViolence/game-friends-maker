import * as React from 'react';
import './delete-profile-photo.modal.component.scss';

interface Props {
  action: () => void;
  close: () => void;
}

class DeleteProfilePhotoModalComponent extends React.Component<Props> {
  delete = () => (this.props.action(), this.props.close());

  render = () => {
    return (
      <>
        <div className="modal-header">
          <span className="large-font-size">정말 프로필 사진을 삭제 하시겠습니까?</span>
          <img className="large-image-size cursor-image" src="/images/close.svg" alt="Close icon" onClick={this.props.close} />
        </div>
        <div className="modal-footer">
          <button className="primary-button radius large-font-size" onClick={this.delete}>
            삭제하기
          </button>
        </div>
      </>
    );
  };
}

export default DeleteProfilePhotoModalComponent;
