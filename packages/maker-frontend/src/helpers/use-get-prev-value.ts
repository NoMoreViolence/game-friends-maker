import { useEffect, useRef } from 'react';

const useGetPreviousValue = <T>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export { useGetPreviousValue };
