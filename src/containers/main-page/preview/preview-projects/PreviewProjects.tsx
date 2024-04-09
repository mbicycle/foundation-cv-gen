import { FolderIcon } from "@heroicons/react/24/solid"
import { v4 as uuidv4 } from "uuid"

import { Divider } from "@mbicycle/foundation-ui-kit"

import { useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"
import { CV_FORM_STEPS } from "containers/main-page/cv-form/utils/constants"

import PreviewProjectItem from "./PreviewProjectItem"

const PreviewProjects: React.FC = function () {
  const { data } = useUserFromDb()
  const { projects } = data ?? {}

  return (
    <div className="mx-6 mt-4 max-w-full break-words rounded-lg border bg-white p-6 drop-shadow">
      <div className="flex flex-row items-center">
        <div className="flex size-6 items-center justify-center rounded-full bg-gray-200">
          <FolderIcon className="size-6 text-blue-500" />
        </div>
        <h5 className="ml-4 font-bold">{CV_FORM_STEPS[3].text}</h5>
      </div>
      {projects?.map(({ ...project }, index) => (
        <div key={uuidv4()}>
          <PreviewProjectItem project={project} />
          {projects.length > 0 && projects.length - 1 !== index && <Divider />}
        </div>
      ))}
    </div>
  )
}

export default PreviewProjects
