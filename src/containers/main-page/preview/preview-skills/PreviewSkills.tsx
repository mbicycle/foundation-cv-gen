import { AcademicCapIcon } from "@heroicons/react/24/solid"

import { useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"
import { CV_FORM_STEPS } from "containers/main-page/cv-form/utils/constants"
import SkillItem from "containers/main-page/preview/preview-skills/SkillItem"

const PreviewSkills = function (): JSX.Element | null {
  const { data } = useUserFromDb()

  const { skills } = data ?? {}

  const renderCategories = (): JSX.Element[] | null => {
    if (!skills) return null

    return skills.map(({ id, name: skillName, tools }) => <SkillItem key={id} title={skillName} tools={tools} />)
  }

  return (
    <div className="mx-6 mt-4 max-w-full break-words rounded-lg border bg-white p-6 drop-shadow">
      <div>
        <div className="grid-rows-auto mb-4 grid grid-cols-3">
          <div className="flex flex-row items-center">
            <div className="flex size-6 items-center justify-center rounded-full bg-gray-200">
              <AcademicCapIcon className="size-6 text-blue-500" color="primary" />
            </div>
            <h5 className="ml-4 font-bold">{CV_FORM_STEPS[2].text}</h5>
          </div>
          <p className="mt-0.5 text-center text-gray-500">{CV_FORM_STEPS[2].columns[1]}</p>
          <p className="mt-0.5 text-center text-gray-500">{CV_FORM_STEPS[2].columns[2]}</p>
        </div>
        {renderCategories()}
      </div>
    </div>
  )
}

export default PreviewSkills
