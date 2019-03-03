import * as React from 'react';
import { bindActionCreators, Action, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { AppState, profileActions, CHANGE_PROFILE, UPLOAD_PROFILE_PICTURE } from 'store';
import ProfileComponent from 'components/profile';

interface ProfileProps {
  username: string;
  introduce: string;
  pictureUrl: string;
  visibility: 1 | 0;
  token: string;
  loginStatus: 'none' | 'success' | 'pending' | 'error';
  actionStatus: 'none' | 'success' | 'pending' | 'error';
}
interface ProfileMethod {
  getMyProfile: (token: string) => void;
  changeMyProfile: (changes: CHANGE_PROFILE) => void;
  uploadMyProfile: (changes: UPLOAD_PROFILE_PICTURE) => void;
}

const ProfileContainer: React.SFC<ProfileProps & ProfileMethod> = props => (
  <ProfileComponent
    username={props.username}
    introduce={props.introduce}
    pictureUrl={props.pictureUrl}
    visibility={props.visibility}
    token={props.token}
    loginStatus={props.loginStatus}
    actionStatus={props.actionStatus}
    getMyProfile={props.getMyProfile}
    changeMyProfile={props.changeMyProfile}
    uploadMyProfile={props.uploadMyProfile}
  />
);

export { ProfileProps, ProfileMethod };
export default connect<ProfileProps, ProfileMethod, {}>(
  ({ profile, user }: AppState) => ({
    username: profile.username,
    introduce: profile.introduce,
    pictureUrl: profile.pictureUrl,
    visibility: profile.visibility,
    token: user.token,
    loginStatus: user.loginStatus,
    actionStatus: profile.actionStatus
  }),
  dispatch => ({
    getMyProfile: bindActionCreators(profileActions.getMyProfile, dispatch),
    changeMyProfile: bindActionCreators(profileActions.changeProfile, dispatch),
    uploadMyProfile: bindActionCreators(profileActions.uploadProfile, dispatch)
  })
)(ProfileContainer);
