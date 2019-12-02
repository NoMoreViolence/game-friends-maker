import React, { FC, useCallback } from 'react';
import { useRouter, Icon } from 'helpers';

import { Img } from 'ui';
import { HeaderContainer, Menu } from './screen-header.styled';
import { color, zIndex } from 'styles';

interface Props {}

const ScreenHeaderComponent: FC<Props> = () => {
  const { push } = useRouter();

  const goHome = useCallback(() => push('/app/team'), [push]);
  const goSearch = useCallback(() => push('/app/search'), [push]);
  const goNoti = useCallback(() => push('/app/notification'), [push]);
  const goChat = useCallback(() => push('/app/chat'), [push]);
  const goMyPage = useCallback(() => push('/app/my'), [push]);

  return (
    <HeaderContainer
      zIndex={zIndex.level1}
      pr={16}
      pl={16}
      height={70}
      backgroundColor={color.white}
      justifyContent="space-between"
    >
      <Img src="/images/logo/logo.png" pointer onClick={goHome} alt="cohope" width="36" height="36" />
      <Menu alignItems="center">
        <Icon onClick={goSearch} mr={8} ml={8} pointer iconClass={'uil uil-search'} iconStyle={{ fontSize: '30px' }} />
        <Icon onClick={goNoti} mr={8} ml={8} pointer iconClass={'uil uil-bell'} iconStyle={{ fontSize: '30px' }} />
        <Icon onClick={goChat} mr={8} ml={8} pointer iconClass="uil uil-comments" iconStyle={{ fontSize: '30px' }} />
        <Img onClick={goMyPage} ml={8} src="/images/icons/lee-1.svg" pointer width="30" height="30" alt="User" />
      </Menu>
    </HeaderContainer>
  );
};

export default ScreenHeaderComponent;
