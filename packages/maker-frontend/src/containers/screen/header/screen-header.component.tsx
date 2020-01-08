import React, { FC, useCallback } from 'react';
import { useRouter, Icon, iconMap } from 'helpers';

import { Img, Row } from 'ui';
import { color } from 'styles';

interface Props {
  isSidebarHold: boolean;
  toggleIsSidebarOpen(): void;
}
export const ScreenHeaderComponent: FC<Props> = ({ isSidebarHold, toggleIsSidebarOpen }) => {
  const { push } = useRouter();
  const goMyPage = useCallback(() => push('/app/my'), [push]);

  return (
    <Row
      pr={16}
      pl={16}
      height={70}
      width="100%"
      position="absolute"
      top={0}
      backgroundColor={color.white}
      justifyContent="space-between"
      borderColor={color['border-gray']}
      borderWidth={1}
      borderRightWidth={0}
      borderLeftWidth={0}
      borderTopWidth={0}
      borderStyle="solid"
    >
      <Row>
        {!isSidebarHold && <Icon pointer onClick={toggleIsSidebarOpen} iconClass={iconMap.moreVert} iconSize={24} />}
      </Row>
      <Row alignItems="center">
        <Img onClick={goMyPage} ml={8} src="/images/icons/lee-1.svg" pointer width="30" height="30" alt="User" />
      </Row>
    </Row>
  );
};
