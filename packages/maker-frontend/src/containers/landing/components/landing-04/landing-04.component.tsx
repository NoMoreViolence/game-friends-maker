import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useKey } from 'react-use';
import { FormattedMessage } from 'react-intl';
import MailchimpSubscribe, { FormHooks, EmailFormFields } from 'react-mailchimp-subscribe';

import { emailRegex } from 'utils';
import { globalActions } from 'store/reducers';
import { Span3rem, Span1D75rem, color, Input1D5rem, Button1D5rem } from 'styles';
import { Landing04RootDiv, Landing04FormDiv } from './landing-04.styled';

const mailChimpUrl = 'https://cohope.us19.list-manage.com/subscribe/post?u=3423cc52e1fa0d2f6db6c114e&amp;id=1588d0ae91';

const Landing04Component = ({ subscribe, status }: FormHooks<EmailFormFields>) => {
  const dispatch = useDispatch();
  const input = useRef<HTMLInputElement | null>(null);
  const [inputString, setInputString] = useState('');

  const requestSubscribe = useCallback(() => {
    if (emailRegex.test(inputString)) {
      subscribe({ EMAIL: inputString });
    } else {
      dispatch(
        globalActions.toast({ type: 'error', title: 'toast.error.email.title', text: 'toast.error.email.text' }),
      );
    }
  }, [dispatch, inputString, subscribe]);

  const isEnterPredicate = useCallback(() => {
    if (input.current && input.current === document.activeElement) {
      requestSubscribe();
    }
  }, [requestSubscribe]);
  useKey('Enter', isEnterPredicate, {}, [inputString]);

  useEffect(() => {
    if (status === 'success') {
      dispatch(
        globalActions.alert({
          type: 'success',
          title: 'toast.success.email.title',
          text: 'toast.success.email.text',
          showConfirmButton: false,
          reject: () => {},
          resolve: () => {},
        }),
      );
    }
    if (status === 'error') {
      dispatch(
        globalActions.alert({
          type: 'error',
          title: 'toast.error.email.already.title',
          text: 'toast.error.email.already.text',
          showConfirmButton: false,
          reject: () => {},
          resolve: () => {},
        }),
      );
    }
  }, [dispatch, status]);

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

const MailChimpComponent = () => (
  <MailchimpSubscribe url={mailChimpUrl} render={props => <Landing04Component {...props} />} />
);

export default MailChimpComponent;
