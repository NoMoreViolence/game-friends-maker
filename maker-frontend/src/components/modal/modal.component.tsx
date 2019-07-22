import React, { useRef, useEffect, useCallback, memo } from 'react';
import { ModalRootDiv } from './modal.styled';

interface Props {
  exit?(): void;
  children?: JSX.Element;
}

const ModalComponent = ({ exit, children }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.currentTarget === e.target && (e.target as HTMLElement).contains(divRef.current)) {
        exit && exit();
      }
    },
    [divRef],
  );
  const checkKeyCode = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      exit && exit();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', checkKeyCode, false);
    if (divRef.current !== null) {
      divRef.current.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('keydown', checkKeyCode, false);
      if (divRef.current !== null) {
        (divRef.current as HTMLDivElement).removeEventListener('click', handleClick);
      }
    };
  }, []);

  return <ModalRootDiv ref={divRef}>{children && children}</ModalRootDiv>;
};

export default memo(ModalComponent);
