/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useState } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { SelectProps } from '@mui/material';
import {
  Button, DialogActions, Select,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { ButtonText } from 'common/components/add-pattern/constants';

interface ReactHookFormSelectProps<T extends FieldValues> extends SelectProps {
  name: string;
  control: Control<T>;
  children: React.ReactNode;
}

// eslint-disable-next-line prefer-arrow-callback
const ReactHookFormSelect = forwardRef<unknown, ReactHookFormSelectProps<any>>(function<T extends FieldValues> ({
  name, control, children, ...props
}: ReactHookFormSelectProps<T | any>, ref: any): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  function renderTip(): JSX.Element | null {
    if (name !== 'tools') return null;
    return (
      <MenuItem value="" disabled sx={{ color: 'primary.main' }}>
        <em>Multiple Selection</em>
      </MenuItem>
    );
  }

  function renderButton(): JSX.Element | null {
    if (name !== 'tools') return null;
    return <DialogActions><Button variant="contained" onClick={handleClose}>{ButtonText.Ok}</Button></DialogActions>;
  }

  return (
    <Controller<T | FieldValues>
      render={({ field }) => (
        <Select
          {...ref}
          {...field}
          {...props}
          open={open}
          onClose={handleClose}
          onOpen={() => setOpen(true)}
          sx={{ display: 'flex' }}
        >
          {renderTip()}
          {children}
          {renderButton()}
        </Select>
      )}
      name={name}
      control={control}
      defaultValue=""
    />
  );
});

ReactHookFormSelect.displayName = 'ReactHookFormSelect';

export default ReactHookFormSelect;
