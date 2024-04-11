import { useEffect } from "react"
import { useIsFetching } from "react-query"
import { DocumentTextIcon } from "@heroicons/react/24/solid"

import { useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"
import { CV_FORM_STEPS, QueryKey } from "containers/main-page/cv-form/utils/constants"
import CircleIcon from "common/icons/CircleIcon"

import { formatDateAsianStandart } from "./lib/helpers"

const Certifications: React.FC = function () {
  const { data, refetch } = useUserFromDb()
  const isFetching = useIsFetching(QueryKey.DbUser)

  const { certificates } = data ?? {}

  useEffect(() => {
    if (isFetching) refetch()
  }, [refetch, isFetching])

  if (!certificates?.length) return null

  return (
    <div className="previewItemWrapper">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex flex-row items-center">
          <div className="iconBackground">
            <DocumentTextIcon className="previewItemIcon" />
          </div>
          <h5 className="ml-4 font-bold">{CV_FORM_STEPS[4].text}</h5>
        </div>
        <div className="col-span-9" />
        <div className="col-span-3">
          <h5 className="text-center text-gray-500">{CV_FORM_STEPS[4].columns[0]}</h5>
        </div>
      </div>
      {certificates.map((certificate) => (
        <div key={certificate.name + certificate.id} className="grid grid-cols-12 py-2">
          <div className="col-span-9">
            <div className="pl-1.5">
              <CircleIcon className="mb-0.5 mr-1.5 inline size-2 text-blue-500" />
              <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="link">
                {certificate.name}
              </a>
            </div>
          </div>
          <div className="col-span-3">
            <p>{formatDateAsianStandart(certificate.date)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Certifications
