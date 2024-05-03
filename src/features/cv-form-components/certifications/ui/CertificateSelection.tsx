import { memo } from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { v4 as uuidv4 } from "uuid"
import * as yup from "yup"

import { Button } from "@mbicycle/foundation-ui-kit"

import { ButtonStep } from "widgets/cv-form/model/constants"

import { useAddUserCertificate } from "features/cv-form-components/certifications/api/query-hooks"
import { CERTIFICATE_LINK } from "features/cv-form-components/certifications/model/constants"

import type { Certificate } from "entities/user/model"

import { useGuestToken } from "shared/context/guest-token"
import { useGuestUser } from "shared/context/guest-user"
import useBeforeUnload from "shared/lib/hooks/useBeforeUnload"
import useUnsaved from "shared/lib/hooks/useUnSaved"
import ReactHookFormTextFieldOutlined from "shared/ui/react-hook-forms/ReactHookFormTextFieldOutlined"

import CertificateSelectionForm from "./CertificateSelectionForm"

const schema = yup
  .object({
    name: yup.string().trim().required(),
    link: yup.string().trim().url().required(),
    date: yup.date().required(),
  })
  .required()

const CertificateSelection = function (): JSX.Element {
  const { state: tokenState } = useGuestToken()
  const { state: user, dispatch } = useGuestUser()
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<Certificate>({ mode: "onChange", resolver: yupResolver(schema) })
  const navigate = useNavigate()
  const { mutateAsync: addMyCertificateAsync, isLoading } = useAddUserCertificate()

  const onSaveHandle: SubmitHandler<Certificate> = async (cert): Promise<void> => {
    if (tokenState.isGuest) {
      dispatch({ certificates: [...user.certificates, { ...cert, id: uuidv4() }] })
    } else {
      await addMyCertificateAsync({ ...cert, id: uuidv4() } as never)
    }
    navigate("/dashboard/certificates")
  }

  useBeforeUnload(isDirty)
  useUnsaved(isDirty)

  return (
    <form onSubmit={handleSubmit(onSaveHandle)} className="w-full">
      <div className="p-3">
        <div className="flex flex-nowrap justify-between gap-6">
          <CertificateSelectionForm control={control} />
        </div>
        <div className="pt-4">
          <ReactHookFormTextFieldOutlined
            {...{
              name: "link",
              control,
              label: CERTIFICATE_LINK,
              type: "text",
              variant: "outlined",
            }}
          />
        </div>
        <div className="saveBtnWrapper">
          <Button disabled={!isValid} type="submit" variant="transparent" isLoading={isLoading}>
            {ButtonStep.Save}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default memo(CertificateSelection)
