/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';
import type {
  Control,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  KeepStateOptions,
  Path,
  UseFormSetValue,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { endOfMonth, startOfMonth } from 'date-fns';
import { projectDatePresent } from 'fields/projects/components/utils/constants';
import merge from 'lodash.merge';

import type { DesktopDatePickerProps } from '@mui/lab';
import {
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';

import type { Project } from 'common/models/User';

import { DatePickerPaperStyled, DatePickerStyled } from './styled';

type Reset = (
    values: Partial<Project>,
    keepStateOptions: KeepStateOptions
) => void;

interface ReactHookFormDatePickerProps<T extends FieldValues> extends Partial<DesktopDatePickerProps<any>> {
  name: string;
  control: Control<T>;
  defaultValue?: string | Date | null;
  required?: boolean;
  showToggle?: boolean;
  setFromValue?: UseFormSetValue<Project>;
  resetForm?: Reset;
}

function PaperContent({
  children, handleCheckbox, present,
}: {
  children: React.ReactNode;
  handleCheckbox: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  present: boolean;
}): JSX.Element {
  return (
    <DatePickerPaperStyled>
      {children}
      <FormControlLabel
        control={<Switch name="present" checked={present} onChange={handleCheckbox} />}
        label="Present"
      />
    </DatePickerPaperStyled>
  );
}

function getErrorMessage(error?: FieldError, value?: string): string {
  if (!error || (value && value?.length < 10)) return '';
  return error.type === 'typeError' ? 'Invalid Date' : error.message || '';
}

// eslint-disable-next-line space-before-function-paren
const ReactHookFormDatePicker = function <T extends FieldValues>({
  name,
  control,
  defaultValue,
  required,
  showToggle,
  setFromValue,
  resetForm,
  pickerMode,
  ...rest
}: ReactHookFormDatePickerProps<T | any>): JSX.Element {
  const [present, setPresent] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.currentTarget;
    setPresent(checked);
    if (resetForm && setFromValue) {
      resetForm({}, {
        keepDirty: true,
        keepValues: true,
        keepErrors: false,
      });
      if (checked) setFromValue('to', projectDatePresent);
      else setFromValue('to', '');
    }
  };

  const toggleProps = showToggle ? {
    disabled: present,
    components: {
      PaperContent: PaperContent as React.ElementType<{children: React.ReactNode}>,
    },
    componentsProps: { paperContent: { handleCheckbox, present } },
  } : {};

  useEffect(() => {
    if (resetForm && setFromValue && defaultValue === projectDatePresent) {
      setPresent(true);
      setFromValue('to', projectDatePresent);
      resetForm({}, {
        keepValues: true,
        keepErrors: false,
        keepDirty: false,
      });
    }
  }, [defaultValue, resetForm, setFromValue]);

  const onChangeControl = (
    event: unknown,
    field: ControllerRenderProps<FieldValues | T, string | Path<T>>,
  ): void => {
    if (resetForm) {
      resetForm({}, {
        keepValues: true,
        keepErrors: false,
      });
    }
    field.onChange(event);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let formattedInput = event.target.value;

    if (formattedInput.length > 2 && !formattedInput.includes('.')) {
      formattedInput = `${formattedInput.slice(0, 2)}.${formattedInput.slice(2)}`;
    }

    setInputValue(formattedInput);
  };

  return (
    <Controller<T | FieldValues>
      name={name}
      control={control}
      defaultValue={defaultValue || null}
      render={({ field, fieldState: { error } }) => (
        <DatePickerStyled
          {...field}
          {...rest}
          label={rest.label}
          onChange={(event) => { onChangeControl(event, field); }}
          inputFormat="MM.YYYY"
          views={['year', 'month']}
          OpenPickerButtonProps={{
            disabled: false,
          }}
          {...toggleProps}
          renderInput={(renderInputProps) => {
            const startOfMonthDate = pickerMode === 'start'
              ? startOfMonth(new Date()) : endOfMonth(new Date());
            let props = renderInputProps;
            let dateValue = renderInputProps.inputProps?.value;

            if (dateValue.length > 2 && !dateValue.includes('.')) {
              dateValue = `${dateValue.slice(0, 2)}.${dateValue.slice(2)}`;
              if (props.inputProps) {
                props.inputProps.value = dateValue;
              }
            }

            if (showToggle) {
              const value = present ? projectDatePresent
                : renderInputProps.inputProps?.value;
              props = merge(renderInputProps, {
                inputProps: {
                  value,
                  min: startOfMonthDate.toISOString().substr(0, 7),
                  max: endOfMonth(new Date()).toISOString().substr(0, 7),
                },
              });
            }

            return (
              <TextField
                {...props}
                required={required}
                error={!!error?.message}
                value={inputValue || renderInputProps.inputProps?.value}
                onChange={handleInputChange}
                helperText={getErrorMessage(error, props.inputProps?.value)}
                fullWidth
                sx={{ wordBreak: 'break-word' }}
              />
            );
          }}
        />
      )}
    />
  );
};
export default ReactHookFormDatePicker;
