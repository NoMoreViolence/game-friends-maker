import * as React from 'react';
import './profile.page.scss';

import ProfileContainer from 'containers/profile';

const ProfilePage: React.SFC<void> = () => (
  <div id="profile-container" className="page-container">
    <ProfileContainer />
  </div>
);

export default ProfilePage;
