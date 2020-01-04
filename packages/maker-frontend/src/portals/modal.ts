import ReactDOM from 'react-dom';
import { FC, useRef } from 'react';

export const ModalPortal: FC = ({ children }) => {
  const { current } = useRef(document.getElementById('modal'));
  if (current) {
    return ReactDOM.createPortal(children, current);
  }
  return null;
};
