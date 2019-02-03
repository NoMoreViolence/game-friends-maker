import * as React from 'react';
import './myinfo.page.scss';
import { NavLink } from 'react-router-dom';
import { UserSvg, FriendSvg, GameInfoSvg, SettingsSvg } from 'lib/svgs';

const MyinfoPage: React.SFC<{}> = () => (
  <div className="page-container">
    <div id="info-page" className="page">
      <NavLink to="/info/profile" className="white-background radius white-gray-border light-cursor">
        <UserSvg color="light" />
        <span className="sub-title-font-size light-color">프로필</span>
      </NavLink>
      <NavLink to="/info/games" className="white-background radius white-gray-border light-cursor">
        <GameInfoSvg color="light" />
        <span className="sub-title-font-size light-color">게임 정보</span>
      </NavLink>
      <NavLink to="/info/friends" className="white-background radius white-gray-border light-cursor">
        <FriendSvg color="light" />
        <span className="sub-title-font-size light-color">친구 관리</span>
      </NavLink>
      <NavLink to="/info/settings" className="white-background radius white-gray-border light-cursor">
        <SettingsSvg color="light" />
        <span className="sub-title-font-size light-color">개인정보</span>
      </NavLink>
    </div>
  </div>
);

export default MyinfoPage;
