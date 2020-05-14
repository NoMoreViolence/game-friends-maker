import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, FC, InputHTMLAttributes, KeyboardEvent, useCallback } from 'react';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';

export interface InputValueProps {
  autoComplete?: string;
  name?: string;
  type?: string;
  text?: string;
  onChangeText?(text: string): void;
  // Enter submit
  onEnterSubmit?(text: string): void;
  placeholder?: string;
  errorMessage?: string;
}
export interface InputStyledProps extends MarginProps {}
export interface Props extends InputValueProps, InputHTMLAttributes<HTMLInputElement>, InputStyledProps {}

export const TextInput: FC<Props> = ({
  text = '',
  onChangeText = () => {},
  onEnterSubmit,
  placeholder,
  name,
  type,
  autoComplete,
  mt,
  mb,
  mr,
  ml,
  errorMessage,
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
    [onChangeText, onEnterSubmit, text]
  );

  return (
    <StyledInput
      name={name}
      type={type}
      autoComplete={autoComplete}
      id="outlined-basic"
      label={placeholder}
      variant="outlined"
      color="secondary"
      value={text}
      onChange={handleChange}
      onKeyPress={handleSubmit}
      error={!!errorMessage}
      helperText={errorMessage}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
    />
  );
};

const StyledInput = styled(TextField)<InputStyledProps>`
  ${margin}
`;
