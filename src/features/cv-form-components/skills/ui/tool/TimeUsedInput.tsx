import { memo, useMemo } from "react"
import type { Control } from "react-hook-form"

import { SkillYearsRange, TimeUsedInputText, TOOLS_NAME } from "features/cv-form-components/skills/model/constants"

import type { Skill } from "entities/user/model"

import ReactHookFormTextFieldOutlined from "shared/ui/react-hook-forms/ReactHookFormTextFieldOutlined"

interface TimeUsedInputProps {
  value: number
  control: Control<Skill>
  index: number
}

const TimeUsedInput = function (props: TimeUsedInputProps): JSX.Element {
  const { value, control, index } = props

  const experienceHelper = useMemo(() => {
    if (value <= SkillYearsRange.Min) {
      return `Please enter a value that is more than ${SkillYearsRange.Min}`
    }
    if (value >= SkillYearsRange.Max) {
      return `Please enter a value that is less than ${SkillYearsRange.Max}`
    }
    if (value % 0.5 !== 0) return "Please enter a value that is multiply of 0.5"
    return ""
  }, [value])

  const onWheelHandler = (e: React.WheelEvent<HTMLInputElement>): void => {
    if (e.target instanceof HTMLElement) e.target.blur()
  }

  return (
    <ReactHookFormTextFieldOutlined
      type="number"
      autoComplete="false"
      label={TimeUsedInputText.Label}
      name={`${TOOLS_NAME}.${index}.${TimeUsedInputText.Name}`}
      control={control}
      min={SkillYearsRange.Min}
      max={SkillYearsRange.Max - 0.5}
      step={0.5}
      helperText={experienceHelper}
      onWheel={onWheelHandler}
    />
  )
}

export default memo(TimeUsedInput)
