import { memo } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

import ReactHookFormDatePicker from 'common/components/react-hook-forms/ReactHookFormDatePicker';
import { getKeyOf } from 'common/utils/helpers';

import type { ProjectFieldValues } from 'fields/projects/utils/types';

interface DatePickersProps {
  formValues: UseFormReturn<ProjectFieldValues>;
  defaultValue?: FieldValues;
}

const DatePickers = function ({ formValues, defaultValue }: DatePickersProps): JSX.Element {
  const { reset, setValue } = formValues;

  return (
    <>
      <ReactHookFormDatePicker
        control={formValues.control}
        key="from"
        defaultValue={defaultValue?.from}
        name={getKeyOf<ProjectFieldValues>('from')}
        label="From"
        required
        fullWidth
        resetForm={reset}
        pickerMode="start"
        sx={{ gridArea: 'from' }}
      />
      <ReactHookFormDatePicker
        control={formValues.control}
        key="to"
        defaultValue={defaultValue?.to}
        name={getKeyOf<ProjectFieldValues>('to')}
        label="To"
        required
        showToggle
        resetForm={reset}
        setFromValue={setValue}
        pickerMode="end"
        fullWidth
        sx={{ gridArea: 'to' }}
      />
    </>
  );
};

export default memo(DatePickers);