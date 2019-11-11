import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { HeaderRootDiv, HeaderContentDiv } from './header.styled';
import { push } from 'connected-react-router';
import { IconComponent } from 'helpers';
import { InputD75rem } from 'styles';
import { userActions } from 'store/reducers';

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const inputRef = useCallback((node: HTMLInputElement) => {
    if (node !== null) {
      const keyPress = (e: KeyboardEvent) => {
        const key = e.which || e.keyCode;
        if (key === 13) {
          // TODO: Search Action 만들어서 붙이기
        }
      };
      node.addEventListener('keypress', keyPress);
      return () => {
        node.removeEventListener('keypress', keyPress);
      };
    }
  }, []);

  const redirectMainPage = useCallback(() => {
    dispatch(push('/app/post'));
  }, [dispatch]);
  const redirectAlertPage = useCallback(() => {
    dispatch(push('/app/alert'));
  }, [dispatch]);
  const redirectMessagePage = useCallback(() => {
    dispatch(push('/app/message'));
  }, [dispatch]);
  const redirectUserProfilePage = useCallback(() => {
    // 나중에는 프로필 페이지에서 로그아웃 할 수 있게 할 것임, 현재는 그냥 바로 누르면 로그아웃
    dispatch(userActions.logout());
    // dispatch(push('/app/profile'));
  }, [dispatch]);

  return (
    <HeaderRootDiv>
      <HeaderContentDiv>
        <div className="logo-picture">
          <img onClick={redirectMainPage} src="/images/logo/logo.png" alt="Main logo" width="40px" height="40px" />
        </div>

        <div className="menu-list">
          <div className="search-bar">
            <InputD75rem
              ref={inputRef}
              value={inputValue}
              onChange={({ target: { value } }) => setInputValue(value)}
              placeholder={'# Search posts'}
              transition={true}
            ></InputD75rem>
            <IconComponent
              iconClass={'uil uil-search'}
              iconStyle={{ width: '1.5rem', height: '1.5rem', fontSize: '1.5rem' }}
            />
          </div>

          <IconComponent
            onClick={redirectAlertPage}
            iconClass={'uil uil-bell'}
            iconStyle={{ width: '1.5rem', height: '1.5rem', fontSize: '1.5rem' }}
          />
          <IconComponent
            onClick={redirectMessagePage}
            iconClass="uil uil-comments"
            iconStyle={{ width: '1.5rem', height: '1.5rem', fontSize: '1.5rem' }}
          />
          <img onClick={redirectUserProfilePage} src="/images/icons/lee-1.svg" width="24px" height="24px" alt="User" />
        </div>
      </HeaderContentDiv>
    </HeaderRootDiv>
  );
};

export default HeaderComponent;
