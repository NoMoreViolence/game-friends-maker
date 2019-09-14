import React, { useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useKey } from 'react-use';
import { FormattedMessage } from 'react-intl';

import { Span3rem, Span1D75rem, color, Input1D5rem, Button1D5rem } from '@styles';
import { Landing04RootDiv, Landing04FormDiv } from './landing-04.styled';

const Landing04Component = () => {
  const dispatch = useDispatch();
  const input = useRef<HTMLInputElement | null>(null);
  const [inputString, setInputString] = useState('');

  const requestSubscribe = useCallback(async () => {
    try {
      //
    } catch (e) {
      //
    }
    console.log('fefe', inputString);
  }, [inputString]);

  const isEnterPredicate = useCallback(() => {
    if (input.current && input.current === document.activeElement) {
      requestSubscribe();
    }
  }, [inputString]);
  useKey('Enter', isEnterPredicate, {}, [inputString]);

  return (
    <Landing04RootDiv>
      <img src="/images/illustrators/img_cta.svg" alt="hello" />

      <Landing04FormDiv className="form">
        <div className="title">
          <Span3rem weight={'bold'} color={color.blackLight}>
            <FormattedMessage id={'landing.want.this.service?'} />
          </Span3rem>
        </div>

        <div className="sub">
          <Span1D75rem weight={'500'} align={'center'} color={color.black}>
            <FormattedMessage id={'landing.wait.1'} />
          </Span1D75rem>
          <Span1D75rem weight={'500'} align={'center'} color={color.black}>
            <FormattedMessage id={'landing.wait.2'} />
          </Span1D75rem>
          <Span1D75rem weight={'500'} align={'center'} color={color.black}>
            <FormattedMessage id={'landing.wait.3'} />
          </Span1D75rem>
        </div>

        <div className="input-and-button">
          <Input1D5rem
            ref={input}
            value={inputString}
            onChange={({ target: { value } }) => setInputString(value)}
            placeholder="Your email"
            hover={false}
            borderColor={color.black}
            backgroundColor={color.skyBlue}
            weight={'200'}
            padding={'1rem'}
          />
          <Button1D5rem
            onClick={requestSubscribe}
            borderColor={color.black}
            backgroundColor={color.skyBlue}
            color={color.black}
            hover={true}
            cursor={'pointer'}
            transition={true}
            hoverBorderColor={color.black}
            hoverBackgroundColor={color.black}
            hoverColor={color.skyBlue}
            padding={'1rem'}
          >
            <FormattedMessage id={'landing.subscribe'} />
          </Button1D5rem>
        </div>
      </Landing04FormDiv>
    </Landing04RootDiv>
  );
};

export default Landing04Component;
