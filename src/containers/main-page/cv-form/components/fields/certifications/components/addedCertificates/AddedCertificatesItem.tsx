import { memo, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import ProfiencyItem from "shared/widgets/profiency/ProfiencyItem"

import { useCategoryCertificatesContext } from "containers/main-page/cv-form/local-state/hooks"

interface AddedCertificatesItemProps {
  certificate: string
  id: string
  date: Date
  link: string | undefined
  isDeleting: boolean
  onDelete: CallableFunction
}

const AddedCertificatesItem = function ({
  certificate,
  id,
  link,
  isDeleting,
  onDelete,
  date,
}: AddedCertificatesItemProps): JSX.Element {
  const navigate = useNavigate()
  const { dispatch: dispatchCategoryName } = useCategoryCertificatesContext()

  const openHandle = (): void => {
    dispatchCategoryName({
      type: "set",
      name: certificate,
      id,
      link,
      date,
    })
    navigate("edit")
  }
  const [isItemDeleting, setIsItemDeleting] = useState(false)

  const onDeleteCertificateHandle = useCallback(async (): Promise<void> => {
    setIsItemDeleting(true)
    await onDelete(id)
    setIsItemDeleting(false)
  }, [id, onDelete])

  return (
    <ProfiencyItem
      headText={certificate}
      bodyText={date ? dayjs(date).format("MMMM YYYY") : ""}
      onDelete={onDeleteCertificateHandle}
      link={link}
      isLoading={isItemDeleting}
      disabled={isDeleting}
      onClick={openHandle}
    />
  )
}

export default memo(AddedCertificatesItem)
