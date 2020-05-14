import MenuOutlined from '@material-ui/icons/MenuOutlined';
import React, { FC } from 'react';
import { Colors, Img, Row } from 'ui';

interface Props {
  openLeftSidebar?(): void;
  openRightSidebar(): void;
}
export const Header: FC<Props> = ({ openLeftSidebar, openRightSidebar }) => (
  <Row
    height={64}
    background={Colors.white}
    justifyContent="space-between"
    borderColor={Colors.gray}
    borderWidth={1}
    borderRightWidth={0}
    borderLeftWidth={0}
    borderTopWidth={0}
    borderStyle="solid"
  >
    <Row width={64} height={64} justifyContent="center" alignItems="center">
      {openLeftSidebar && <MenuOutlined cursor="pointer" onClick={openLeftSidebar} />}
    </Row>
    <Row width={64} height={64} justifyContent="center" alignItems="center">
      <Img onClick={openRightSidebar} ml={8} src="/images/icons/lee-1.svg" pointer width="30" height="30" alt="User" />
    </Row>
  </Row>
);
