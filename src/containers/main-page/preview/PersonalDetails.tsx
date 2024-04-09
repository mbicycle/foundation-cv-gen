import Certifications from "./Certifications"
import Languages from "./Languages"
import PersonalInformation from "./PersonalInformation"
import { PreviewProjects } from "./preview-projects"
import { PreviewSkills } from "./preview-skills"

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
