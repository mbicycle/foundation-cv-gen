import { memo, useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"
import { useFieldArray, useForm } from "react-hook-form"
import { PlusCircleIcon as AddCircleOutlineIcon } from "@heroicons/react/24/outline"
import type { ProjectFieldValues } from "fields/projects/utils/types"

import { Button, Input } from "@mbicycle/foundation-ui-kit"

import GarbageIcon from "common/icons/GarbageIcon"
import useBeforeUnload from "common/utils/hooks/useBeforeUnload"
import useUnsaved from "common/utils/hooks/useUnSaved"

import { ButtonText, Text } from "./utils/constants"

type AddResponsibilityProps = {
  responsibilities: {
    responsibility: string
  }[]
}

type ResponsibilitiesProps = {
  formValues: UseFormReturn<ProjectFieldValues>
  defaultValues?: {
    responsibility: string
  }[]
}

const Responsibilities = function ({
  formValues,
  defaultValues = [
    {
      responsibility: "",
    },
  ],
}: ResponsibilitiesProps): JSX.Element {
  const {
    register,
    control,
    watch,
    formState: { isDirty },
  } = useForm<AddResponsibilityProps>({
    defaultValues: {
      responsibilities: defaultValues,
    },
    mode: "onBlur",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "responsibilities",
  })

  const onAddHandle = (): void => {
    append({ responsibility: "" })
  }

  const watchFieldArray = watch("responsibilities")
  const controlledFields = fields.map((field, index) => ({ ...field, ...watchFieldArray[index] }))

  useBeforeUnload(isDirty)
  useUnsaved(isDirty)

  useEffect(() => {
    formValues.setValue("responsibilities", [...controlledFields.map((field) => field.responsibility)])
    formValues.resetField("responsibilities", { keepError: false, keepDirty: false })
  }, [controlledFields, formValues])

  return (
    <>
      <p>{Text.ResponsibilitiesTitle}</p>
      {controlledFields.map((field, index) => (
        <div key={field.id} className="flex w-full flex-row items-end">
          <div className="my-1">
            <Input
              required
              id={field.id}
              label={`Responsibility ${index + 1}`}
              defaultValue={field.responsibility}
              {...register(`responsibilities.${index}.responsibility` as const)}
            />
          </div>
          <div className="flex w-[40%]">
            <button type="button" className="flex items-center p-4" onClick={() => remove(index)}>
              <GarbageIcon className="size-6 text-blue-500" />
            </button>
          </div>
        </div>
      ))}
      <div>
        <Button variant="transparent" onClick={onAddHandle} icon={AddCircleOutlineIcon}>
          {ButtonText.Add}
        </Button>
      </div>
    </>
  )
}

export default memo(Responsibilities)
