/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Select } from '@mbicycle/foundation-ui-kit';
import type { SelectProps } from '@mbicycle/foundation-ui-kit/dist/components/Select';

interface ReactHookFormSelectProps<T extends FieldValues> extends SelectProps {
  name: string;
  control: Control<T>;
}

// eslint-disable-next-line prefer-arrow-callback
const ReactHookFormSelect = forwardRef<unknown, ReactHookFormSelectProps<any>>(function<T extends FieldValues> ({
  name, control, onChange, value, options, multiple, label, ...props
}: ReactHookFormSelectProps<T | any>, ref: any): JSX.Element {
  return (
    <Controller<T | FieldValues>
      render={({ field }) => (
        <div className="flex items-center justify-center">
          <Select
            {...ref}
            {...field}
            {...props}
            options={options}
            label={label}
            value={value || null}
            onChange={onChange}
            multiple={multiple}
          />
        </div>
      )}
      name={name}
      control={control}
      defaultValue=""
    />
  );
});

ReactHookFormSelect.displayName = 'ReactHookFormSelect';

export default ReactHookFormSelect;
