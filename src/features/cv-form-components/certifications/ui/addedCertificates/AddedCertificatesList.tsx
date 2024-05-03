import { memo } from "react"

import { useDeleteUserCertificate } from "features/cv-form-components/certifications/api/query-hooks"

import type { Certificate } from "entities/user/model"

import { useGuestToken } from "shared/context/guest-token"
import { useGuestUser } from "shared/context/guest-user"

import AddedCertificatesItem from "./AddedCertificatesItem"

const AddedCertificatesList = function ({ certificates }: { certificates: Certificate[] }): JSX.Element | null {
  const { mutateAsync: deleteBy, isLoading } = useDeleteUserCertificate()
  const { state: tokenState } = useGuestToken()
  const { dispatch } = useGuestUser()

  const deleteHandle = async (id: string): Promise<void> => {
    if (tokenState.isGuest) {
      const filteredCertificates = certificates?.filter((certificate: Certificate) => certificate.id !== id)
      dispatch({ certificates: filteredCertificates })
    } else {
      await deleteBy(id)
    }
  }

  if (!certificates.length) return null

  return (
    <div className="listWrapper">
      {certificates.map(({ name, id, link, date }) => (
        <AddedCertificatesItem
          key={id}
          date={date}
          certificate={name}
          id={id}
          link={link}
          onDelete={deleteHandle}
          isDeleting={isLoading}
        />
      ))}
    </div>
  )
}

export default memo(AddedCertificatesList)
