import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MSelect from '@material-ui/core/Select';
import { SelectOption } from 'constants-frontend';
import React, { ChangeEvent, FC, useCallback } from 'react';
import { Span12 } from 'ui/typo';

interface Props {
  labelId: string;
  label?: string;
  value?: string | number;
  select(value: string | number): void;
  list: SelectOption[];
  fullWidth?: boolean;
}
export const Select: FC<Props> = ({ fullWidth = false, list, labelId, label, value, select }) => {
  const submit = useCallback(
    (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => select((e.target.value as unknown) as string),
    [select]
  );

  return (
    <FormControl margin="dense" fullWidth={fullWidth} variant="outlined">
      <InputLabel color="secondary" id={labelId}>
        {label}
      </InputLabel>
      <MSelect
        color="secondary"
        required
        labelId={labelId}
        id={labelId}
        value={value ?? ''}
        onChange={submit}
        label={label}
      >
        {list.map((item) => (
          <MenuItem key={item.text} value={item.value}>
            <Span12>{item.text}</Span12>
          </MenuItem>
        ))}
      </MSelect>
    </FormControl>
  );
};
