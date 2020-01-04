import ReactDOM from 'react-dom';
import { FC, useRef } from 'react';

export const LoadingPortal: FC = ({ children }) => {
  const { current } = useRef(document.getElementById('loading'));
  if (current) {
    return ReactDOM.createPortal(children, current);
  }
  return null;
};
