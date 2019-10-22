import React, { useCallback } from 'react';
import { LandingHeaderRootDiv } from './landing-header.styled';
import { Span1rem, Span1D5rem } from '@styles';
import { NavLink } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { AppState } from '@bootstrap';
import { getLanguageSelector, globalActions } from '@reducers';
import { Lang } from '@models';

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
        <Span1D5rem weight={'900'}>CoHope</Span1D5rem>
      </NavLink>

      <div className="lang">
        <Span1rem transition={false} onClick={() => changeLang('ko')} {...getLangStyleProps('ko')}>
          KOR
        </Span1rem>
        <Span1rem transition={false} weight={'normal'}>
          {' '}
          /{' '}
        </Span1rem>
        <Span1rem transition={false} onClick={() => changeLang('en')} {...getLangStyleProps('en')}>
          ENG
        </Span1rem>
      </div>
    </LandingHeaderRootDiv>
  );
};

export default LandingHeaderComponent;
