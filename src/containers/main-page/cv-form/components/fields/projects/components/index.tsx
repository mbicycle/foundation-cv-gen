import type { FieldError, Merge } from "react-hook-form"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { validationTest } from "fields/personal-information/form/hooks"
import { useUpdateProjects } from "fields/projects/lib/query-hooks"
import type { ProjectFieldValues } from "fields/projects/utils/types"
import { v4 as uuid } from "uuid"
import type { AnySchema, InferType } from "yup"
import * as yup from "yup"

import { Button, Divider } from "@mbicycle/foundation-ui-kit"

import { ButtonStep } from "containers/main-page/cv-form/utils/constants"
import ReactHookFormTextFieldOutlined from "common/components/react-hook-forms/ReactHookFormTextFieldOutlined"
import { useGuestToken } from "common/context/guest-token"
import { useGuestUser } from "common/context/guest-user"
import { getKeyOf } from "common/utils/helpers"
import useBeforeUnload from "common/utils/hooks/useBeforeUnload"
import useUnsaved from "common/utils/hooks/useUnSaved"

import { ErrorMessage, projectDatePresent, ProjectInputsText } from "./utils/constants"
import { CategorySelection } from "./category-selection"
import DatePickers from "./DatePickers"
import Responsibilities from "./Responsibilities"

function validateFrom(value: string | Date, schema: InferType<AnySchema>): InferType<AnySchema> {
  const isValidDate = new Date(value).toString().toLowerCase() !== "invalid date"
  if (value && isValidDate) {
    return schema.max(value, "Start date must be less than end date.") as InferType<AnySchema>
  }
  return schema
}

function validateTo(value2: string | Date, schema: InferType<AnySchema>): InferType<AnySchema> {
  const isValidDate = new Date(value2).toString().toLowerCase() !== "invalid date"
  if (value2 && isValidDate) {
    return schema.min(value2, "End date must be more than start date.") as InferType<AnySchema>
  }
  return schema
}

export const projectSchema: InferType<AnySchema> = yup
  .object({
    title: yup.string().min(2, ErrorMessage.MinimumTwo).trim().required(),
    role: yup.string().min(2, ErrorMessage.MinimumTwo).trim().required(),
    from: yup.date().typeError("Invalid date format").required().when("to", validateFrom),
    to: yup.lazy((value) => {
      if (value === projectDatePresent) return yup.string().required()
      return yup.date().typeError("Invalid date format").when("from", validateTo).required()
    }),
    link: yup.string(),
    description: yup
      .string()
      .min(2, ErrorMessage.MinimumTwo)
      .test("description", ErrorMessage.MinimumTwo, validationTest)
      .required(),
    teamSize: yup.number().min(1),
    responsibilities: yup
      .array()
      .compact((value: string) => !value.trim())
      .min(1, "Please add at least one responsibility.")
      .required(),
    categories: yup.array().min(1, "Please select at least one skill/tool.").required(),
  })
  .required()

type FormError = Merge<FieldError, (FieldError | undefined)[]>

export const renderErrorMessage = (error: FormError | string | undefined): JSX.Element | null => {
  if (!error) return null
  const message = typeof error === "string" ? error : error.message
  return <p className="text-red-600">{message}</p>
}

const Project = function (): JSX.Element {
  const { state: tokenState } = useGuestToken()
  const { state, dispatch } = useGuestUser()
  const navigate = useNavigate()
  const { mutateAsync: updateProjectsAsync, isLoading } = useUpdateProjects()
  const formValues = useForm<ProjectFieldValues>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(projectSchema),
  })
  const { openDialogHandler } = useUnsaved(formValues.formState.isDirty)

  const navigateBack = (): void => {
    navigate("/dashboard/projects")
  }

  const cancelHandle = (): void => {
    openDialogHandler({ handleLeave: navigateBack })
  }

  const handleSaveProject = async ({ responsibilities, ...values }: ProjectFieldValues): Promise<void> => {
    if (tokenState.isGuest) {
      dispatch({
        projects: [
          ...state.projects,
          {
            ...values,
            id: uuid(),
            teamSize: Number(values.teamSize),
            responsibilities,
          },
        ],
      })
    } else {
      await updateProjectsAsync({
        ...values,
        id: uuid(),
        teamSize: Number(values.teamSize),
        responsibilities,
      })
    }

    navigateBack()
  }

  useBeforeUnload(formValues.formState.isDirty)

  const descriptionErrorMessage = formValues.formState.errors[getKeyOf<ProjectFieldValues>("description")]?.message

  const titleErrorMessage = formValues.formState.errors.title?.message
  const roleErrorMessage = formValues.formState.errors.role?.message

  return (
    <form className="flex w-full flex-col gap-8 p-4" onSubmit={formValues.handleSubmit(handleSaveProject)}>
      <div className="flex w-full flex-row gap-8">
        <div className="flex w-1/2 flex-col flex-nowrap gap-8">
          <ReactHookFormTextFieldOutlined
            control={formValues.control}
            label={ProjectInputsText.Title}
            name={getKeyOf<ProjectFieldValues>("title")}
            type="text"
            required
            helperText={titleErrorMessage}
          />
          <DatePickers
            formValues={formValues}
            defaultValue={{
              from: formValues.getValues()?.from,
              to: formValues.getValues()?.to,
            }}
          />
        </div>
        <div className="flex w-1/2 flex-col flex-nowrap gap-8">
          <ReactHookFormTextFieldOutlined
            control={formValues.control}
            label={ProjectInputsText.Role}
            name={getKeyOf<ProjectFieldValues>("role")}
            type="text"
            required
            helperText={roleErrorMessage}
          />
          <ReactHookFormTextFieldOutlined
            control={formValues.control}
            label={ProjectInputsText.Team}
            name={getKeyOf<ProjectFieldValues>("teamSize")}
            type="number"
            min={0}
            required
          />
          <ReactHookFormTextFieldOutlined
            control={formValues.control}
            label={ProjectInputsText.Link}
            name={getKeyOf<ProjectFieldValues>("link")}
            type="url"
            disabled={tokenState.isGuest}
          />
        </div>
      </div>
      <div className="w-full">
        <ReactHookFormTextFieldOutlined
          control={formValues.control}
          label={ProjectInputsText.Description}
          name={getKeyOf<ProjectFieldValues>("description")}
          type="text"
          multiline
          required
          helperText={descriptionErrorMessage}
        />
      </div>
      <Responsibilities formValues={formValues} />
      {renderErrorMessage(formValues.formState.errors.responsibilities)}
      <Divider />
      <CategorySelection formValues={formValues} />
      {renderErrorMessage(formValues.formState.errors.categories)}
      <Divider />
      <div className="saveBtnWrapper gap-2">
        <Button onClick={cancelHandle} variant="transparent">
          {ButtonStep.Cancel}
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {ButtonStep.Save}
        </Button>
      </div>
    </form>
  )
}

export default Project
