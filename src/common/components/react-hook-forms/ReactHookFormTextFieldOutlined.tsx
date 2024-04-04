/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useMemo } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Input } from '@mbicycle/foundation-ui-kit';
import type { InputProps } from '@mbicycle/foundation-ui-kit/dist/components/Input';

import type { CategoryNameStateCertificates }
  from 'containers/main-page/cv-form/local-state/CategoryIdContext';

import type { FieldValues } from './utils/types';

interface TextFieldOutlinedControlledProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  label: string;
  type: 'number' | 'email' | 'password' | 'tel' | 'text' | 'url' | undefined;
  name: string;
  state?: CategoryNameStateCertificates
}

const ReactHookFormTextFieldOutlined = function<T extends FieldValues> ({
  control, label, state, type, name, ...props
}: TextFieldOutlinedControlledProps<T | any>): JSX.Element {
  const certificate = useMemo(
    () => (label === 'Certificate title' ? state?.name : state?.link),
    [label, state?.name, state?.link],
  );

  return (
    <Controller<T | FieldValues>
      control={control}
      name={name}
      key={name}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          {...props}
          value={(field.value || certificate || '') as string | number | readonly string[] | undefined}
          label={label}
          type={type}
          name={name}
          wrapperClasses="w-full"
          error={!!error?.message}
        />
      )}
    />
  );
};

export default memo(ReactHookFormTextFieldOutlined);
