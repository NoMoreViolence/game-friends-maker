import { Icon, iconMap } from 'helpers';
import React, { FC } from 'react';
import { Colors, Img, Row } from 'ui';

interface Props {
  openLeftSidebar?(): void;
  openRightSidebar(): void;
}
export const Header: FC<Props> = ({ openLeftSidebar, openRightSidebar }) => (
  <Row
    height={64}
    backgroundColor={Colors.white}
    justifyContent="space-between"
    borderColor={Colors.gray}
    borderWidth={1}
    borderRightWidth={0}
    borderLeftWidth={0}
    borderTopWidth={0}
    borderStyle="solid"
  >
    <Row width={64} height={64} justifyContent="center" alignItems="center">
      {openLeftSidebar && <Icon pointer onClick={openLeftSidebar} iconClass={iconMap.moreVert} iconSize={24} />}
    </Row>
    <Row width={64} height={64} justifyContent="center" alignItems="center">
      <Img onClick={openRightSidebar} ml={8} src="/images/icons/lee-1.svg" pointer width="30" height="30" alt="User" />
    </Row>
  </Row>
);
