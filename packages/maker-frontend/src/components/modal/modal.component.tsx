import React, { FC, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ModalPortal } from 'portals';
import { Container } from 'ui';
import { ModalRootDiv } from './modal.styled';

interface Props {
  display?: boolean; // false
  exit?(): void;
}

const ModalComponent: FC<Props> = ({ display, exit, children }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.currentTarget === e.target && (e.target as HTMLElement).contains(divRef.current)) {
        exit && exit();
      }
    },
    [exit],
  );
  const checkKeyCode = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        exit && exit();
      }
    },
    [exit],
  );

  useEffect(() => {
    if (divRef.current !== null) {
      const refHtml = divRef.current;
      document.addEventListener('keydown', checkKeyCode, false);
      refHtml.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('keydown', checkKeyCode, false);
        refHtml.removeEventListener('click', handleClick);
      };
    }
  }, [checkKeyCode, handleClick, display]);

  return (
    <ModalPortal>
      <CSSTransition in={display} timeout={250} unmountOnExit={true} classNames="animation">
        <ModalRootDiv ref={divRef}>
          <Container>{children}</Container>
        </ModalRootDiv>
      </CSSTransition>
    </ModalPortal>
  );
};

export default ModalComponent;
