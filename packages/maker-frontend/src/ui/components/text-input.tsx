import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, FC, InputHTMLAttributes, KeyboardEvent, useCallback } from 'react';
import { MarginProps } from 'styled-system';
import { Col } from 'ui/layout';

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
export interface Props extends InputValueProps, InputHTMLAttributes<HTMLInputElement>, MarginProps {}

export const TextInput: FC<Props> = ({
  id,
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
    <Col alignItems="stretch" mt={mt} mb={mb} mr={mr} ml={ml}>
      <TextField
        name={name}
        type={type}
        autoComplete={autoComplete}
        id={id}
        label={placeholder}
        variant="outlined"
        color="primary"
        value={text}
        onChange={handleChange}
        onKeyPress={handleSubmit}
        error={!!errorMessage}
        helperText={errorMessage}
      />
    </Col>
  );
};
