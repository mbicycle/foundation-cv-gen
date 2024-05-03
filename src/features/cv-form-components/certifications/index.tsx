import { memo } from "react"
import { useLocation } from "react-router-dom"

import { ROUTE } from "app/routes/utils/constants"

import { useUserFromDb } from "widgets/cv-form/api/query-hooks"

import CircularSpinner from "shared/ui/circular-spinner/circular-spinner"
import AddProficiency from "shared/widgets/add-pattern"

import AddedCertificatesList from "./ui/addedCertificates/AddedCertificatesList"

const Certifications = function (): JSX.Element {
  const { data, isLoading } = useUserFromDb()
  const location = useLocation()

  function renderEditCertificates(): JSX.Element | null {
    if (location.pathname.includes(ROUTE.EDIT)) return null
    return <AddedCertificatesList certificates={data?.certificates || []} />
  }

  if (isLoading) {
    return <CircularSpinner size="large" />
  }
  return (
    <AddProficiency collection={data?.certificates || []} title="Certificate">
      {renderEditCertificates()}
    </AddProficiency>
  )
}

export default memo(Certifications)
