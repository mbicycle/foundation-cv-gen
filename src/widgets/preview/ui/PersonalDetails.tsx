import { PreviewProjects } from "widgets/preview/ui/projects"
import { PreviewSkills } from "widgets/preview/ui/skills"

import Certifications from "./Certifications"
import Languages from "./Languages"
import PersonalInformation from "./PersonalInformation"

const PersonalDetails = function (): JSX.Element {
  return (
    <div className="max-w-25">
      <PersonalInformation />
      <Languages />
      <PreviewSkills />
      <PreviewProjects />
      <Certifications />
    </div>
  )
}

export default PersonalDetails
