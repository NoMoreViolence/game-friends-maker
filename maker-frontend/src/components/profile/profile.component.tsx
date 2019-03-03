import * as React from 'react';
import './profile.component.scss';
import styled from 'styled-components';
import { ProfileProps, ProfileMethod } from 'containers/profile';
import { toast } from 'react-toastify';
import ModalPage from 'pages/modal';
import { DeleteProfilePhotoModalComponent } from 'components/modal';

interface State {
  editMode: boolean;
  username: string;
  introduce: string;
  reallyDeleteProfilePhoto: boolean;
}

const Circle = styled.div`
  background-image: ${(p: { url: string | null }) => (p.url ? `url('${p.url}')` : '')};
  color: red;
`;
class ProfileComponent extends React.Component<ProfileProps & ProfileMethod, State> {
  public imageUploadInput = React.createRef<HTMLInputElement>();
  state: State = {
    editMode: false,
    username: '',
    introduce: '',
    reallyDeleteProfilePhoto: false
  };

  componentDidUpdate(prevProps: ProfileProps & ProfileMethod) {
    if (prevProps !== this.props && prevProps.loginStatus === 'pending' && this.props.loginStatus === 'success') {
      this.props.getMyProfile(this.props.token);
    }
  }
  componentDidMount() {
    if (this.props.loginStatus === 'success') {
      this.props.getMyProfile(this.props.token);
    }
  }

  public clickProfileImageChange = () => {
    if (this.imageUploadInput.current !== null) {
      this.imageUploadInput.current.click();
    }
  };
  public profileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('프로필 사진에는 사진 파일만 올려 주세요.');
      return;
    }

    this.props.uploadMyProfilePicture({
      token: this.props.token,
      image: file
    });
  };

  public changeReallyDeleteProfilePhotoModal = () => {
    this.setState({ reallyDeleteProfilePhoto: !this.state.reallyDeleteProfilePhoto });
  };
  public profileImageDelete = () => {
    this.props.deleteMyProfilePicture({ token: this.props.token });
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      [(e.target.name as 'username') || (e.target.name as 'introduce')]: e.target.value
    });
  };
  public changeEditMode = () => {
    if (this.state.editMode === false) {
      this.setState({
        username: this.props.username,
        introduce: this.props.introduce
      });
    }
    this.setState({
      editMode: !this.state.editMode
    });
  };
  public changeProfile = () => {
    this.changeEditMode();
    this.props.changeMyProfile({
      token: this.props.token,
      username: this.state.username,
      introduce: this.state.introduce
    });
  };

  // public changeVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (
  //     (e.currentTarget.id === 'profile-everyone-visibility' && this.props.visibility === 1) ||
  //     (e.currentTarget.id === 'profile-justme-visibility' && this.props.visibility === 0)
  //   ) {
  //     toast.info('이미 적용되어 있는 설정입니다.');
  //   } else if (e.currentTarget.id === 'profile-everyone-visibility') {
  //     return;
  //   } else if (e.currentTarget.id === 'profile-justme-visibility') {
  //     return;
  //   }
  // };

  render() {
    const renderIntroduce = (introduce: string | null) => {
      if (!introduce) {
        return <p className="middle-font-size">아직 자기소개가 없네요..! 한번 자신을 표현하는 소개 글을 작성 해 보는 것은 어떤가요 ?</p>;
      }

      return introduce.split('\n').map((centence: string, idx: number) => (
        <p className="middle-font-size" key={idx}>
          {centence}
        </p>
      ));
    };

    return (
      <>
        <div id="profile-introduce" className="page card-form white-gray-border radius">
          <div>
            <span className="title-font-size primary-color">내 프로필</span>
            {this.state.editMode ? (
              <div>
                <span className="large-font-size black-color cursor danger-text-cursor" onClick={this.changeEditMode}>
                  취소하기
                </span>
                <span className="large-font-size black-color cursor secondary-text-cursor" onClick={this.changeProfile}>
                  저장하기
                </span>
              </div>
            ) : (
              <span className="large-font-size black-color cursor primary-text-cursor" onClick={this.changeEditMode}>
                편집하기
              </span>
            )}
          </div>
          <div id="profile-content">
            {this.state.reallyDeleteProfilePhoto && (
              <ModalPage
                close={this.changeReallyDeleteProfilePhotoModal}
                action={this.profileImageDelete}
                component={DeleteProfilePhotoModalComponent}
              />
            )}
            <div id="profile-image">
              <Circle url={this.props.pictureUrl} className="white-gray-background">
                <span onClick={this.clickProfileImageChange} className="black-color middle-font-size">
                  이미지 변경하기
                </span>
                <input onChange={this.profileImageChange} type="file" ref={this.imageUploadInput} />
                <span onClick={this.changeReallyDeleteProfilePhotoModal} className="black-color middle-font-size">
                  이미지 삭제하기
                </span>
              </Circle>
            </div>
            <div id="profile-text">
              <div className="white-gray-border radius">
                <div>
                  <span className="secondary-color large-font-size">유저네임</span>
                </div>
                <div>
                  {this.state.editMode ? (
                    <input
                      name="username"
                      type="text"
                      placeholder="3 - 16 길이, '_', '-', 숫자, 영어만 허용"
                      className="middle-font-size white-gray-border radius"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <p className="middle-font-size">{this.props.username}</p>
                  )}
                </div>
              </div>
              <div className="white-gray-border radius">
                <div>
                  <span className="secondary-color large-font-size">자기소개</span>
                </div>
                <div>
                  {this.state.editMode ? (
                    <textarea
                      name="introduce"
                      className="middle-font-size white-gray-border radius"
                      rows={10}
                      value={this.state.introduce || ''}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <>{renderIntroduce(this.props.introduce)}</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*
          비활성화 처리
        <div id="profile-public-or-private" className="page card-form white-gray-border radius">
          <div>
            <span className="title-font-size primary-color">내 프로필 공개 여부</span>
          </div>
          <div className="white-gray-border radius">
            <span className="large-font-size secondary-color">현재 설정</span>
            <span className="middle-font-size">{this.props.visibility === 1 ? '전체 공개' : '나만보기'}</span>
          </div>
          <div>
            <button
              id="profile-everyone-visibility"
              className="large-font-size white-gray-border radius primary-button"
              onClick={this.changeVisibility}
            >
              모두에게 공개 하기
            </button>
            <button
              id="profile-justme-visibility"
              className="large-font-size white-gray-border radius secondary-button"
              onClick={this.changeVisibility}
            >
              나만 보기
            </button>
          </div>
        </div> */}
      </>
    );
  }
}

export default ProfileComponent;
