/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';

export type Option = {
  id: string
  name: string
}

interface ReactHookFormSelectProps<T extends FieldValues> extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  name: string;
  control: Control<T>;
  onChange: T extends { multiple: true } ? (value: string[]) => void : (value: string) => void;
  value: T extends { multiple: true } ? string[] : Option | null;
  options: Option[];
  multiple?: boolean;
  label?: string;
}

// eslint-disable-next-line prefer-arrow-callback
const ReactHookFormSelect = forwardRef<unknown, ReactHookFormSelectProps<any>>(function<T extends FieldValues> ({
  name, control, onChange, value, options, multiple, label, ...props
}: ReactHookFormSelectProps<T | any>, ref: any): JSX.Element {
  console.log({
    name, value, multiple,
  });

  return (
    <Controller<T | FieldValues>
      render={({ field }) => (
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xs mx-auto">
            <Listbox
              {...ref}
              {...field}
              {...props}
              as="div"
              className="space-y-1"
              value={value || null}
              onChange={onChange}
              multiple={multiple}
            >
              {({ open }) => (
                <>
                  {label && (
                    <Listbox.Label className="block leading-5 mb-4 font-medium text-gray-700">
                      {label}
                    </Listbox.Label>
                  )}
                  <div className="relative">
                    <span className="inline-block w-full rounded-md shadow-sm">
                      <Listbox.Button
                        className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left
                         focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                          transition ease-in-out duration-150"
                      >
                        <span className="block truncate">
                          {(Array.isArray(value) ? `Selected: ${value.length || 0}` : value?.name) || 'Select'}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Listbox.Button>
                    </span>

                    <Transition
                      unmount={false}
                      show={open}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      className="absolute z-40 mt-1 w-full rounded-md bg-white shadow-lg"
                    >
                      <Listbox.Options
                        static
                        className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none"
                      >
                        {options.map((item) => (
                          <Listbox.Option key={item.id} value={item.id}>
                            {({ active, selected }) => (
                              <div
                                className={`${
                                  active
                                    ? 'text-white bg-blue-600'
                                    : 'text-gray-900'
                                } cursor-default select-none relative py-2 pl-8 pr-4`}
                              >
                                <span
                                  className={`${
                                    selected ? 'font-semibold' : 'font-normal'
                                  } block truncate`}
                                >
                                  {item.name}
                                </span>
                                {selected && (
                                  <span
                                    className={`${
                                      active ? 'text-white' : 'text-blue-600'
                                    } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
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
