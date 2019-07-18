import React, { useEffect, useState } from 'react';

const useComponentDidMount = (callback: () => void) => {
  const [initFlag, setInitFlag] = useState(false);
  useEffect(() => {
    if (!initFlag) {
      callback();
      setInitFlag(true);
    }
  });
};

export { useComponentDidMount };
