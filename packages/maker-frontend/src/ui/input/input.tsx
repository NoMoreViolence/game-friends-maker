import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, FC, KeyboardEvent, useCallback } from 'react';
import styled from 'styled-components';
import { margin } from 'styled-system';
import { InputStyledProps, Props } from './input-props';

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
