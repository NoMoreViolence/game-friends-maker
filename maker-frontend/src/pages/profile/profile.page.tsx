import * as React from 'react';
import './profile.page.scss';

const ProfilePage: React.SFC<void> = () => (
  <div id="profile-container" className="page-container">
    <div className="page card-form white-gray-border radius">
      <div>
        <span className="title-font-size primary-color">내 프로필</span>
        <span className="large-font-size black-color">편집하기</span>
      </div>
      <div id="profile-content">
        <div id="profile-image">
          <div className="white-gray-background">
            <span className="secondary-color small-font-size">이미지 변경하기</span>
            <span className="secondary-color small-font-size">이미지 삭제하기</span>
          </div>
        </div>
        <div id="profile-text">
          <div className="white-gray-border radius">
            <div>
              <span className="secondary-color large-font-size">자기소개</span>
            </div>
            <div>
              <p className="middle-font-size">
                aweiofjawo;efjo;awijaja;owejfjejfi;ojaiowejf;oiawejfo;iawjf;oiwajeo;ifjwa;oiefjawej;ojaweo;fjawo;ejf fjofj
                aweiiiiiieeeeeeeeeeeeeeee
              </p>
              <p className="middle-font-size">awoefij;owaiejfo;iwaejf;oawiejfo;awij</p>
            </div>
          </div>
          <div className="white-gray-border radius">
            <div>
              <span className="secondary-color large-font-size">나를 표현하는 태그</span>
            </div>
            <div className="middle-font-size">hashTags</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfilePage;
