import { memo } from "react"
import type { Control } from "react-hook-form"
import { Controller } from "react-hook-form"

import { Select } from "@mbicycle/foundation-ui-kit"

import { TOOL_LEVELS as levels } from "features/cv-form-components/languages/ui/model/constants"
import { HelperText, LevelInputText, TOOLS_NAME } from "features/cv-form-components/skills/model/constants"

import type { Skill } from "entities/user/model"

interface LevelSelectionProps {
  control: Control<Skill>
  index: number
}

const options = levels.map(({ name }) => ({ id: name, name }))

const LevelSelection = function ({ control, index }: LevelSelectionProps): JSX.Element {
  return (
    <Controller<Skill>
      name={`${TOOLS_NAME}.${index}.${LevelInputText.Name}`}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Select {...field} options={options} value={field.value as string} label={LevelInputText.Label} />
          {!field.value && <p className={`${error ? "text-red-600" : "text-gray-600"}`}>{HelperText.SkillLevel}</p>}
        </div>
      )}
    />
  )
}

export default memo(LevelSelection)
