import React, { FC, ChangeEvent, useCallback, useRef, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import styled from 'styled-components';
import {
  widthHeightCss,
  marginCss,
  paddingCss,
  backgroundCss,
  borderCss,
  flexboxCss,
  transitionCss,
  focusStyleCss,
} from 'ui/common';
import { color } from 'styles';
import { Props, TextareaLayoutProps } from './textarea-props';

export const Textarea: FC<Props> = ({ isFlex = true, backgroundTheme = 'light', text, onChangeText, ...props }) => {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => onChangeText(e.target.value), [
    onChangeText,
  ]);

  useEffect(() => {
    if (textarea.current && props.responsiveHeight) {
      const event = fromEvent<ChangeEvent<HTMLTextAreaElement>>(textarea.current, 'input')
        .pipe(
          tap((event) => {
            const outerHeight = !event.target.style.height
              ? typeof props.height === 'number'
                ? props.height
                : 30
              : parseInt(event.target.style.height, 10);
            const diff = outerHeight - event.target.clientHeight;
            event.target.style.height =
              Math.max(typeof props.height === 'number' ? props.height : 30, event.target.scrollHeight + diff) + 'px';
          })
        )
        .subscribe(() => {});

      return () => {
        event.unsubscribe();
      };
    }
  }, [props.height, props.responsiveHeight, textarea]);

  return (
    <StyledTextarea
      ref={textarea}
      value={text}
      onChange={handleChange}
      isFlex={isFlex}
      backgroundTheme={backgroundTheme}
      {...props}
    />
  );
};

const StyledTextarea = styled.textarea<TextareaLayoutProps>`
  ${widthHeightCss}
  ${marginCss}
  ${paddingCss}
  ${backgroundCss}
  ${borderCss}
  ${flexboxCss}
  ${transitionCss}
  ${focusStyleCss}
  ${(props) => {
    if (props.backgroundTheme === 'light') {
      return `
        background-color: ${color.white};
        border-width: 1px;
        border-style: solid;
        border-color: ${color['border-gray']};
        border-radius: 2px;
      `;
    }
    return `
      background-color: ${color.loadingBackground};
      border-width: 0px;
      border-style: solid;
      border-color: ${color['border-gray']};
      border-radius: 2px;
    `;
  }}
  ${(props) => (props.resize ? '' : 'resize: none;')}
`;
