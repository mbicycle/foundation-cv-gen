import { memo, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import dayjs from "dayjs"
import { projectSchema, renderErrorMessage } from "fields/projects/components"
import { CategorySelection } from "fields/projects/components/category-selection"
import DatePickers from "fields/projects/components/DatePickers"
import Responsibilities from "fields/projects/components/Responsibilities"
import { ProjectInputsText } from "fields/projects/components/utils/constants"
import type { ProjectFieldValues } from "fields/projects/utils/types"

import { Button, Divider } from "@mbicycle/foundation-ui-kit"

import { ButtonStep } from "containers/main-page/cv-form/utils/constants"
import ReactHookFormTextFieldOutlined from "common/components/react-hook-forms/ReactHookFormTextFieldOutlined"
import { useGuestToken } from "common/context/guest-token"
import useBeforeUnload from "common/utils/hooks/useBeforeUnload"
import useUnsaved from "common/utils/hooks/useUnSaved"

import { useEditProject } from "./hooks"

const EditProject = function (): JSX.Element | null {
  const { project, isLoading, cancelHandle, onSaveProjectHandle } = useEditProject()

  const formValues = useForm<ProjectFieldValues>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(projectSchema),
  })

  const { state: tokenState } = useGuestToken()
  const { openDialogHandler } = useUnsaved(formValues.formState.isDirty)

  const cancelClickHandle = (): void => {
    openDialogHandler({ handleLeave: cancelHandle })
  }

  const responsibilities = useMemo(
    () => project?.responsibilities.map((responsibility) => ({ responsibility })),
    [project?.responsibilities],
  )

  const categories = useMemo(
    () =>
      project?.categories?.map((category) => {
        const values = category.split(",").map((value) => value.trim())

        return {
          skill: values[0],
          tools: values?.slice(1) || [],
        }
      }),
    [project?.categories],
  )

  useBeforeUnload(formValues.formState.isDirty)

  useEffect(() => {
    if (!project) return

    Object.entries(project).forEach(([key, value]) => {
      if (key === "from" || key === "to") {
        let parsedDate = null
        if (value) {
          if (dayjs(value).isValid()) parsedDate = new Date(value)
          else parsedDate = value
        }
        formValues.setValue(key as keyof ProjectFieldValues, parsedDate)
      } else if (key !== "responsibilities" && key !== "categories") {
        formValues.setValue(key as keyof ProjectFieldValues, value)
      }
    })
  }, [project, formValues])

  const descriptionErrorMessage = formValues.formState.errors.description?.message
  const titleErrorMessage = formValues.formState.errors.title?.message
  const roleErrorMessage = formValues.formState.errors.role?.message

  return (
    <form className="flex w-full flex-col gap-8 p-4" onSubmit={formValues.handleSubmit(onSaveProjectHandle)}>
      <div className="flex w-full flex-row gap-8">
        <div className="flex w-1/2 flex-col flex-nowrap gap-8">
          <ReactHookFormTextFieldOutlined
            key={project?.title}
            control={formValues.control}
            label={ProjectInputsText.Title}
            name="title"
            type="text"
            required
            helperText={titleErrorMessage}
          />
          <DatePickers formValues={formValues} defaultValue={{ from: project?.from, to: project?.to }} />
        </div>
        <div className="flex w-1/2 flex-col flex-nowrap gap-8">
          <ReactHookFormTextFieldOutlined
            key={project?.title}
            control={formValues.control}
            label={ProjectInputsText.Role}
            name="role"
            type="text"
            required
            helperText={roleErrorMessage}
          />
          <ReactHookFormTextFieldOutlined
            key={project?.title}
            control={formValues.control}
            label={ProjectInputsText.Team}
            name="teamSize"
            type="number"
            min={0}
            required
          />
          <ReactHookFormTextFieldOutlined
            key={project?.title}
            control={formValues.control}
            label={ProjectInputsText.Link}
            name="link"
            type="url"
            disabled={tokenState.isGuest}
          />
        </div>
      </div>
      <div className="w-full">
        <ReactHookFormTextFieldOutlined
          key={project?.title}
          control={formValues.control}
          label={ProjectInputsText.Description}
          name="description"
          type="text"
          multiline
          required
          helperText={descriptionErrorMessage}
        />
      </div>
      <Responsibilities formValues={formValues} defaultValues={responsibilities} />
      {renderErrorMessage(formValues.formState.errors.responsibilities)}
      <Divider />
      <CategorySelection formValues={formValues} defaultValues={categories} />
      {renderErrorMessage(formValues.formState.errors.categories)}
      <Divider />
      <div className="saveBtnWrapper gap-2">
        <Button onClick={cancelClickHandle} variant="transparent" disabled={isLoading}>
          {ButtonStep.Cancel}
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {ButtonStep.Save}
        </Button>
      </div>
    </form>
  )
}

export default memo(EditProject)
