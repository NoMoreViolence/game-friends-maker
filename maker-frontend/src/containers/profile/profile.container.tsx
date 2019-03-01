import * as React from 'react';
import { bindActionCreators, Action, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { AppState, profileActions, CHANGE_PROFILE } from 'store';
import ProfileComponent from 'components/profile';
import { ActionFunction1 } from 'redux-actions';

interface ProfileProps {
  username: string;
  introduce: string;
  pictureUrl: string;
  visibility: 1 | 0;
  token: string;
  loginStatus: 'none' | 'success' | 'pending' | 'error';
  getMyProfileStatus: 'none' | 'success' | 'pending' | 'error';
}
interface ProfileMethod {
  getMyProfile: (token: string) => void;
  changeMyProfile: (changes: CHANGE_PROFILE) => void;
}

const ProfileContainer: React.SFC<ProfileProps & ProfileMethod> = props => (
  <ProfileComponent
    username={props.username}
    introduce={props.introduce}
    pictureUrl={props.pictureUrl}
    visibility={props.visibility}
    token={props.token}
    loginStatus={props.loginStatus}
    getMyProfileStatus={props.getMyProfileStatus}
    getMyProfile={props.getMyProfile}
    changeMyProfile={props.changeMyProfile}
  />
);

export { ProfileProps, ProfileMethod };
export default connect<ProfileProps, ProfileMethod, {}>(
  ({ profile, user }: AppState) => ({
    username: user.username,
    introduce: profile.introduce,
    pictureUrl: profile.pictureUrl,
    visibility: profile.visibility,
    token: user.token,
    loginStatus: user.loginStatus,
    getMyProfileStatus: profile.getMyProfileStatus
  }),
  dispatch => ({
    getMyProfile: bindActionCreators(profileActions.getMyProfile, dispatch),
    changeMyProfile: bindActionCreators(profileActions.changeProfile, dispatch)
  })
)(ProfileContainer);
