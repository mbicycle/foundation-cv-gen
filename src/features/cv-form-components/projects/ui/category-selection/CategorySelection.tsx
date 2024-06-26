import { memo, useEffect, useState } from "react"
import type { FieldArrayWithId, UseFormReturn } from "react-hook-form"
import { useFieldArray, useForm } from "react-hook-form"
import { InformationCircleIcon as InfoIcon } from "@heroicons/react/24/solid"

import { Button, Tooltip } from "@mbicycle/foundation-ui-kit"

import { useUserFromDb } from "widgets/cv-form/api/query-hooks"

import type { ProjectFieldValues } from "features/cv-form-components/projects/model/types"
import { ButtonText, CategoryAddText, tooltipText } from "features/cv-form-components/projects/ui/model/constants"
import SkillsToolsDialog from "features/cv-form-components/projects/ui/SkillsToolsDialog"

import type { Skill } from "entities/user/model"

import useBeforeUnload from "shared/lib/hooks/useBeforeUnload"
import useUnsaved from "shared/lib/hooks/useUnSaved"
import CircularSpinner from "shared/ui/circular-spinner/circular-spinner"
import WarningIcon from "shared/ui/icons/Warning"

import CategorySelectionItem from "./CategorySelectionItem"

export type CategoryItemProps = {
  categories: {
    skill: string
    tools: string[]
  }[]
}
type OnSubmitType = {
  tools: string[]
  skill?: Skill
}

type CategorySelectionProps = {
  formValues: UseFormReturn<ProjectFieldValues>
  defaultValues?: {
    skill: string
    tools: string[]
  }[]
}

type FieldType = {
  field: FieldArrayWithId<CategoryItemProps, "categories", "id">
}

const SkillSelection = function ({ formValues, defaultValues }: CategorySelectionProps): JSX.Element {
  const { data, isLoading } = useUserFromDb()
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [selected, setSelected] = useState<FieldArrayWithId<CategoryItemProps, "categories", "id">>()

  const usedCategories = formValues.getValues().categories?.map((element) => element.split(", ")[0]) || []

  const {
    control,
    formState: { isDirty },
    watch,
  } = useForm<CategoryItemProps>({
    mode: "onChange",
    defaultValues: {
      categories: defaultValues,
    },
  })
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "categories",
  })

  const onAddModalOpenHandle = (): void => {
    setOpen(true)
  }

  const onSubmitHandle = ({ skill, tools }: OnSubmitType): void => {
    if (selected) {
      const index = fields.findIndex((item) => item.id === selected.id)
      update(index, {
        skill: skill?.id || "",
        tools: tools.flat(Infinity),
      })
      setSelected(undefined)
    } else {
      append({
        skill: skill?.id ?? "",
        tools: tools.flat(Infinity),
      })
    }

    setOpen(false)
  }

  const onCancelHandle = (): void => {
    setSelected(undefined)
  }

  const getCategoriesCapture = (props: FieldType): FieldType => {
    const { field } = props
    const skill = data?.skills?.find((element) => element.id === field.skill)
    const tools = skill?.tools.filter((tool) => field.tools.includes(tool.id)).map((tool) => tool.name) || []

    return {
      field: {
        ...field,
        skill: skill?.name || "",
        tools,
      },
    }
  }

  const onClose = (): void => setOpen(false)

  useBeforeUnload(isDirty)
  useUnsaved(isDirty)

  const skills = watch("categories")

  useEffect(() => {
    formValues.setValue(
      "categories",
      fields.map(({ skill, tools }) => `${skill}, ${tools}`),
    )
    formValues.reset(
      {},
      {
        keepValues: true,
        keepErrors: false,
        keepDirty: false,
      },
    )

    setDisabled(skills?.length === data?.skills.length)
  }, [data?.skills.length, fields, formValues, skills])

  if (isLoading) {
    return <CircularSpinner size="medium" />
  }

  return (
    <div className="w-full">
      <div className="inline-flex">
        <h5 className="mb-2 pb-2 pr-1">{CategoryAddText.Title}</h5>
        <Tooltip content={tooltipText} classNameContent="w-[300px]">
          <InfoIcon className="ml-1 size-6 text-lg text-gray-700" />
        </Tooltip>
      </div>
      <div>
        <div className="w-full">
          {fields.map((field, index) => (
            <CategorySelectionItem
              key={field.id}
              field={getCategoriesCapture({ field }).field}
              fieldIndex={index}
              remove={remove}
              onSetSelected={() => setSelected(field)}
              onSetOpen={setOpen}
            />
          ))}
        </div>
        <div className="flex items-center gap-8">
          <Button variant="transparent" onClick={onAddModalOpenHandle} disabled={disabled}>
            {ButtonText.Select}
          </Button>
          {disabled && (
            <div className="flex items-center justify-between">
              <WarningIcon className="mr-2" />
              <p>You have selected all existing skill groups!</p>
            </div>
          )}
        </div>

        <SkillsToolsDialog
          user={data}
          open={open}
          onClose={onClose}
          control={control}
          onSubmit={onSubmitHandle}
          onCancel={onCancelHandle}
          defaultValues={selected}
          usedCategories={usedCategories}
        />
      </div>
    </div>
  )
}

export default memo(SkillSelection)
