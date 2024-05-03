import { memo } from "react"

import { useGetDbUser } from "widgets/cv-form/api/query-hooks"

import { useSaveAdminPdfFile } from "features/pdf/useSavePdfFile"
import { useSaveAdminWordFile } from "features/word/hooks/useSaveAdminWordFile"

import CircularSpinner from "shared/ui/circular-spinner/circular-spinner"
import DocxIcon from "shared/ui/icons/DocxIcon"
import PdfIcon from "shared/ui/icons/PdfIcon"

interface ActionsSetProps {
  id: string
  mail: string
  disabledIcons: boolean
}

function ActionsSet(props: ActionsSetProps): JSX.Element {
  const { id, mail, disabledIcons } = props

  const { mutateAsync: getUserBy } = useGetDbUser()
  const { isRetreivingWordUserData, passUser: passUserToWord } = useSaveAdminWordFile()
  const { isRetreivingPdfUserData, loading, passUser: passUserToPdf } = useSaveAdminPdfFile()

  const saveEmployeeWordCvHandle = async (): Promise<void> => {
    const data = await getUserBy(mail)
    passUserToWord(id, data)
  }

  const saveEmployeePdfCvHandle = async (): Promise<void> => {
    const data = await getUserBy(mail)
    passUserToPdf(id, data)
  }

  return (
    <>
      <button
        type="button"
        onClick={saveEmployeeWordCvHandle}
        disabled={isRetreivingWordUserData || loading || disabledIcons}
        className="mr-8 text-blue-500"
      >
        {isRetreivingWordUserData ? <CircularSpinner size="small" /> : <DocxIcon className="size-6" />}
      </button>
      <button
        type="button"
        onClick={saveEmployeePdfCvHandle}
        disabled={isRetreivingPdfUserData || loading || disabledIcons}
        className="text-red-600"
      >
        {isRetreivingPdfUserData || loading ? (
          <CircularSpinner size="small" />
        ) : (
          <PdfIcon className={`size-6 ${!disabledIcons ? "text-red-600" : "text-gray-500"}`} />
        )}
      </button>
    </>
  )
}

export default memo(ActionsSet)
