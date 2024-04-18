/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from "react"
import React, { memo, useCallback, useEffect, useState } from "react"
import type {
  Control,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  KeepStateOptions,
  Path,
  UseFormSetValue,
} from "react-hook-form"
import { Controller } from "react-hook-form"
import dayjs from "dayjs"
import { projectDatePresent } from "fields/projects/components/utils/constants"

import { Datepicker, Toggle } from "@mbicycle/foundation-ui-kit"
import type { DatepickerProps } from "@mbicycle/foundation-ui-kit/dist/components/Datepicker"

import type { Project } from "common/models/User"

type Reset = (values: Partial<Project>, keepStateOptions: KeepStateOptions) => void

interface ReactHookFormDatePickerProps<T extends FieldValues> extends Partial<DatepickerProps> {
  name: string
  control: Control<T>
  defaultValue?: string | Date | null
  required?: boolean
  showToggle?: boolean
  setFromValue?: UseFormSetValue<Project>
  resetForm?: Reset
  pickerMode?: "start" | "end"
}

function renderSwitch({
  handleCheckbox,
  present,
}: {
  handleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void
  present: boolean
}): React.ReactNode {
  return (
    <div className="flex h-full flex-col items-center justify-start">
      <span className="mb-4">Present</span>
      <Toggle name="present" checked={present} onChange={handleCheckbox} classNameWrapper="me-0" />
    </div>
  )
}

function getErrorMessage(error?: FieldError, value?: string): string {
  if (!error || (value && value?.length < 10)) return ""
  return error.type === "typeError" ? "Invalid Date" : error.message || ""
}

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
  const startOfMonthDate = dayjs(new Date()).startOf("month").toDate()
  const endOfMonthDate = dayjs(new Date()).endOf("month").toDate()

  const [present, setPresent] = useState(false)

  const handleCheckbox = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { checked } = event.currentTarget
      setPresent(checked)
      if (resetForm && setFromValue) {
        resetForm(
          {},
          {
            keepDirty: true,
            keepValues: true,
            keepErrors: false,
          },
        )
        if (checked) setFromValue("to", projectDatePresent)
        else setFromValue("to", "")
      }
    },
    [resetForm, setFromValue],
  )

  useEffect(() => {
    if (resetForm && setFromValue && defaultValue === projectDatePresent) {
      setPresent(true)
      setFromValue("to", projectDatePresent)
      resetForm(
        {},
        {
          keepValues: true,
          keepErrors: false,
          keepDirty: false,
        },
      )
    }
  }, [defaultValue, resetForm, setFromValue])

  const onChangeControl = (
    date: Date | null | undefined,
    field: ControllerRenderProps<FieldValues | T, string | Path<T>>,
  ): void => {
    if (resetForm) {
      resetForm(
        {},
        {
          keepValues: true,
          keepErrors: false,
        },
      )
    }
    if (date) {
      field.onChange({ target: { value: date } })
    }
  }

  return (
    <Controller<T | FieldValues>
      name={name}
      control={control}
      defaultValue={defaultValue || null}
      render={({ field, fieldState: { error } }) => {
        const selected = field.value && field.value !== projectDatePresent ? new Date(field.value) : null

        return (
          <div className="flex w-full flex-row items-center justify-between">
            <Datepicker
              {...field}
              {...rest}
              label={rest.label}
              selected={selected}
              disabled={present}
              dateFormat="MM.yyyy"
              onChange={(date: Date | null | undefined) => {
                onChangeControl(date, field)
              }}
              showMonthYearPicker
              showFullMonthYearPicker
              inputProps={{
                required,
                helperText: getErrorMessage(error, field.value),
                min: (pickerMode === "start" ? startOfMonthDate : endOfMonthDate).toISOString().substr(0, 7),
                max: endOfMonthDate.toISOString().substr(0, 7),
                error: !!error?.message,
                type: "text",
              }}
            />
            {showToggle && renderSwitch({ handleCheckbox, present })}
          </div>
        )
      }}
    />
  )
}
export default memo(ReactHookFormDatePicker)
