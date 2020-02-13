import React, { FC, useCallback, ChangeEvent, KeyboardEvent } from 'react';
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
import { Props, InputLayoutProps } from './input-props';

export const TextInput: FC<Props> = ({
  isFlex = true,
  backgroundTheme = 'light',
  text = '',
  onChangeText = () => {},
  onEnterSubmit,
  ...props
}) => {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => onChangeText(e.target.value), [onChangeText]);
  const handleSubmit = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnterSubmit && e.key === 'Enter' && text) {
        e.preventDefault();
        onChangeText('');
        onEnterSubmit(text);
      }
    },
    [onChangeText, onEnterSubmit, text],
  );

  return (
    <StyledInput
      value={text}
      onChange={handleChange}
      onKeyPress={handleSubmit}
      isFlex={isFlex}
      backgroundTheme={backgroundTheme}
      {...props}
    />
  );
};

const StyledInput = styled.input<InputLayoutProps>`
  ${widthHeightCss}
  ${marginCss}
  ${paddingCss}
  ${backgroundCss}
  ${borderCss}
  ${flexboxCss}
  ${transitionCss}
  ${focusStyleCss}
  ${props => {
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
`;
