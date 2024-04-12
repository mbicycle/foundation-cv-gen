import { memo, useCallback, useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { PlusCircleIcon as AddCircleIcon } from "@heroicons/react/24/solid"

import { Button } from "@mbicycle/foundation-ui-kit"

import { useSkillIdContext } from "containers/main-page/cv-form/local-state/hooks"
import { ROUTE } from "common/components/routes/utils/constants"
import type { Certificate, Project, Skill, UserLanguage } from "common/models/User"

import type { Step } from "./constants"
import { ButtonText, SkillsDoesntExist } from "./constants"
import Title from "./Title"

interface AddProficiencyProps {
  title: `${Step}`
  children: React.ReactNode
  collection?: ArrayLike<UserLanguage> | ArrayLike<Skill> | ArrayLike<Project> | ArrayLike<Certificate>
  ButtonString?: string
  disable?: boolean
  targetPath?: string
}

const AddProficiency = function (props: AddProficiencyProps): JSX.Element {
  const { title, children, collection, ButtonString, disable, targetPath } = props
  const location = useLocation()
  const navigate = useNavigate()

  const { dispatch: dispatchSkillId } = useSkillIdContext()

  const [pressedAdd, setPressedAdd] = useState(true)

  const handleAdd = (): void => {
    setPressedAdd(true)
    navigate(targetPath ?? "add")
    dispatchSkillId({ type: "set", id: "" })
  }

  const onReturnHandle = useCallback(() => {
    setPressedAdd(false)
    navigate(-1)
  }, [navigate])

  useEffect(() => {
    if (!location.pathname.includes("add")) {
      setPressedAdd(false)
    }
  }, [location.pathname])

  const redirectCallback = (): void => {
    navigate(`/dashboard/${ROUTE.DASHBOARD.SKILLS}`)
  }

  const renderButtonText = (): string => ButtonString || ButtonText.Add

  const isCollectionLength = location.pathname.includes(ROUTE.DASHBOARD.LANGUAGES.MAIN) ? true : !!collection?.length

  return (
    <div className="flex h-full w-full items-start overflow-y-auto overflow-x-hidden">
      <div className="mb-2 mt-2 flex w-full flex-col items-center justify-center">
        {pressedAdd && <Title name={title} onReturn={onReturnHandle} />}
        {!pressedAdd && (
          <>
            {isCollectionLength ? children : null}
            {!location.pathname.includes("edit") && (
              <div className="mt-10 flex w-full flex-col items-end justify-between">
                {location.pathname.includes(ROUTE.DASHBOARD.PROJECTS) && disable ? (
                  <div className="mb-4 w-full break-words text-center">
                    <h3>{SkillsDoesntExist.Paragraph}</h3>
                    <Button onClick={redirectCallback}>{SkillsDoesntExist.Link}</Button>
                  </div>
                ) : (
                  <div />
                )}
                <Button
                  onClick={handleAdd}
                  disabled={disable}
                  icon={AddCircleIcon}
                  className={`mb-4 mr-4 inline-flex ${isCollectionLength ? "self-end" : "self-center"}`}
                >
                  {renderButtonText()}
                </Button>
              </div>
            )}
          </>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default memo(AddProficiency)
