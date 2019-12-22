import { useState, useCallback } from 'react';

type ReturnType = [() => void, () => void, string];

export function useFocusAndFocusOut(originColor: string, hoverColor: string): ReturnType {
  const [color, setColor] = useState(originColor);

  const onFocus = useCallback(() => setColor(hoverColor), [hoverColor]);
  const onBlur = useCallback(() => setColor(originColor), [originColor]);

  return [onFocus, onBlur, color];
}
