import { memo } from "react"
import type { FieldValues, UseFormReturn } from "react-hook-form"

import type { ProjectFieldValues } from "features/cv-form-components/projects/model/types"

import { getKeyOf } from "shared/lib/helpers/getKeyOf"
import ReactHookFormDatePicker from "shared/ui/react-hook-forms/ReactHookFormDatePicker"

interface DatePickersProps {
  formValues: UseFormReturn<ProjectFieldValues>
  defaultValue?: FieldValues
}

const DatePickers = function ({ formValues, defaultValue }: DatePickersProps): JSX.Element {
  const { reset, setValue } = formValues

  return (
    <>
      <ReactHookFormDatePicker
        control={formValues.control}
        key="from"
        defaultValue={defaultValue?.from}
        name={getKeyOf<ProjectFieldValues>("from")}
        label="From"
        required
        resetForm={reset}
        pickerMode="start"
      />
      <ReactHookFormDatePicker
        control={formValues.control}
        key="to"
        defaultValue={defaultValue?.to}
        name={getKeyOf<ProjectFieldValues>("to")}
        label="To"
        required
        showToggle
        resetForm={reset}
        setFromValue={setValue}
        pickerMode="end"
      />
    </>
  )
}

export default memo(DatePickers)
