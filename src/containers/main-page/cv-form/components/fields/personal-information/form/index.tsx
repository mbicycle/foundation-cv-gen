import { memo } from "react"

import { Button } from "@mbicycle/foundation-ui-kit"

import CircularSpinner from "common/components/circular-spinner/circular-spinner"
import ReactHookFormTextFieldOutlined from "common/components/react-hook-forms/ReactHookFormTextFieldOutlined"
import { useGuestToken } from "common/context/guest-token"
import useBeforeUnload from "common/utils/hooks/useBeforeUnload"

import { InputLabel, InputName } from "./constants"
import { useUpdatePersonalData } from "./hooks"

const PersonalDataForm = function (): JSX.Element {
  const { dbUser, isLoading, isDirty, isValid, control, errors, submitHandle } = useUpdatePersonalData()

  useBeforeUnload(isDirty)
  const { state } = useGuestToken()
  const { isGuest } = state

  if (!dbUser) {
    return <CircularSpinner size="large" />
  }

  return (
    <form className="my-6" onSubmit={submitHandle}>
      <div className="flex w-full flex-row flex-nowrap space-x-4">
        <div className="flex w-1/2 flex-col gap-6">
          <ReactHookFormTextFieldOutlined
            label={InputLabel.FirstName}
            name={InputName.FirstName}
            control={control}
            disabled={!isGuest}
            type="text"
            helperText={errors[InputName.FirstName]?.message}
          />
          <ReactHookFormTextFieldOutlined
            label={InputLabel.LastName}
            name={InputName.LastName}
            control={control}
            disabled={!isGuest}
            type="text"
            helperText={errors[InputName.LastName]?.message}
          />
          <ReactHookFormTextFieldOutlined
            label={InputLabel.Telegram}
            name={InputName.Telegram}
            control={control}
            type="text"
            disabled={isGuest}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-6">
          <ReactHookFormTextFieldOutlined
            label={InputLabel.Email}
            name={InputName.Email}
            control={control}
            type="text"
            disabled
          />
          <ReactHookFormTextFieldOutlined
            inputMode="text"
            label={InputLabel.Skype}
            name={InputName.Skype}
            control={control}
            type="text"
            disabled={isGuest}
          />
          <ReactHookFormTextFieldOutlined
            label={InputLabel.Title}
            name={InputName.Title}
            control={control}
            type="text"
            helperText={errors[InputName.Title]?.message}
          />
        </div>
      </div>
      <div className="my-6">
        <ReactHookFormTextFieldOutlined
          control={control}
          label={InputLabel.Summary}
          name={InputName.Summary}
          multiline
          type="text"
          required
          helperText={errors[InputName.Summary]?.message}
        />
      </div>
      <div className="flex justify-end">
        <Button disabled={!isValid || !isDirty} isLoading={isLoading} type="submit">
          Save
        </Button>
      </div>
    </form>
  )
}

export default memo(PersonalDataForm)
