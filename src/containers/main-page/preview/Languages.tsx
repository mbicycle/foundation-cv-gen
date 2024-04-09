import { useEffect } from "react"
import { useIsFetching } from "react-query"
import { BookOpenIcon } from "@heroicons/react/24/solid"

import { useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"
import { CV_FORM_STEPS } from "containers/main-page/cv-form/utils/constants"
import CircleIcon from "common/icons/CircleIcon"

import RatingLanguage from "./RatingLanguage"

const Languages = function (): JSX.Element {
  const { data, refetch } = useUserFromDb()
  const isFetching = useIsFetching("db-user")

  useEffect(() => {
    if (isFetching) refetch()
  }, [refetch, isFetching])

  return (
    <div className="mx-6 mt-4 max-w-full break-words rounded-lg border bg-white p-6 drop-shadow">
      <div>
        <div className="grid-rows-auto grid grid-cols-[0.1fr,2fr,1.1fr]">
          <div className="flex size-6 items-center justify-center rounded-full bg-gray-200">
            <BookOpenIcon className="size-6 text-blue-500" />
          </div>
          <h5 className="ml-4 font-bold">{CV_FORM_STEPS[1].text}</h5>
          {!!data?.languages?.length && <h5 className="text-center text-gray-500">{CV_FORM_STEPS[1].columns[0]}</h5>}
        </div>
        <div className="w-full pt-4" />
        {data?.languages?.map((language) => (
          <div key={language.name} className="grid-rows-auto grid grid-cols-[1fr,2fr,1.5fr] py-1.5">
            <p className="pl-1.5">
              <CircleIcon className="mb-0.5 mr-1.5 inline size-2 text-blue-500" />
              {language.name}
            </p>
            <div className="m-auto flex h-full w-full items-center">
              <RatingLanguage level={language.level} />
            </div>
            <p className="pl-5 text-left">{language.level}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Languages
