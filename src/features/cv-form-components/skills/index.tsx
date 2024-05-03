import { memo } from "react"
import { useLocation } from "react-router-dom"

import { ROUTE } from "app/routes/utils/constants"

import { useUserFromDb } from "widgets/cv-form/api/query-hooks"

import CircularSpinner from "shared/ui/circular-spinner/circular-spinner"
import AddProficiency from "shared/widgets/add-pattern"
import { ButtonText } from "shared/widgets/add-pattern/constants"

import SkillList from "./ui/skills/CategoryList"

const Categories = function (): JSX.Element {
  const location = useLocation()
  const { data } = useUserFromDb()

  if (!data) {
    return <CircularSpinner size="large" />
  }

  return (
    <AddProficiency
      collection={data.skills || []}
      title="Skill Group"
      ButtonString={ButtonText.AddSkills}
      targetPath="edit"
    >
      {!location.pathname.includes(ROUTE.EDIT) && <SkillList skills={data.skills || []} user={data} />}
    </AddProficiency>
  )
}

export default memo(Categories)
