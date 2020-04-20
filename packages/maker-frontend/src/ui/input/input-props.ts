import { InputHTMLAttributes } from 'react';
import { MarginProps } from 'styled-system';

export interface Props extends InputValueProps, InputHTMLAttributes<HTMLInputElement>, InputStyledProps {}
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
