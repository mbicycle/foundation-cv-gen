import {
  useEffect, useRef, useState,
} from 'react';
import isEqual from 'lodash.isequal';

import type { SelectChangeEvent } from '@mui/material';

import { debounce } from 'common/utils/helpers';

type UseFormPropsReturnType<T> = {
  values: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> | any) => void;
  isDirty: boolean;
};

export const useForm = <T>(initialValues?: T): UseFormPropsReturnType<T> => {
  const [values, setValues] = useState<T>(initialValues as T);
  const valuesRef = useRef<T | null>(null);

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === 'true' || e.target.value === 'false') {
      setValues((v) => ({ ...v, [e.target.name]: e.target.value === 'false' }));
    } else {
      setValues((v) => {
        valuesRef.current = { ...v, [e.target.name]: e.target.value };
        return { ...v, [e.target.name]: e.target.value };
      });
    }
  }, 250);

  useEffect(() => () => {
    handleChange.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    values,
    handleChange: handleChange.handleChange,
    isDirty: isEqual(values, valuesRef.current),
  };
};
