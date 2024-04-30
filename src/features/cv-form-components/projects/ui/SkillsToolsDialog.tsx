import { memo, useEffect, useMemo, useState } from "react"
import type { Control, FieldArrayWithId } from "react-hook-form"

import { Button, Modal } from "@mbicycle/foundation-ui-kit"

import type { DbUser, Skill } from "entities/user/model"

import ReactHookFormSelect from "shared/ui/react-hook-forms/ReactHookFormSelect"
import { ButtonText } from "shared/widgets/add-pattern/constants"

import type { CategoryItemProps } from "./category-selection/CategorySelection"
import { getFilteredSkillGroups } from "./lib/functions"
import { CategoryAddText } from "./model/constants"

type DialogFormReturnType = {
  tools: string[]
  skill?: Skill
}

interface SkillsToolsDialogProps {
  open: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<CategoryItemProps, any>
  onClose: VoidFunction
  onSubmit: (data: DialogFormReturnType) => void
  onCancel: VoidFunction
  user?: DbUser
  defaultValues?: FieldArrayWithId<CategoryItemProps, "categories", "id">
  usedCategories: string[]
}

const SkillsToolsDialog = function (props: SkillsToolsDialogProps): JSX.Element {
  const { user, open, onClose, control, onSubmit, defaultValues, onCancel, usedCategories } = props
  const [skill, setSkill] = useState<Skill | undefined>()
  const [tools, setSelectedTools] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState([...usedCategories])

  useEffect(() => {
    if (defaultValues) {
      const defaultSkill = user?.skills?.find((c) => c.id === defaultValues.skill)
      setSkill(defaultSkill)
      setSelectedTools(defaultValues.tools)
    }
    setSelectedCategories([...usedCategories])
  }, [defaultValues, user?.skills, open, usedCategories])

  const clearForm = (): void => {
    setSkill(undefined)
    setSelectedTools([])
  }

  const doSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    event.stopPropagation()

    const returnData = {
      skill,
      tools,
    }

    onSubmit(returnData)
    clearForm()
  }

  const handleSkillChange = (value: string | string[]): void => {
    const selected = value as string
    if (skill) {
      setSelectedCategories((prev) => [...prev.filter((category) => category !== skill.id), `${selected}`])
    } else {
      setSelectedCategories((prev) => [...prev, `${selected}`])
    }
    setSkill(user?.skills.find((c) => c.id === selected))
    setSelectedTools([])
  }

  const handleToolsChange = (values: string | string[]): void => {
    setSelectedTools(values as string[])
  }

  const cancelHandler = (): void => {
    onClose()
    clearForm()
    onCancel()
  }

  const skillOptions = useMemo(
    () => getFilteredSkillGroups(user?.skills || [], selectedCategories, skill),
    [selectedCategories, skill, user?.skills],
  )
  const toolOptions = useMemo(() => skill?.tools || [], [skill?.tools])

  return (
    <Modal open={open} onClose={onClose} title={CategoryAddText.DialogTitle} classNameContent="px-14 py-12">
      <form onSubmit={doSubmit} id="skill-form" className="mt-10">
        <div className="mb-14 flex min-w-[400px] max-w-52 gap-4">
          <div className="w-full">
            <ReactHookFormSelect
              id="category-dialog"
              label={CategoryAddText.Skill}
              value={skill?.id || null}
              options={skillOptions}
              onChange={handleSkillChange}
              name="category"
              control={control}
              required
            />
          </div>
          <div className="w-full">
            <ReactHookFormSelect
              id="tool-dialog"
              label={CategoryAddText.Tool}
              value={tools}
              options={toolOptions}
              onChange={handleToolsChange}
              control={control}
              name="tools"
              disabled={!skill?.name}
              multiple
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-4">
          <Button variant="transparent" onClick={cancelHandler}>
            {ButtonText.Cancel}
          </Button>
          <Button form="skill-form" type="submit">
            {ButtonText.Ok}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default memo(SkillsToolsDialog)
