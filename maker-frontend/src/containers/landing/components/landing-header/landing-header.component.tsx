import React, { useCallback } from 'react';
import { LandingHeaderRootDiv } from './landing-header.styled';
import { MiddleSpan, MiddleBigSpan } from '@styles';
import { NavLink } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { AppState } from '@bootstrap';
import { getLanguageSelector } from '@reducers';
import { Lang } from '@models';
import { globalActions } from '@actions';

const LandingHeaderComponent = () => {
  const dispatch = useDispatch();

  const lang = useSelector(({ global }: AppState) => getLanguageSelector(global), shallowEqual);
  const getLangStyleProps = useCallback(
    (callbackLang: Lang) => {
      if (callbackLang === lang) {
        return {
          cursor: 'unset',
          weight: '900',
        };
      }
      return {
        cursor: 'pointer',
        weight: '500',
      };
    },
    [lang],
  );

  const changeLang = useCallback(
    (buttonLang: Lang) => {
      if (lang === buttonLang) {
        return;
      }
      dispatch(globalActions.setLanguage({ lang: buttonLang }));
    },
    [lang],
  );

  return (
    <LandingHeaderRootDiv>
      <NavLink className="logo" to="/">
        <img src="/images/icons/cohope-icon.svg" alt="Main logo icon" width="24px" height="24px" />
        <MiddleBigSpan weight={'900'}>CoHope</MiddleBigSpan>
      </NavLink>

      <div className="lang">
        <MiddleSpan transition={false} onClick={() => changeLang('ko')} {...getLangStyleProps('ko')}>
          KOR
        </MiddleSpan>
        <MiddleSpan transition={false} weight={'normal'}>
          {' '}
          /{' '}
        </MiddleSpan>
        <MiddleSpan transition={false} onClick={() => changeLang('en')} {...getLangStyleProps('en')}>
          ENG
        </MiddleSpan>
      </div>
    </LandingHeaderRootDiv>
  );
};

export default LandingHeaderComponent;
