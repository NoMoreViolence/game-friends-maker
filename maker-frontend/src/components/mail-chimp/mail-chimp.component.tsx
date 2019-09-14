import React, { useState, useCallback, useEffect } from 'react';
import { MailChimpFormRootDiv } from './mail-chimp.styled';
import MailchimpSubscribe, { FormHooks, EmailFormFields } from 'react-mailchimp-subscribe';
import { FormattedMessage } from 'react-intl';
import { Span1D5rem, SpanD875rem, MiddleInput, Span1rem, color, Button1rem } from '@styles';
import { useDebounce } from '@helpers';
import { emailRegex, isEnterTyped } from '@utils';

const mailChimpUrl = 'https://cohope.us19.list-manage.com/subscribe/post?u=3423cc52e1fa0d2f6db6c114e&amp;id=1588d0ae91';

const MailChimpComponent = () => (
  <MailchimpSubscribe url={mailChimpUrl} render={props => <MailChimpForm {...props} />} />
);
const MailChimpForm = ({ subscribe, status, message }: FormHooks<EmailFormFields>) => {
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const onChangeEmailInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailError(false);
    setEmail(e.target.value);
  }, []);
  const emailChanged = useDebounce(email, 300);
  useEffect(() => {
    if (emailRegex.test(email) || email === '') {
      setIsEmailError(false);
    } else {
      setIsEmailError(true);
    }
  }, [emailChanged]);

  const subScribe = () => {
    if (emailRegex.test(email)) {
      subscribe({ EMAIL: email });
    } else {
      setIsEmailError(true);
    }
  };

  const enterTyped = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEnterTyped(e)) {
      subScribe();
    }
  };

  return (
    <MailChimpFormRootDiv>
      <div className="title">
        <Span1D5rem>
          <FormattedMessage id={'mailchimp.title'} />
        </Span1D5rem>
        <SpanD875rem>
          <FormattedMessage id={'mailchimp.comment'} />
        </SpanD875rem>
      </div>

      {status === 'error' && (
        <div>
          <Span1rem
            align={'center'}
            dangerouslySetInnerHTML={message ? { __html: message } : { __html: 'awefawef' }}
            color={color.error}
          ></Span1rem>
        </div>
      )}

      {status === 'sending' && (
        <div>
          <Span1rem color={'skyblue'}>Loading ...</Span1rem>
        </div>
      )}

      {status === 'success' && (
        <div>
          <Span1rem color={'green'}>Thank you for subscribing</Span1rem>
        </div>
      )}

      <div className="email-form">
        <div>
          <MiddleInput
            placeholder="E-mail address"
            onKeyDown={enterTyped}
            onChange={onChangeEmailInput}
            error={isEmailError}
          />
        </div>
        <div>
          <Button1rem disabled={isEmailError} onClick={subScribe}>
            Subscribe
          </Button1rem>
        </div>
      </div>
    </MailChimpFormRootDiv>
  );
};

export default MailChimpComponent;
