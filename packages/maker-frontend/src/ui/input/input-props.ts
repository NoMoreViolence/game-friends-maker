import { InputHTMLAttributes } from 'react';
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

interface InputTheme {
  backgroundTheme?: 'light' | 'dark';
}

export interface Props extends InputValueProps, InputLayoutProps, InputHTMLAttributes<HTMLInputElement> {}
export interface InputValueProps {
  text: string;
  onChangeText(text: string): void;
}
export interface InputLayoutProps
  extends PaddingCss,
    MarginCss,
    WidthHeightCss,
    BackgroundCss,
    BorderCss,
    InputTheme,
    FlexboxCss,
    TransitionCss,
    FocusStyleCss {}
