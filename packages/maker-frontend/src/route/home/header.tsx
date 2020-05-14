import Hidden from '@material-ui/core/Hidden';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Colors, fontWeights, media, Row, Span18 } from 'ui';

export const Header: FC = () => {
  return (
    <Row justifyContent="center" alignItems="center" position="sticky" top={0} width="100%">
      <StyledHeader flex={1} maxWidth="1440px" justifyContent="space-between" alignItems="center" padding="48px">
        <Span18 color={Colors.white} fontWeight={fontWeights.bold}>
          CoHope
        </Span18>

        {/* Mobile */}
        <Hidden mdUp implementation="js">
          <Row></Row>
        </Hidden>

        {/* Desktop */}
        <Hidden smDown implementation="js">
          <Row>
            <Span18 color={Colors.white} padding="16px">
              Home
            </Span18>
            <Span18 color={Colors.white} padding="16px">
              About
            </Span18>
            <Span18 color={Colors.white} padding="16px">
              Pricing
            </Span18>
          </Row>
        </Hidden>
      </StyledHeader>
    </Row>
  );
};

const StyledHeader = styled(Row)`
  ${media.mobile} {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-right: 16px;
    padding-left: 16px;
  }
`;
