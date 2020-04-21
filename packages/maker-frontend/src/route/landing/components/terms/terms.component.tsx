import React from 'react';
import { TermsRootDiv } from './terms.styled';
import { FormattedMessage } from 'react-intl';

interface Props {
  exit(): void;
}

const TermsComponent = ({ exit }: Props) => (
  <TermsRootDiv>
    <div className="title">
      <span>
        <FormattedMessage id={'terms.title'} />
      </span>
      <img src="/images/icons/close.svg" alt="Close icon" onClick={exit} />
    </div>

    <div className="content">
      <div>
        <span>Cooperative</span>
      </div>
    </div>
  </TermsRootDiv>
);

export default TermsComponent;
