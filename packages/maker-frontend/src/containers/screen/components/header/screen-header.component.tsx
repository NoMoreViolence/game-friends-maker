import React, { FC, useCallback } from 'react';
import { useRouter } from 'helpers';

import { Img, Row } from 'ui';
import { color, zIndex } from 'styles';

export const ScreenHeaderComponent: FC = () => {
  const { push } = useRouter();
  // const goHome = useCallback(() => push('/app/team'), [push]);
  const goMyPage = useCallback(() => push('/app/my'), [push]);

  return (
    <Row
      zIndex={zIndex.level1}
      pr={16}
      pl={16}
      height={70}
      position="sticky"
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
      <Row></Row>
      {/* <Img src="/images/logo/logo.png" pointer onClick={goHome} alt="cohope" width="36" height="36" /> */}
      <Row alignItems="center">
        <Img onClick={goMyPage} ml={8} src="/images/icons/lee-1.svg" pointer width="30" height="30" alt="User" />
      </Row>
    </Row>
  );
};
