import { useCallback, useEffect, useRef, useState } from "react"
import type { Control, FieldArrayWithId, FormState } from "react-hook-form"
import { defaultDragState } from "fields/skills/components/skills/Constants"

import type { Skill, Tool as ToolType } from "common/models/User"

import Tool from "."

interface IToolListProps {
  tools: FieldArrayWithId<Skill, "tools">[]
  control: Control<Skill, unknown>
  formState: FormState<Skill>
  move: (from: number, to: number) => void
  newTool: ToolType | undefined
  onDeleteToolHandle: (deleteSkillPosition: number, deleteSkillId: string) => void
}

interface DragState {
  isDragging: boolean
  id: string
  originalIndex: number
  newIndex: number
}

function ToolList(props: IToolListProps): JSX.Element {
  const { tools, move, formState, newTool, control, onDeleteToolHandle } = props

  const elementRef = useRef<null | HTMLDivElement>(null)
  const scrollToElement = (): void =>
    elementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    })

  const [dragState, setDragState] = useState<DragState>(defaultDragState)

  useEffect(() => {
    setTimeout(() => {
      scrollToElement()
    }, 250)
  }, [newTool])

  const onDragStart = (id: string, index: number): void => {
    setDragState({
      isDragging: true,
      id,
      originalIndex: index,
      newIndex: index,
    })
  }

  const onDragEnd = useCallback(async (): Promise<void> => {
    if (dragState.originalIndex !== dragState.newIndex) {
      move(dragState.originalIndex, dragState.newIndex)
    }

    setDragState(defaultDragState)
  }, [dragState.newIndex, dragState.originalIndex, move])

  const onDragOver = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault()
    const targetIndex = parseInt(e.currentTarget.getAttribute("data-index") || "-1", 10)
    if (dragState.originalIndex !== targetIndex && dragState.newIndex !== targetIndex) {
      setDragState({
        ...dragState,
        newIndex: targetIndex,
      })
    }
  }

  const onDragLeave = (): void => {
    setDragState({
      ...dragState,
      newIndex: dragState.originalIndex,
    })
  }

  return (
    <div className="flex h-[calc(100vh-30rem)] w-full flex-col gap-y-4 overflow-y-auto rounded-lg border p-2">
      <ul className="w-full list-none">
        {tools.map((tool, index) => {
          const border = {
            border:
              dragState.newIndex === index && dragState.originalIndex !== dragState.newIndex ? "1px solid #2a57e0" : "",
          }
          return (
            <li
              key={tool.id}
              data-index={index}
              draggable
              onDragStart={() => onDragStart(tool.id, index)}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={dragState.originalIndex === index ? "translate-y-0 transform opacity-20" : ""}
            >
              <Tool
                key={tool.id}
                tool={tools[index]}
                index={index}
                expanded={!!newTool}
                onDeleteTool={() => onDeleteToolHandle(index, tools[index].id)}
                control={control}
                errorText={formState.errors?.tools && formState.errors?.tools[index]?.name?.message}
                style={border}
                elementRef={elementRef}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ToolList
