import { FolderIcon } from "@heroicons/react/24/solid"
import { v4 as uuidv4 } from "uuid"

import { Divider } from "@mbicycle/foundation-ui-kit"

import { useUserFromDb } from "widgets/cv-form/api/query-hooks"
import { CV_FORM_STEPS } from "widgets/cv-form/model/constants"

import PreviewProjectItem from "./PreviewProjectItem"

const PreviewProjects: React.FC = function () {
  const { data } = useUserFromDb()
  const { projects } = data ?? {}

  return (
    <div className="previewItemWrapper">
      <div className="flex flex-row items-center">
        <div className="iconBackground">
          <FolderIcon className="previewItemIcon" />
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
