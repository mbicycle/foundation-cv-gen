import type { CSSProperties } from "react"
import React, { memo, useMemo } from "react"
import type { Control } from "react-hook-form"
import type { Skill, Tool as ToolType } from "entities/user/model"
import { HelperText, Text, ToolInputText, TOOLS_NAME } from "fields/skills/utils/constants"
import DragIndicatorIcon from "shared/ui/icons/DragIndicatorIcon"
import GarbageIcon from "shared/ui/icons/GarbageIcon"
import ReactHookFormTextFieldOutlined from "shared/ui/react-hook-forms/ReactHookFormTextFieldOutlined"

import { Accordion } from "@mbicycle/foundation-ui-kit"

import LevelSelection from "./LevelSelection"
import TimeUsedInput from "./TimeUsedInput"

interface ToolProps {
  tool: ToolType
  expanded: boolean
  onDeleteTool: (id: string) => void
  control: Control<Skill>
  index: number
  style?: CSSProperties
  errorText: string | undefined
  elementRef?: React.MutableRefObject<HTMLDivElement | null>
}

const Tool = function (toolProps: ToolProps): JSX.Element {
  const { tool, expanded, onDeleteTool, control, index, errorText, elementRef, style } = toolProps

  const onDeleteToolHandle = (): void => {
    onDeleteTool(tool.id)
  }

  const toolText = useMemo(
    () => `${Text.Tool}: ${tool.name} ${tool.level ? `(${tool.level})` : ""}
    ${tool.experience ? `[${tool.experience} year]` : ""}`,
    [tool.name, tool.level, tool.experience],
  )

  const isEmptyName = tool.name.trim().length === 0
  const emptyNameHelpText = isEmptyName ? HelperText.Skill : errorText

  return (
    <div className="mx-auto w-full rounded-2xl bg-white p-2" ref={elementRef} style={style}>
      <Accordion defaultOpen={expanded}>
        <Accordion.Title>
          <div className="flex w-full items-center justify-between pr-2">
            <div className="flex w-full items-center pr-2">
              <DragIndicatorIcon className="size-7 text-gray-500" />
              <p className="pl-1">{toolText}</p>
            </div>
            <button type="button" aria-label="delete" onClick={onDeleteToolHandle} className="deleteBtn">
              <GarbageIcon className="size-5 text-blue-500" />
            </button>
          </div>
        </Accordion.Title>
        <Accordion.Body className="px-8 pb-8">
          <div className="w-full">
            <ReactHookFormTextFieldOutlined
              type="text"
              control={control}
              label={ToolInputText.Label}
              name={`${TOOLS_NAME}.${index}.${ToolInputText.Name}`}
              autoFocus
              error={isEmptyName}
              helperText={emptyNameHelpText}
            />
          </div>
          <div className="flex flex-nowrap gap-8">
            <div className="mt-5 flex w-1/2">
              <LevelSelection control={control} index={index} />
            </div>
            <div className="mt-5 flex w-1/2">
              <TimeUsedInput value={tool.experience} control={control} index={index} />
            </div>
          </div>
        </Accordion.Body>
      </Accordion>
    </div>
  )
}

export default memo(Tool)
