import { TextareaHTMLAttributes } from 'react';
import {
  PaddingCss,
  MarginCss,
  WidthHeightCss,
  BackgroundCss,
  BorderCss,
  FlexboxCss,
  TransitionCss,
  FocusStyleCss,
} from 'ui/common';

interface TextareaTheme {
  backgroundTheme?: 'light' | 'dark';
}

export interface Props extends TextareaValueProps, TextareaLayoutProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}
export interface TextareaValueProps {
  text: string;
  onChangeText(text: string): void;
}
export interface TextareaLayoutProps
  extends PaddingCss,
    MarginCss,
    WidthHeightCss,
    BackgroundCss,
    BorderCss,
    TextareaTheme,
    FlexboxCss,
    TransitionCss,
    FocusStyleCss {
  resize?: boolean;
  responsiveHeight?: boolean;
}
