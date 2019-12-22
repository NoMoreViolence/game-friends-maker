import React, { FC } from 'react';
import Spinner from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';
import AsyncSelect from 'react-select/async';
import { Props as AsyncSelectProps } from 'react-select/src/Select';

export type ActionTypes =
  | 'select-option'
  | 'deselect-option'
  | 'remove-value'
  | 'pop-value'
  | 'set-value'
  | 'clear'
  | 'create-option';
export interface ActionMeta {
  action: ActionTypes;
}
export type OptionsType<OptionTypeBase> = ReadonlyArray<OptionTypeBase>;
export interface OptionTypeBase {
  value: string;
  label: string;
}
type LoadOptions = (
  inputValue: string,
  callback: (options: OptionsType<OptionTypeBase>) => void,
) => void | Promise<any>;

const LoadingIndicator: FC = () => (
  <Tooltip content={'Custom Loader'}>
    <Spinner delay={0} />
  </Tooltip>
);

interface Props {
  onChange?: AsyncSelectProps['onChange'];
  placeholder?: string;
  onFocus?(): void;
  onBlur?(): void;
  isSearchable?: boolean;
  loadOptions: LoadOptions;
  styles?: AsyncSelectProps['style'];
  theme?: AsyncSelectProps['theme'];
}
export const Select: FC<Props> = ({
  placeholder = 'Type something...',
  onChange,
  onFocus,
  onBlur,
  isSearchable = true,
  loadOptions,
  styles,
  theme,
}) => (
  <AsyncSelect
    placeholder={placeholder}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    isSearchable={isSearchable}
    loadOptions={loadOptions}
    styles={styles}
    theme={theme}
    isClearable
    cacheOptions
    defaultOptions
    components={{ LoadingIndicator }}
  />
);
